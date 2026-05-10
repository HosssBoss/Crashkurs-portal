"use client";

import { useActionState, useState, useTransition } from "react";
import { extractPdfQuestions, saveExtractedQuestions, type ExtractedQuestion } from "@/app/actions/admin";

const FAECHER = ["chemie", "biochemie", "physik", "biologie", "physiologie"];
const LETTERS = ["A", "B", "C", "D", "E"];

type ExtractState = { questions?: ExtractedQuestion[]; error?: string } | undefined;

export default function PdfImportPage() {
  const [extractState, extractAction, extractPending] = useActionState<ExtractState, FormData>(
    extractPdfQuestions as (prev: ExtractState, fd: FormData) => Promise<ExtractState>,
    undefined
  );

  const [edited, setEdited] = useState<ExtractedQuestion[]>([]);
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, startSave] = useTransition();

  const questions = edited.length > 0 ? edited : (extractState?.questions ?? []);

  function updateQuestion(idx: number, field: keyof ExtractedQuestion, value: string | string[] | number) {
    const next = [...(extractState?.questions ?? [])].map((q, i) => ({ ...q }));
    if (edited.length > 0) {
      const base = edited.map((q) => ({ ...q }));
      if (field === "options") base[idx].options = value as string[];
      else (base[idx] as Record<string, unknown>)[field] = value;
      setEdited(base);
    } else {
      const base = (extractState?.questions ?? []).map((q) => ({ ...q }));
      if (field === "options") base[idx].options = value as string[];
      else (base[idx] as Record<string, unknown>)[field] = value;
      setEdited(base);
    }
    void next;
  }

  function handleSave() {
    setSaveError(null);
    startSave(async () => {
      const result = await saveExtractedQuestions(questions);
      if ("error" in result && result.error) {
        setSaveError(result.error);
      } else if ("count" in result) {
        setSavedCount(result.count ?? questions.length);
      }
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">PDF Import</h1>
        <p className="mt-1 text-sm text-slate-500">
          PDF hochladen → Claude extrahiert automatisch alle Fragen → prüfen & speichern.
        </p>
      </div>

      {/* Upload form */}
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
        <form action={extractAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Standard-Fach</label>
              <select name="fach" className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/60">
                {FAECHER.map((f) => (
                  <option key={f} value={f} className="bg-[#0d1b2e] capitalize">{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Standard-Thema (optional)</label>
              <input name="thema" placeholder="z.B. Aminosäuren" className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">PDF-Datei</label>
            <input
              type="file"
              name="pdf"
              accept=".pdf,application/pdf"
              required
              className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-1 file:text-xs file:font-medium file:text-white file:cursor-pointer hover:file:bg-violet-500 outline-none"
            />
          </div>

          {!process.env.NEXT_PUBLIC_HAS_ANTHROPIC && (
            <p className="rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-xs text-amber-400">
              Füge <code className="font-mono">ANTHROPIC_API_KEY</code> in <code className="font-mono">.env.local</code> ein, um PDF-Extraktion zu aktivieren.
            </p>
          )}

          <button
            type="submit"
            disabled={extractPending}
            className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {extractPending ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Claude analysiert PDF…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                PDF hochladen & analysieren
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {extractState?.error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-300">{extractState.error}</p>
        </div>
      )}

      {/* Saved confirmation */}
      {savedCount !== null && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/25 bg-green-500/10 px-4 py-3">
          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-green-300">
            <strong>{savedCount} Fragen</strong> erfolgreich in Supabase gespeichert.{" "}
            <a href="/admin/questions" className="underline hover:no-underline">Zur Übersicht →</a>
          </p>
        </div>
      )}

      {/* Extracted questions for review */}
      {questions.length > 0 && savedCount === null && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">
              {questions.length} extrahierte Fragen – bitte prüfen
            </h2>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-60"
            >
              {saving ? "Speichert…" : `Alle ${questions.length} speichern`}
            </button>
          </div>

          {saveError && (
            <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {saveError}
            </p>
          )}

          <div className="space-y-4">
            {questions.map((q, qi) => (
              <div key={qi} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-white">#{qi + 1}</span>
                  <span>·</span>
                  <select
                    value={q.fach}
                    onChange={(e) => updateQuestion(qi, "fach", e.target.value)}
                    className="rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-xs text-slate-300 outline-none"
                  >
                    {FAECHER.map((f) => <option key={f} value={f} className="bg-[#0d1b2e]">{f}</option>)}
                  </select>
                  <input
                    value={q.thema}
                    onChange={(e) => updateQuestion(qi, "thema", e.target.value)}
                    placeholder="Thema"
                    className="flex-1 rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-xs text-slate-300 outline-none placeholder:text-slate-600"
                  />
                </div>

                <textarea
                  value={q.question}
                  onChange={(e) => updateQuestion(qi, "question", e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/60"
                />

                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuestion(qi, "correct_index", oi)}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                          q.correct_index === oi
                            ? "bg-violet-500/30 text-violet-300 ring-1 ring-violet-500/50"
                            : "bg-white/4 text-slate-500 hover:bg-white/8"
                        }`}
                      >
                        {LETTERS[oi]}
                      </button>
                      <input
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...q.options];
                          newOpts[oi] = e.target.value;
                          updateQuestion(qi, "options", newOpts);
                        }}
                        className="flex-1 rounded-lg border border-white/8 bg-white/4 px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-violet-500/50"
                      />
                    </div>
                  ))}
                </div>

                <textarea
                  value={q.explanation}
                  onChange={(e) => updateQuestion(qi, "explanation", e.target.value)}
                  placeholder="Erklärung…"
                  rows={1}
                  className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-2 text-xs text-slate-400 outline-none focus:border-violet-500/60 placeholder:text-slate-600"
                />
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-violet-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:opacity-60"
            >
              {saving ? "Speichert…" : `Alle ${questions.length} Fragen speichern`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
