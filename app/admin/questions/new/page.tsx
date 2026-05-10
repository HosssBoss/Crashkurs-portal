import Link from "next/link";
import { createQuestion } from "@/app/actions/admin";
import QuestionForm from "@/app/admin/_components/QuestionForm";

export default function NewQuestionPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/admin/questions" className="hover:text-slate-300 transition-colors">
          Fragen
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-slate-300">Neue Frage</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Neue Frage erstellen</h1>
        <p className="mt-1 text-sm text-slate-500">
          Frage manuell eingeben und in Supabase speichern.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
        <QuestionForm action={createQuestion} submitLabel="Frage erstellen" />
      </div>
    </div>
  );
}
