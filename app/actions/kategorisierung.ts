"use server";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { THEMEN_PER_FACH } from "@/lib/themen-config";
import type { FachResult, KategorisierungResult } from "@/lib/themen-config";

export type { FachResult, KategorisierungResult };

const ADMIN_EMAIL = "hosam828@outlook.de";

async function getAdminClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user || data.user.email !== ADMIN_EMAIL) throw new Error("Nicht autorisiert");
  return supabase;
}

async function klassifiziereBatch(
  fach: string,
  questions: { id: string; question: string }[]
): Promise<Record<string, string>> {
  const validThemen = THEMEN_PER_FACH[fach];

  const anthropic = new Anthropic();

  const lines = questions
    .map((q, i) => `[${i + 1}|${q.id}] ${q.question}`)
    .join("\n");

  const prompt = `Du bist Experte für deutschsprachige Vorklinik-Prüfungen (Medizinstudium, 1. Studienjahr).

Ordne jede der folgenden Prüfungsfragen aus "${fach}" exakt einem Thema aus dieser Liste zu:
${validThemen.map((t) => `• ${t}`).join("\n")}

Fragen (Format [lfd.Nr|UUID] Fragetext):
${lines}

Antworte ausschließlich mit einem JSON-Objekt {"UUID": "Thema", ...} für jede Frage.
Verwende nur Themen aus der obigen Liste, keine anderen.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text.trim() : "";

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return {};

  const raw: Record<string, string> = JSON.parse(jsonMatch[0]);

  // Reject assignments that aren't in the canonical list
  const result: Record<string, string> = {};
  for (const [id, thema] of Object.entries(raw)) {
    if (validThemen.includes(thema)) result[id] = thema;
  }
  return result;
}

export async function kategorisiereAlleFragen(): Promise<KategorisierungResult> {
  const supabase = await getAdminClient();

  const { data: rows, error } = await supabase
    .from("questions")
    .select("id, question, fach")
    .order("fach")
    .order("created_at");

  if (error) return { updated: 0, faecher: [], errors: [error.message] };
  if (!rows?.length) return { updated: 0, faecher: [], errors: [] };

  // Group by fach
  const byFach = new Map<string, { id: string; question: string }[]>();
  for (const r of rows) {
    if (!byFach.has(r.fach)) byFach.set(r.fach, []);
    byFach.get(r.fach)!.push({ id: r.id, question: r.question });
  }

  const faecher: FachResult[] = [];
  const errors: string[] = [];
  let totalUpdated = 0;

  for (const [fach, questions] of byFach) {
    if (!THEMEN_PER_FACH[fach]) continue; // Skip unknown subjects

    const mapping: Record<string, string> = {};

    // Process in batches of 80 to stay well within token limits
    const BATCH = 80;
    for (let i = 0; i < questions.length; i += BATCH) {
      try {
        const partial = await klassifiziereBatch(fach, questions.slice(i, i + BATCH));
        Object.assign(mapping, partial);
      } catch (err) {
        errors.push(`${fach} Batch ${i / BATCH + 1}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    // Group IDs by assigned thema for bulk updates
    const byThema = new Map<string, string[]>();
    for (const [id, thema] of Object.entries(mapping)) {
      if (!byThema.has(thema)) byThema.set(thema, []);
      byThema.get(thema)!.push(id);
    }

    const themenCounts: Record<string, number> = {};
    let fachUpdated = 0;

    for (const [thema, ids] of byThema) {
      const { error: upErr } = await supabase
        .from("questions")
        .update({ thema })
        .in("id", ids);

      if (upErr) {
        errors.push(`Update ${fach}/${thema}: ${upErr.message}`);
      } else {
        themenCounts[thema] = ids.length;
        fachUpdated += ids.length;
      }
    }

    faecher.push({ fach, updated: fachUpdated, themen: themenCounts });
    totalUpdated += fachUpdated;
  }

  revalidatePath("/admin/fragen");
  return { updated: totalUpdated, faecher, errors };
}

// Re-run only for one fach (for incremental updates)
export async function kategorisiereFach(fach: string): Promise<FachResult & { errors: string[] }> {
  const supabase = await getAdminClient();

  const { data: rows, error } = await supabase
    .from("questions")
    .select("id, question")
    .eq("fach", fach)
    .order("created_at");

  if (error) return { fach, updated: 0, themen: {}, errors: [error.message] };
  if (!rows?.length) return { fach, updated: 0, themen: {}, errors: [] };

  const mapping: Record<string, string> = {};
  const errors: string[] = [];
  const BATCH = 80;

  for (let i = 0; i < rows.length; i += BATCH) {
    try {
      const partial = await klassifiziereBatch(fach, rows.slice(i, i + BATCH));
      Object.assign(mapping, partial);
    } catch (err) {
      errors.push(`Batch ${i / BATCH + 1}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const byThema = new Map<string, string[]>();
  for (const [id, thema] of Object.entries(mapping)) {
    if (!byThema.has(thema)) byThema.set(thema, []);
    byThema.get(thema)!.push(id);
  }

  const themenCounts: Record<string, number> = {};
  let updated = 0;

  for (const [thema, ids] of byThema) {
    const { error: upErr } = await supabase
      .from("questions")
      .update({ thema })
      .in("id", ids);
    if (upErr) {
      errors.push(`${thema}: ${upErr.message}`);
    } else {
      themenCounts[thema] = ids.length;
      updated += ids.length;
    }
  }

  revalidatePath("/admin/fragen");
  return { fach, updated, themen: themenCounts, errors };
}
