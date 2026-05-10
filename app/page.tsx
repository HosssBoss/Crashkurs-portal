import Link from "next/link";
import { NavAuth } from "@/app/components/NavAuth";

const locations = [
  {
    id: "msb",
    short: "MSB",
    name: "MSB Medical School Berlin",
    city: "Berlin",
    description:
      "Medizinstudium an Deutschlands größter privater Universität im Herzen der Hauptstadt.",
    quizCount: 120,
    altklausurenCount: 24,
    wrapperClass: "border-sky-800/40 hover:border-sky-700/50",
    accentText: "text-sky-300",
    pillClass: "bg-sky-950/60 text-sky-300 border border-sky-800/35",
    dotClass: "bg-sky-400",
    arrowBg: "bg-sky-950/60",
    arrowText: "text-sky-300",
    glowClass: "hover:glow-blue",
  },
  {
    id: "msh",
    short: "MSH",
    name: "MSH Medical School Hamburg",
    city: "Hamburg",
    description:
      "Innovative Medizinausbildung an der Elbe mit modernsten Lern- und Lehrmethoden.",
    quizCount: 98,
    altklausurenCount: 18,
    wrapperClass: "border-teal-800/40 hover:border-teal-700/50",
    accentText: "text-teal-300",
    pillClass: "bg-teal-950/60 text-teal-300 border border-teal-800/35",
    dotClass: "bg-teal-400",
    arrowBg: "bg-teal-950/60",
    arrowText: "text-teal-300",
    glowClass: "hover:glow-teal",
  },
  {
    id: "hmu",
    short: "HMU",
    name: "HMU Health and Medical University",
    city: "Potsdam",
    description:
      "Zukunftsorientiertes Medizinstudium in der Wissenschaftsstadt an der Havel.",
    quizCount: 85,
    altklausurenCount: 14,
    wrapperClass: "border-violet-800/40 hover:border-violet-700/50",
    accentText: "text-violet-300",
    pillClass: "bg-violet-950/60 text-violet-300 border border-violet-800/35",
    dotClass: "bg-violet-400",
    arrowBg: "bg-violet-950/60",
    arrowText: "text-violet-300",
    glowClass: "hover:glow-violet",
  },
];

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Multiple Choice Quiz",
    desc: "Lerne mit tausenden Fragen aus Chemie, Biochemie, Physik und Physiologie.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Altklausuren",
    desc: "Übe mit echten Klausuren aus vergangenen Semestern deiner Uni.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Fortschrittsanalyse",
    desc: "Verfolge deinen Lernfortschritt und sieh deine Schwächen auf einen Blick.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Rangliste",
    desc: "Vergleiche dich mit Kommilitonen und sieh, wo du im Kurs stehst.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#07101f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-blue-700 shadow-lg shadow-blue-900/40">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-white">MedLearn</span>
            </div>
            <NavAuth />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24 sm:pb-16">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700/40 bg-slate-800/30 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
            <span className="text-xs font-medium tracking-wide text-slate-400">
              Crashkurs-Portal · Sommersemester 2026
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Dein Lernportal für{" "}
            <span className="bg-gradient-to-r from-sky-200 via-blue-100 to-violet-200 bg-clip-text text-transparent">
              Medizin-Crashkurse
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Effektiv vorbereiten mit Quizzes, Altklausuren und
            Fortschrittsanalyse — speziell für private Medizin-Unis in Deutschland.
          </p>

          <p className="mb-10 text-sm font-medium text-slate-600">Wähle deinen Standort</p>

          {/* Location Cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                href={`/${loc.id}`}
                className={`group relative overflow-hidden rounded-2xl border bg-white/[0.02] p-6 text-left transition-all duration-300 ${loc.wrapperClass} ${loc.glowClass}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />

                <div className={`mb-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${loc.pillClass}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${loc.dotClass}`} />
                  {loc.city}
                </div>

                <div className={`mb-1 text-4xl font-bold tracking-tight ${loc.accentText}`}>
                  {loc.short}
                </div>

                <div className="mb-3 text-sm font-medium text-slate-500">
                  {loc.name}
                </div>

                <p className="mb-5 text-sm leading-relaxed text-slate-600">
                  {loc.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {loc.quizCount}+ Fragen
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {loc.altklausurenCount} Altklausuren
                  </span>
                </div>

                <div className={`absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full ${loc.arrowBg} opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5`}>
                  <svg className={`h-4 w-4 ${loc.arrowText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Alles was du für den Crashkurs brauchst
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Entwickelt speziell für Medizinstudierende an MSB, MSH und HMU
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.015] p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/6 bg-white/4 text-slate-500">
                  {f.icon}
                </div>
                <div className="mb-1.5 text-sm font-semibold text-slate-200">{f.title}</div>
                <div className="text-xs leading-relaxed text-slate-600">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.012] px-6 py-5">
            <div className="grid grid-cols-3 divide-x divide-white/5 text-center">
              {[
                { value: "303+", label: "Quiz-Fragen" },
                { value: "56", label: "Altklausuren" },
                { value: "3", label: "Standorte" },
              ].map((stat) => (
                <div key={stat.label} className="px-4 sm:px-8">
                  <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-0.5 text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-6 text-center">
        <p className="text-xs text-slate-700">
          © 2026 MedLearn Portal ·{" "}
          <span className="text-slate-600">MSB Berlin · MSH Hamburg · HMU Potsdam</span>
        </p>
      </footer>
    </div>
  );
}
