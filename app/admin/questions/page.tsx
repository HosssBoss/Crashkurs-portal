import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import QuestionTable from "./QuestionTable";
import type { DbQuestion } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function QuestionsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  const questions: DbQuestion[] = (data ?? []) as DbQuestion[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Fragenverwaltung</h1>
          <p className="mt-1 text-sm text-slate-500">
            {questions.length} Fragen in Supabase
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Neue Frage
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Fehler beim Laden: {error.message}
        </div>
      )}

      <QuestionTable questions={questions} />
    </div>
  );
}
