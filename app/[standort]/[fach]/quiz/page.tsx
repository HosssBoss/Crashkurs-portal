import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { NavAuth } from "@/app/components/NavAuth";
import { QuizClient } from "./QuizClient";

const locationData = {
  msb: {
    short: "MSB",
    name: "MSB Medical School Berlin",
    accentText: "text-sky-300",
    pillClass: "bg-sky-950/60 text-sky-300 border border-sky-800/35",
    dotClass: "bg-sky-400",
  },
  msh: {
    short: "MSH",
    name: "MSH Medical School Hamburg",
    accentText: "text-teal-300",
    pillClass: "bg-teal-950/60 text-teal-300 border border-teal-800/35",
    dotClass: "bg-teal-400",
  },
  hmu: {
    short: "HMU",
    name: "HMU Health and Medical University",
    accentText: "text-violet-300",
    pillClass: "bg-violet-950/60 text-violet-300 border border-violet-800/35",
    dotClass: "bg-violet-400",
  },
} as const;

const subjectData = {
  chemie: { name: "Chemie" },
  biochemie: { name: "Biochemie 1" },
  physik: { name: "Physik" },
  biologie: { name: "Biologie" },
  physiologie: { name: "Physiologie 1" },
} as const;

type Standort = keyof typeof locationData;
type Fach = keyof typeof subjectData;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ standort: string; fach: string }>;
}): Promise<Metadata> {
  const { standort, fach } = await params;
  const loc = locationData[standort as Standort];
  const sub = subjectData[fach as Fach];
  if (!loc || !sub) return { title: "Nicht gefunden" };
  return {
    title: `${sub.name} Quiz – ${loc.short} | MedLearn`,
    description: `Teste dein Wissen in ${sub.name} mit Multiple-Choice-Fragen für ${loc.name}.`,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ standort: string; fach: string }>;
}) {
  const { standort, fach } = await params;

  const loc = locationData[standort as Standort];
  const sub = subjectData[fach as Fach];

  if (!loc || !sub) notFound();

  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#07101f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-700 shadow-lg shadow-blue-900/40">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-white">MedLearn</span>
            </Link>
            <NavAuth />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-slate-300">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Standorte
          </Link>
          <span className="text-slate-700">/</span>
          <Link
            href={`/${standort}`}
            className={`transition-colors hover:text-slate-300 ${loc.accentText}`}
          >
            {loc.short}
          </Link>
          <span className="text-slate-700">/</span>
          <Link href={`/${standort}`} className="transition-colors hover:text-slate-300">
            {sub.name}
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400">Quiz</span>
        </div>

        <QuizClient
          standort={standort}
          fach={fach}
          fachName={sub.name}
          locShort={loc.short}
          locPillClass={loc.pillClass}
          locDotClass={loc.dotClass}
        />
      </main>
    </div>
  );
}
