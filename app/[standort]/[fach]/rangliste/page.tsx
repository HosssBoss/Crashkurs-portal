import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { NavAuth } from "@/app/components/NavAuth";
import { createClient } from "@/lib/supabase/server";
import { getLeaderboard } from "@/app/actions/sessions";

const fachMeta: Record<string, { name: string; color: string }> = {
  chemie:      { name: "Chemie",       color: "text-amber-300"   },
  physik:      { name: "Physik",       color: "text-indigo-300"  },
  biochemie:   { name: "Biochemie 1",  color: "text-emerald-300" },
  physiologie: { name: "Physiologie 1",color: "text-rose-300"    },
};

const locMeta: Record<string, { short: string; name: string }> = {
  msb: { short: "MSB", name: "MSB Berlin"    },
  msh: { short: "MSH", name: "MSH Hamburg"   },
  hmu: { short: "HMU", name: "HMU Potsdam"   },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ standort: string; fach: string }>;
}): Promise<Metadata> {
  const { fach, standort } = await params;
  const meta = fachMeta[fach];
  const loc = locMeta[standort];
  return { title: `${meta?.name ?? fach} Rangliste – ${loc?.short ?? standort} | MedLearn` };
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return <span className="w-7 text-center text-sm font-semibold text-slate-500">{rank}</span>;
}

function ScoreBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${percentage >= 60 ? "bg-emerald-600" : "bg-red-700"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-semibold tabular-nums ${percentage >= 60 ? "text-emerald-300" : "text-red-300"}`}>
        {percentage}%
      </span>
    </div>
  );
}

export default async function RanglistePage({
  params,
}: {
  params: Promise<{ standort: string; fach: string }>;
}) {
  const { standort, fach } = await params;

  const meta = fachMeta[fach];
  const loc = locMeta[standort];
  if (!meta || !loc) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { entries, myRank, percentile } = await getLeaderboard(standort, fach);

  const myEntry = entries.find((e) => e.is_me);
  // If I'm in top 50, myEntry is in entries. If rank > 50, fetch separately.
  const showSeparateMyEntry = myEntry && myEntry.rank > 25;
  const visibleEntries = entries.slice(0, 25);

  return (
    <div className="min-h-screen bg-grid">
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#07101f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
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

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-600">
          <Link href={`/${standort}`} className="hover:text-slate-300 transition-colors">{loc.short}</Link>
          <span>/</span>
          <Link href={`/${standort}/${fach}/quiz`} className={`hover:text-slate-300 transition-colors ${meta.color}`}>{meta.name}</Link>
          <span>/</span>
          <span className="text-slate-400">Rangliste</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              <span className={meta.color}>{meta.name}</span>
              <span className="ml-2 text-slate-400 text-xl font-semibold">Rangliste</span>
            </h1>
            <p className="mt-1 text-sm text-slate-600">{loc.name} · Nur Prüfungssitzungen (50 Fragen)</p>
          </div>
          <Link
            href={`/${standort}/${fach}/fortschritt`}
            className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Mein Fortschritt
          </Link>
        </div>

        {/* My position banner */}
        {myEntry && percentile !== null && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-violet-800/30 bg-violet-950/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <RankBadge rank={myEntry.rank} />
              <div>
                <p className="text-sm font-semibold text-violet-300">Deine Position: Platz {myEntry.rank}</p>
                <p className="text-xs text-slate-500">Beste Prüfung: {myEntry.best_percentage}%</p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Besser als <span className="font-semibold text-violet-300">{percentile}%</span> der Teilnehmer
            </p>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-12 text-center">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-slate-400 font-medium">Noch keine Prüfungssitzungen</p>
            <p className="mt-1 text-sm text-slate-600">
              Schließe eine Prüfungssitzung ab, um in der Rangliste zu erscheinen.
            </p>
            <Link
              href={`/${standort}/${fach}/quiz`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
            >
              Prüfungssitzung starten
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/7 bg-white/[0.02] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[40px_1fr_120px_60px] gap-3 border-b border-white/5 px-4 py-2.5">
              <span className="text-xs text-slate-600">#</span>
              <span className="text-xs text-slate-600">Teilnehmer</span>
              <span className="text-xs text-slate-600">Beste Prüfung</span>
              <span className="text-xs text-slate-600 text-right">Läufe</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/4">
              {visibleEntries.map((entry) => (
                <div
                  key={entry.user_id}
                  className={`grid grid-cols-[40px_1fr_120px_60px] gap-3 items-center px-4 py-3 transition-colors ${
                    entry.is_me ? "bg-violet-950/25 border-l-2 border-violet-500/50" : "hover:bg-white/[0.015]"
                  }`}
                >
                  <div className="flex items-center justify-start">
                    <RankBadge rank={entry.rank} />
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate text-sm font-medium text-slate-300">
                      {entry.display_name}
                    </span>
                    {entry.is_me && (
                      <span className="shrink-0 rounded-md border border-violet-700/40 bg-violet-900/30 px-1.5 py-0.5 text-[10px] text-violet-400">
                        Du
                      </span>
                    )}
                  </div>
                  <ScoreBar percentage={entry.best_percentage} />
                  <span className="text-right text-xs text-slate-600 tabular-nums">
                    {entry.session_count}
                  </span>
                </div>
              ))}
            </div>

            {/* If user is outside top 25, show them separated */}
            {showSeparateMyEntry && myEntry && (
              <>
                <div className="px-4 py-2 text-center text-xs text-slate-700">· · ·</div>
                <div className="grid grid-cols-[40px_1fr_120px_60px] gap-3 items-center px-4 py-3 bg-violet-950/25 border-l-2 border-violet-500/50">
                  <div className="flex items-center justify-start">
                    <span className="w-7 text-center text-sm font-semibold text-slate-500">{myEntry.rank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-300">{myEntry.display_name}</span>
                    <span className="shrink-0 rounded-md border border-violet-700/40 bg-violet-900/30 px-1.5 py-0.5 text-[10px] text-violet-400">Du</span>
                  </div>
                  <ScoreBar percentage={myEntry.best_percentage} />
                  <span className="text-right text-xs text-slate-600 tabular-nums">{myEntry.session_count}</span>
                </div>
              </>
            )}

            <div className="border-t border-white/5 px-4 py-2.5 text-center">
              <p className="text-xs text-slate-700">{entries.length} Teilnehmer gesamt</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
