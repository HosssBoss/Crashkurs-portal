"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

const ADMIN_EMAIL = "hosam828@outlook.de";

async function getAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== ADMIN_EMAIL) throw new Error("Nicht autorisiert");
  return { supabase, user };
}

export async function createQuestion(_prev: unknown, formData: FormData) {
  const { supabase, user } = await getAdminClient();

  const options = [0, 1, 2, 3, 4]
    .map((i) => (formData.get(`option_${i}`) as string)?.trim())
    .filter(Boolean);

  const { error } = await supabase.from("questions").insert({
    question: (formData.get("question") as string).trim(),
    options,
    correct_index: parseInt(formData.get("correct_index") as string, 10),
    explanation: (formData.get("explanation") as string).trim(),
    fach: formData.get("fach") as string,
    thema: (formData.get("thema") as string).trim(),
    source: "manual",
    created_by: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/questions");
  redirect("/admin/questions");
}

export async function updateQuestion(
  id: string,
  _prev: unknown,
  formData: FormData
) {
  const { supabase } = await getAdminClient();

  const options = [0, 1, 2, 3, 4]
    .map((i) => (formData.get(`option_${i}`) as string)?.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("questions")
    .update({
      question: (formData.get("question") as string).trim(),
      options,
      correct_index: parseInt(formData.get("correct_index") as string, 10),
      explanation: (formData.get("explanation") as string).trim(),
      fach: formData.get("fach") as string,
      thema: (formData.get("thema") as string).trim(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/questions");
  redirect("/admin/questions");
}

export async function deleteQuestion(id: string) {
  const { supabase } = await getAdminClient();
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/questions");
  return { success: true };
}

export type DbQuestion = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  fach: string;
  thema: string;
  source: string;
  created_at: string;
};

export type ExtractedQuestion = {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  fach: string;
  thema: string;
};

export async function extractPdfQuestions(
  _prev: unknown,
  formData: FormData
): Promise<{ questions?: ExtractedQuestion[]; error?: string }> {
  await getAdminClient();

  const file = formData.get("pdf") as File | null;
  const fach = (formData.get("fach") as string) || "chemie";
  const thema = (formData.get("thema") as string) || "";

  if (!file || file.size === 0) return { error: "Keine PDF-Datei ausgewählt." };
  if (!process.env.ANTHROPIC_API_KEY)
    return { error: "ANTHROPIC_API_KEY nicht konfiguriert." };

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `Du bist ein Experte für medizinische Klausurfragen. Extrahiere alle Multiple-Choice-Fragen aus dem PDF.

Fach: ${fach}${thema ? `\nThema: ${thema}` : ""}

Gib die Fragen als JSON-Array zurück. Jede Frage hat dieses Format:
{
  "question": "Fragetext",
  "options": ["Option A", "Option B", "Option C", "Option D", "Option E"],
  "correct_index": 0,
  "explanation": "Kurze Erklärung warum diese Antwort richtig ist",
  "fach": "${fach}",
  "thema": "spezifisches Thema der Frage"
}

Regeln:
- correct_index ist 0-basiert (0=A, 1=B, 2=C, 3=D, 4=E)
- Mindestens 2, maximal 5 Antwortoptionen
- Überspringe unvollständige oder unleserliche Fragen
- Antworte NUR mit dem JSON-Array, kein anderer Text
- Wenn das Thema nicht erkennbar ist, nutze "${thema || fach}"`;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any[] = [
      {
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: base64 },
      },
      { type: "text", text: prompt },
    ];
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8192,
      messages: [{ role: "user", content }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return { error: "Claude konnte keine Fragen extrahieren." };

    const questions: ExtractedQuestion[] = JSON.parse(jsonMatch[0]);
    return { questions };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unbekannter Fehler";
    return { error: `PDF-Extraktion fehlgeschlagen: ${msg}` };
  }
}

export async function saveExtractedQuestions(questions: ExtractedQuestion[]) {
  const { supabase, user } = await getAdminClient();

  const rows = questions.map((q) => ({ ...q, source: "pdf", created_by: user.id }));
  const { error } = await supabase.from("questions").insert(rows);
  if (error) return { error: error.message };

  revalidatePath("/admin/questions");
  return { count: rows.length };
}
