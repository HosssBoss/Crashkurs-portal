import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { updateQuestion, type DbQuestion } from "@/app/actions/admin";
import QuestionForm from "@/app/admin/_components/QuestionForm";

export default async function EditQuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const question = data as DbQuestion;
  const updateWithId = updateQuestion.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/questions" className="hover:text-slate-300 transition-colors">
          Fragen
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300 truncate max-w-xs">{question.question.slice(0, 50)}…</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Frage bearbeiten</h1>
        <p className="mt-1 font-mono text-xs text-slate-600">{id}</p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
        <QuestionForm
          action={updateWithId}
          initial={question}
          submitLabel="Änderungen speichern"
        />
      </div>
    </div>
  );
}
