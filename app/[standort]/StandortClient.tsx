"use client";

import { useState } from "react";
import Link from "next/link";

type LocData = {
  short: string;
  name: string;
  city: string;
  accentText: string;
  pillClass: string;
  dotClass: string;
  badgeBorder: string;
};

const subjectData = {
  chemie: {
    id: "chemie",
    name: "Chemie",
    description: "Organische & anorganische Chemie, Reaktionsmechanismen, Stöchiometrie und Gleichgewichte.",
    quizCount: 45,
    altklausurenCount: 8,
    color: {
      text: "text-amber-300",
      bg: "bg-amber-950/60",
      border: "border-amber-800/40",
      quizBtn: "bg-amber-950/60 text-amber-300 border border-amber-800/40 hover:bg-amber-900/50",
    },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  physik: {
    id: "physik",
    name: "Physik",
    description: "Mechanik, Elektrophysiologie, Optik, Thermodynamik und Wellenlehre für Mediziner.",
    quizCount: 38,
    altklausurenCount: 6,
    color: {
      text: "text-indigo-300",
      bg: "bg-indigo-950/60",
      border: "border-indigo-800/40",
      quizBtn: "bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/50",
    },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  biochemie: {
    id: "biochemie",
    name: "Biochemie 1",
    description: "Stoffwechselwege, Enzyme & Kinetik, Molekularbiologie, DNA-Replikation und Proteinsynthese.",
    quizCount: 62,
    altklausurenCount: 10,
    color: {
      text: "text-emerald-300",
      bg: "bg-emerald-950/60",
      border: "border-emerald-800/40",
      quizBtn: "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/50",
    },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  physiologie: {
    id: "physiologie",
    name: "Physiologie 1",
    description: "Herz-Kreislauf, Atmung, Niere, Nervensystem und Sinnesorgane – Körperfunktionen im Überblick.",
    quizCount: 19,
    altklausurenCount: 0,
    color: {
      text: "text-rose-300",
      bg: "bg-rose-950/60",
      border: "border-rose-800/40",
      quizBtn: "bg-rose-950/60 text-rose-300 border border-rose-800/40 hover:bg-rose-900/50",
    },
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
};

const semesters = [
  {
    number: 1,
    label: "Semester 1",
    faecher: ["chemie", "physik"] as const,
    available: true,
  },
  {
    number: 2,
    label: "Semester 2",
    faecher: ["biochemie", "physiologie"] as const,
    available: true,
  },
  {
    number: 3,
    label: "Semester 3",
    faecher: [] as const,
    available: false,
  },
  {
    number: 4,
    label: "Semester 4",
    faecher: [] as const,
    available: false,
  },
] as const;

type SemesterNumber = 1 | 2 | 3 | 4;

const semesterSubjectNames: Record<1 | 2, string> = {
  1: "Chemie · Physik",
  2: "Biochemie 1 · Physiologie 1",
};

export default function StandortClient({
  standort,
  loc,
}: {
  standort: string;
  loc: LocData;
}) {
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber | null>(null);

  const activeSemester = semesters.find((s) => s.number === selectedSemester) ?? null;
  const visibleFaecher = activeSemester?.available
    ? activeSemester.faecher.map((id) => subjectData[id])
    : [];

  if (selectedSemester !== null && activeSemester?.available) {
    return (
      <div>
        {/* Back to semester selection */}
        <button
          onClick={() => setSelectedSemester(null)}
          className="mb-6 flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Semesterauswahl
          <span className="ml-1 text-slate-700">/</span>
          <span className="text-slate-400">Semester {selectedSemester}</span>
        </button>

        {/* Subject grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {visibleFaecher.map((subject) => (
            <div
              key={subject.id}
              className={`group relative rounded-2xl border bg-white/[0.02] p-6 transition-colors duration-200 hover:bg-white/[0.04] ${subject.color.border}`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${subject.color.border} ${subject.color.bg} ${subject.color.text}`}>
                {subject.icon}
              </div>

              <h2 className={`mb-1.5 text-lg font-bold ${subject.color.text}`}>
                {subject.name}
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-slate-600">
                {subject.description}
              </p>

              <div className="mb-5 flex items-center gap-4 text-xs text-slate-700">
                <span>{subject.quizCount} Quiz-Fragen</span>
                <span>·</span>
                <span>{subject.altklausurenCount} Altklausuren</span>
              </div>

              <div className="flex gap-2.5">
                <Link
                  href={`/${standort}/${subject.id}/quiz`}
                  className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${subject.color.quizBtn}`}
                >
                  Quiz starten
                </Link>
                <button
                  disabled
                  className="flex-1 cursor-not-allowed rounded-lg border border-white/6 bg-white/[0.02] px-4 py-2 text-center text-sm font-medium text-slate-700"
                >
                  Altklausuren
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Semester selection view
  return (
    <div>
      <p className="mb-6 text-sm text-slate-600">
        Wähle dein Semester, um zu den passenden Fächern zu gelangen.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {semesters.map((sem) => (
          <button
            key={sem.number}
            onClick={() => sem.available && setSelectedSemester(sem.number as SemesterNumber)}
            disabled={!sem.available}
            className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${
              sem.available
                ? "border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 cursor-pointer"
                : "border-white/4 bg-white/[0.01] cursor-not-allowed opacity-50"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Number */}
            <div className={`mb-3 text-3xl font-black tracking-tight ${sem.available ? "text-white" : "text-slate-700"}`}>
              {sem.number}
            </div>

            {/* Label */}
            <div className={`mb-2 text-sm font-semibold ${sem.available ? "text-slate-200" : "text-slate-600"}`}>
              {sem.label}
            </div>

            {/* Subjects or "coming soon" */}
            {sem.available ? (
              <div className="text-xs text-slate-500">
                {semesterSubjectNames[sem.number as 1 | 2]}
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 rounded-md border border-white/6 bg-white/4 px-2 py-0.5 text-xs text-slate-600">
                Bald verfügbar
              </div>
            )}

            {/* Arrow for available semesters */}
            {sem.available && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 text-slate-600 group-hover:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
