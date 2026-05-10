import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NavAuth } from "@/app/components/NavAuth";
import Link from "next/link";
import StandortClient from "./StandortClient";

export const locationData = {
  msb: {
    short: "MSB",
    name: "MSB Medical School Berlin",
    city: "Berlin",
    accentText: "text-sky-300",
    pillClass: "bg-sky-950/60 text-sky-300 border border-sky-800/35",
    dotClass: "bg-sky-400",
    badgeBorder: "border-sky-800/30",
  },
  msh: {
    short: "MSH",
    name: "MSH Medical School Hamburg",
    city: "Hamburg",
    accentText: "text-teal-300",
    pillClass: "bg-teal-950/60 text-teal-300 border border-teal-800/35",
    dotClass: "bg-teal-400",
    badgeBorder: "border-teal-800/30",
  },
  hmu: {
    short: "HMU",
    name: "HMU Health and Medical University",
    city: "Potsdam",
    accentText: "text-violet-300",
    pillClass: "bg-violet-950/60 text-violet-300 border border-violet-800/35",
    dotClass: "bg-violet-400",
    badgeBorder: "border-violet-800/30",
  },
} as const;

type Standort = keyof typeof locationData;

export function generateStaticParams() {
  return Object.keys(locationData).map((standort) => ({ standort }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ standort: string }>;
}): Promise<Metadata> {
  const { standort } = await params;
  const loc = locationData[standort as Standort];
  if (!loc) return { title: "Nicht gefunden" };
  return {
    title: `${loc.short} – Semesterübersicht | MedLearn`,
    description: `Lernmaterial für ${loc.name} – Chemie, Physik, Biochemie, Physiologie.`,
  };
}

export default async function StandortPage({
  params,
}: {
  params: Promise<{ standort: string }>;
}) {
  const { standort } = await params;
  const loc = locationData[standort as Standort];

  if (!loc) notFound();

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

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-slate-300">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Standortauswahl
          </Link>
          <span className="text-slate-700">/</span>
          <span className={loc.accentText}>{loc.short}</span>
        </div>

        {/* Location header */}
        <div className="mb-10">
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${loc.pillClass}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${loc.dotClass}`} />
            {loc.city}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className={loc.accentText}>{loc.short}</span>{" "}
            <span className="text-slate-400 text-2xl sm:text-3xl font-semibold">
              Semesterübersicht
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">{loc.name}</p>
        </div>

        <StandortClient standort={standort} loc={loc} />
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-white/5 px-4 py-6 text-center">
        <p className="text-xs text-slate-700">
          © 2026 MedLearn Portal ·{" "}
          <span className="text-slate-600">MSB Berlin · MSH Hamburg · HMU Potsdam</span>
        </p>
      </footer>
    </div>
  );
}
