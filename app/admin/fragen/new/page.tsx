import Link from "next/link";
import QuestionForm from "@/app/admin/_components/QuestionForm";
import { createQuestion } from "@/app/actions/admin";

export default function NeueFragePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/fragen"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 text-slate-400 transition-colors hover:border-white/15 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Neue Frage</h1>
          <p className="mt-0.5 text-sm text-slate-500">Frage manuell erstellen und in Supabase speichern</p>
        </div>
      </div>

      <div className="max-w-2xl rounded-2xl border border-white/8 bg-white/[0.025] p-6">
        <QuestionForm action={createQuestion} submitLabel="Frage erstellen" />
      </div>
    </div>
  );
}
