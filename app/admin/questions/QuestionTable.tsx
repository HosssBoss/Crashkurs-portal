"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteQuestion, type DbQuestion } from "@/app/actions/admin";

const FACH_COLORS: Record<string, string> = {
  chemie: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  biochemie: "text-green-400 bg-green-500/10 border-green-500/20",
  physik: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  biologie: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  physiologie: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuestionTable({ questions }: { questions: DbQuestion[] }) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filtered = questions.filter(
    (q) =>
      !search ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.fach.toLowerCase().includes(search.toLowerCase()) ||
      q.thema.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    if (!confirm("Frage wirklich löschen?")) return;
    setDeletingId(id);
    startTransition(async () => {
      await deleteQuestion(id);
      setDeletingId(null);
    });
  }

  return (
    <div className="space-y-4">
      {/* Search + count */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Frage, Fach oder Thema suchen…"
            className="w-full rounded-xl border border-white/8 bg-white/4 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
          />
        </div>
        <span className="text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? "Frage" : "Fragen"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            {search ? "Keine Fragen gefunden." : "Noch keine Fragen vorhanden."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Frage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Fach</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Thema</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Richtig</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, i) => {
                const colorClass = FACH_COLORS[q.fach] ?? "text-slate-400 bg-white/5 border-white/10";
                const answer = LETTERS[q.correct_index] ?? "?";
                const isDeleting = deletingId === q.id;

                return (
                  <tr
                    key={q.id}
                    className={`border-b border-white/5 last:border-0 transition-colors ${
                      isDeleting ? "opacity-40" : "hover:bg-white/[0.02]"
                    } ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                  >
                    <td className="max-w-xs px-4 py-3 text-slate-300">
                      <p className="line-clamp-2">{q.question}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${colorClass}`}>
                        {q.fach}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{q.thema}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/15 text-xs font-bold text-violet-300">
                        {answer}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/questions/${q.id}/edit`}
                          className="rounded-lg border border-white/8 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-white/15 hover:text-white"
                        >
                          Bearbeiten
                        </Link>
                        <button
                          onClick={() => handleDelete(q.id)}
                          disabled={isDeleting}
                          className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                        >
                          {isDeleting ? "…" : "Löschen"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
