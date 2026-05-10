import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NavAuth } from "@/app/components/NavAuth";

const locationData = {
  msb: {
    short: "MSB",
    name: "MSB Medical School Berlin",
    city: "Berlin",
    accentText: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    pillClass: "bg-blue-500/15 text-blue-300 border border-blue-500/25",
    dotClass: "bg-blue-400",
    gradientFrom: "from-blue-500/20",
    badgeBorder: "border-blue-500/20",
  },
  msh: {
    short: "MSH",
    name: "MSH Medical School Hamburg",
    city: "Hamburg",
    accentText: "text-teal-400",
    accentBg: "bg-teal-500/10",
    accentBorder: "border-teal-500/30",
    pillClass: "bg-teal-500/15 text-teal-300 border border-teal-500/25",
    dotClass: "bg-teal-400",
    gradientFrom: "from-teal-500/20",
    badgeBorder: "border-teal-500/20",
  },
  hmu: {
    short: "HMU",
    name: "HMU Health and Medical University",
    city: "Potsdam",
    accentText: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    pillClass: "bg-violet-500/15 text-violet-300 border border-violet-500/25",
    dotClass: "bg-violet-400",
    gradientFrom: "from-violet-500/20",
    badgeBorder: "border-violet-500/20",
  },
} as const;

type Standort = keyof typeof locationData;

const subjects = [
  {
    id: "chemie",
    name: "Chemie",
    description:
      "Organische & anorganische Chemie, Reaktionsmechanismen, Stöchiometrie und Gleichgewichte.",
    quizCount: 45,
    altklausurenCount: 8,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    color: {
      text: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/25",
      quizBtn:
        "bg-orange-500/15 text-orange-300 border border-orange-500/25 hover:bg-orange-500/25",
      altBtn:
        "bg-white/4 text-slate-400 border border-white/7 hover:bg-white/7 hover:text-white",
    },
  },
  {
    id: "biochemie",
    name: "Biochemie",
    description:
      "Stoffwechselwege, Enzyme & Kinetik, Molekularbiologie, DNA-Replikation und Proteinsynthese.",
    quizCount: 62,
    altklausurenCount: 10,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        />
      </svg>
    ),
    color: {
      text: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/25",
      quizBtn:
        "bg-green-500/15 text-green-300 border border-green-500/25 hover:bg-green-500/25",
      altBtn:
        "bg-white/4 text-slate-400 border border-white/7 hover:bg-white/7 hover:text-white",
    },
  },
  {
    id: "physik",
    name: "Physik",
    description:
      "Mechanik, Elektrophysiologie, Optik, Thermodynamik und Wellenlehre für Mediziner.",
    quizCount: 38,
    altklausurenCount: 6,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    color: {
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/25",
      quizBtn:
        "bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 hover:bg-yellow-500/25",
      altBtn:
        "bg-white/4 text-slate-400 border border-white/7 hover:bg-white/7 hover:text-white",
    },
  },
  {
    id: "biologie",
    name: "Biologie",
    description:
      "Zellbiologie, Genetik, Physiologie, Anatomie und Mikrobiologie.",
    quizCount: 55,
    altklausurenCount: 9,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    color: {
      text: "text-sky-400",
      bg: "bg-sky-500/10",
      border: "border-sky-500/25",
      quizBtn:
        "bg-sky-500/15 text-sky-300 border border-sky-500/25 hover:bg-sky-500/25",
      altBtn:
        "bg-white/4 text-slate-400 border border-white/7 hover:bg-white/7 hover:text-white",
    },
  },
  {
    id: "physiologie",
    name: "Physiologie",
    description:
      "Herz-Kreislauf, Atmung, Niere, Nervensystem und Sinnesorgane – Körperfunktionen im Überblick.",
    quizCount: 19,
    altklausurenCount: 0,
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/25",
      quizBtn:
        "bg-rose-500/15 text-rose-300 border border-rose-500/25 hover:bg-rose-500/25",
      altBtn:
        "bg-white/4 text-slate-400 border border-white/7 hover:bg-white/7 hover:text-white",
    },
  },
];

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
    title: `${loc.short} – Fächerübersicht | MedLearn`,
    description: `Lernmaterial für ${loc.name} – Chemie, Biochemie, Physik, Biologie.`,
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

  const totalQuizzes = subjects.reduce((s, f) => s + f.quizCount, 0);
  const totalAlt = subjects.reduce((s, f) => s + f.altklausurenCount, 0);

  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#07101f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-blue-500/30">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-white">
                MedLearn
              </span>
            </Link>
            <NavAuth />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Standortauswahl
          </Link>
          <span className="text-slate-700">/</span>
          <span className={loc.accentText}>{loc.short}</span>
        </div>

        {/* Location header */}
        <div className="mb-10">
          <div
            className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${loc.pillClass}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${loc.dotClass}`} />
            {loc.city}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className={loc.accentText}>{loc.short}</span>{" "}
            <span className="text-slate-300 text-2xl sm:text-3xl font-semibold">
              Fächerübersicht
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">{loc.name}</p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: `${totalQuizzes}+ Fragen`, icon: "❓" },
              { label: `${totalAlt} Altklausuren`, icon: "📄" },
              { label: "4 Fächer", icon: "📚" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-slate-400 ${loc.badgeBorder} bg-white/3`}
              >
                <span>{stat.icon}</span>
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        {/* Subject grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className={`group relative rounded-2xl border bg-white/[0.02] p-6 transition-colors duration-200 hover:bg-white/[0.04] ${subject.color.border}`}
            >
              {/* Top shine */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              {/* Icon */}
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${subject.color.border} ${subject.color.bg} ${subject.color.text}`}
              >
                {subject.icon}
              </div>

              {/* Title */}
              <h2 className={`mb-1.5 text-lg font-bold ${subject.color.text}`}>
                {subject.name}
              </h2>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-slate-500">
                {subject.description}
              </p>

              {/* Stats */}
              <div className="mb-5 flex items-center gap-4 text-xs text-slate-600">
                <span>{subject.quizCount} Quiz-Fragen</span>
                <span>·</span>
                <span>{subject.altklausurenCount} Altklausuren</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5">
                <Link
                  href={`/${standort}/${subject.id}/quiz`}
                  className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${subject.color.quizBtn}`}
                >
                  Quiz starten
                </Link>
                <Link
                  href={`/${standort}/${subject.id}/altklausuren`}
                  className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${subject.color.altBtn}`}
                >
                  Altklausuren
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-white/5 px-4 py-6 text-center">
        <p className="text-xs text-slate-600">
          © 2026 MedLearn Portal ·{" "}
          <span className="text-slate-500">
            MSB Berlin · MSH Hamburg · HMU Potsdam
          </span>
        </p>
      </footer>
    </div>
  );
}
