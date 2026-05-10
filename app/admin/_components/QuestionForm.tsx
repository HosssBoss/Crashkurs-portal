"use client";

import { useActionState } from "react";
import type { DbQuestion } from "@/app/actions/admin";

const FAECHER = [
  { value: "chemie", label: "Chemie" },
  { value: "biochemie", label: "Biochemie" },
  { value: "physik", label: "Physik" },
  { value: "biologie", label: "Biologie" },
  { value: "physiologie", label: "Physiologie" },
];

const THEMEN: Record<string, string[]> = {
  chemie: ["Allgemeine Chemie", "Organische Chemie", "Anorganische Chemie", "Stöchiometrie", "Säure-Base", "Redox", "Elektrochemie", "Thermodynamik"],
  biochemie: ["Aminosäuren", "Enzyme", "Kohlenhydrate", "Lipide", "Proteine", "Nukleinsäuren", "Stoffwechsel", "Signaltransduktion", "Zellbiologie"],
  physik: ["Mechanik", "Elektrodynamik", "Optik", "Thermodynamik", "Wellenlehre", "Strahlenphysik", "Biophysik"],
  biologie: ["Zellbiologie", "Genetik", "Anatomie", "Mikrobiologie", "Evolutionsbiologie", "Ökologie"],
  physiologie: ["Herz-Kreislauf", "Atmung", "Niere", "Nervensystem", "Endokrinologie", "Sinnesorgane", "Muskel"],
};

type ActionFn = (prev: unknown, formData: FormData) => Promise<{ error?: string } | void>;

type Props = {
  action: ActionFn;
  initial?: Partial<DbQuestion>;
  submitLabel?: string;
};

export default function QuestionForm({ action, initial, submitLabel = "Speichern" }: Props) {
  const [state, formAction, pending] = useActionState<{ error?: string } | undefined, FormData>(
    action as (prev: { error?: string } | undefined, fd: FormData) => Promise<{ error?: string } | undefined>,
    undefined
  );

  const opts = (initial?.options as string[] | undefined) ?? ["", "", "", "", ""];
  const padded = [...opts, "", "", "", "", ""].slice(0, 5);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-300">{state.error}</p>
        </div>
      )}

      {/* Fach + Thema row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Fach</label>
          <select
            name="fach"
            defaultValue={initial?.fach ?? "chemie"}
            required
            className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
          >
            {FAECHER.map((f) => (
              <option key={f.value} value={f.value} className="bg-[#0d1b2e]">{f.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Thema</label>
          <input
            name="thema"
            list="themen-list"
            defaultValue={initial?.thema ?? ""}
            required
            placeholder="z.B. Aminosäuren"
            className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
          />
          <datalist id="themen-list">
            {Object.values(THEMEN).flat().map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>
      </div>

      {/* Question */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Frage</label>
        <textarea
          name="question"
          defaultValue={initial?.question ?? ""}
          required
          rows={3}
          placeholder="Wie lautet die korrekte Aussage zu …?"
          className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
        />
      </div>

      {/* Options A–E */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-400">
          Antwortoptionen <span className="text-slate-600">(mind. 2, max. 5)</span>
        </label>
        <div className="space-y-2">
          {["A", "B", "C", "D", "E"].map((letter, i) => (
            <div key={letter} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-center text-xs font-semibold text-slate-500">{letter}</span>
              <input
                name={`option_${i}`}
                defaultValue={padded[i]}
                required={i < 2}
                placeholder={i < 2 ? "Pflichtfeld" : "Optional"}
                className="flex-1 rounded-xl border border-white/8 bg-white/4 px-4 py-2 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Correct answer */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-400">Richtige Antwort</label>
        <div className="flex gap-2">
          {["A", "B", "C", "D", "E"].map((letter, i) => (
            <label key={letter} className="flex cursor-pointer flex-col items-center gap-1.5">
              <input
                type="radio"
                name="correct_index"
                value={String(i)}
                defaultChecked={(initial?.correct_index ?? 0) === i}
                className="sr-only peer"
                required
              />
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 text-sm font-semibold text-slate-400 transition-colors peer-checked:border-violet-500/50 peer-checked:bg-violet-500/20 peer-checked:text-violet-300">
                {letter}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-400">Erklärung</label>
        <textarea
          name="explanation"
          defaultValue={initial?.explanation ?? ""}
          rows={2}
          placeholder="Kurze Begründung der richtigen Antwort …"
          className="w-full resize-none rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-violet-500/60 focus:bg-white/6"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Speichert…
            </span>
          ) : submitLabel}
        </button>
        <a href="/admin/fragen" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
          Abbrechen
        </a>
      </div>
    </form>
  );
}
