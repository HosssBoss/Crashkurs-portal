"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { quizData } from "@/lib/quiz-data";

const ADMIN_EMAIL = "hosam828@outlook.de";

async function getAdminClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user || user.email !== ADMIN_EMAIL) throw new Error("Nicht autorisiert");
  return { supabase, user };
}

export type DbFrage = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  fach: string;
  thema: string;
  source: string;
  source_id: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

// ── Toggle active/inactive ────────────────────────────────────────────────────

export async function toggleStatus(id: string, current: "active" | "inactive") {
  const { supabase } = await getAdminClient();
  const next = current === "active" ? "inactive" : "active";
  const { error } = await supabase
    .from("questions")
    .update({ status: next })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/fragen");
  return { status: next };
}

// ── Move to different fach/thema ──────────────────────────────────────────────

export async function moveFrage(id: string, newFach: string, newThema: string) {
  const { supabase } = await getAdminClient();
  const { error } = await supabase
    .from("questions")
    .update({ fach: newFach, thema: newThema })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/fragen");
  return { ok: true };
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteFrage(id: string) {
  const { supabase } = await getAdminClient();
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/fragen");
  revalidatePath("/admin/questions");
  return { ok: true };
}

// ── Import from quiz-data.ts ──────────────────────────────────────────────────

export async function importFromQuizData(): Promise<{
  imported: number;
  skipped: number;
  error?: string;
}> {
  const { supabase, user } = await getAdminClient();

  // Existing source_ids
  const { data: existing } = await supabase
    .from("questions")
    .select("source_id")
    .not("source_id", "is", null);
  const existingIds = new Set((existing ?? []).map((r) => r.source_id as string));

  // Flatten all questions from quiz-data
  type Row = {
    question: string;
    options: string[];
    correct_index: number;
    explanation: string;
    fach: string;
    thema: string;
    source: string;
    source_id: string;
    status: string;
    created_by: string;
  };
  const toInsert: Row[] = [];

  for (const [fach, fachData] of Object.entries(quizData)) {
    for (const topic of fachData.topics) {
      for (const q of topic.questions) {
        const sourceId = `quizdata:${q.id}`;
        if (existingIds.has(sourceId)) continue;
        toInsert.push({
          question: q.question,
          options: q.options,
          correct_index: q.correctIndex,
          explanation: q.explanation ?? "",
          fach,
          thema: topic.name,
          source: "quiz-data",
          source_id: sourceId,
          status: "active",
          created_by: user.id,
        });
      }
    }
  }

  const skipped = existingIds.size;
  if (toInsert.length === 0) return { imported: 0, skipped };

  // Batch insert in chunks of 100
  let imported = 0;
  for (let i = 0; i < toInsert.length; i += 100) {
    const chunk = toInsert.slice(i, i + 100);
    const { error } = await supabase.from("questions").insert(chunk);
    if (error) return { imported, skipped, error: error.message };
    imported += chunk.length;
  }

  revalidatePath("/admin/fragen");
  revalidatePath("/admin");
  return { imported, skipped };
}

// ── Load all Fragen (for server component) ────────────────────────────────────

export async function loadFragen(): Promise<{ fragen: DbFrage[]; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("fach", { ascending: true })
    .order("thema", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return { fragen: [], error: error.message };
  return { fragen: (data ?? []) as DbFrage[] };
}
