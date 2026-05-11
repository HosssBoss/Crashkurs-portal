import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { NavAuth } from "@/app/components/NavAuth";
import { createClient } from "@/lib/supabase/server";
import { getSessionHistory } from "@/app/actions/sessions";

const fachMeta: Record<string, { name: string; color: string; border: string; bg: string }> = {
  chemie:      { name: "Chemie",      color: "text-amber-300",   border: "border-amber-800/40",   bg: "bg-amber-950/50"   },
  physik:      { name: "Physik",      color: "text-indigo-300",  border: "border-indigo-800/40",  bg: "bg-indigo-950/50"  },
  biochemie:   { name: "Biochemie 1", color: "text-emerald-300", border: "border-emerald-800/40", bg: "bg-emerald-950/50" },
  physiologie: { name: "Physiologie 1",color: "text-rose-300",   border: "border-rose-800/40",    bg: "bg-rose-950/50"    },
};

const locMeta: Record<string, { short: string }> = {
  msb: { short: "MSB" }, msh: { short: "MSH" }, hmu: { short: "HMU" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ standort: string; fach: string }>;
}): Promise<Metadata> {
  const { fach } = await params;
  const meta = fachMeta[fach];
  return { title: `${meta?.name ?? fach} – Fortschritt | MedLearn` };
}

// ── SVG Line Chart ───────────────────────────────────────────────────────────
function LineChart({ sessions }: { sessions: { percentage: number; session_type: string }[] }) {
  if (sessions.length === 0) return null;

  const W = 400, H = 140;
  const pad = { l: 32, r: 12, t: 12, b: 24 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  const n = sessions.length;
  const getX = (i: number) => pad.l + (n === 1 ? pw / 2 : (i / (n - 1)) * pw);
  const getY = (pct: number) => pad.t + ph - (pct / 100) * ph;

  const passY = getY(60);
  const pathD = sessions
    .map((s, i) => `${i === 0 ? "M" : "L"} ${getX(i).toFixed(1)} ${getY(s.percentage).toFixed(1)}`)
    .join(" ");

  const yLabels = [0, 25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {yLabels.map((pct) => (
        <g key={pct}>
          <line
            x1={pad.l} x2={W - pad.r}
            y1={getY(pct)} y2={getY(pct)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1"
          />
          <text x={pad.l - 4} y={getY(pct) + 4} textAnchor="end"
            fill="rgba(148,163,184,0.5)" fontSize="9">
            {pct}
          </text>
        </g>
      ))}
      {/* 60% pass threshold */}
      <line
        x1={pad.l} x2={W - pad.r}
        y1={passY} y2={passY}
        stroke="rgba(245,158,11,0.35)" strokeWidth="1" strokeDasharray="4 3"
      />
      <text x={W - pad.r + 2} y={passY + 4} fill="rgba(245,158,11,0.6)" fontSize="8">60%</text>

      {/* Line */}
      {n > 1 && (
        <path d={pathD} fill="none" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
      )}

      {/* Dots */}
      {sessions.map((s, i) => (
        <circle
          key={i}
          cx={getX(i)} cy={getY(s.percentage)} r="3.5"
          fill={s.percentage >= 60 ? "rgb(52,211,153)" : "rgb(248,113,113)"}
          stroke="rgba(7,16,31,0.8)" strokeWidth="1"
        />
      ))}

      {/* X-axis labels: first and last */}
      <text x={getX(0)} y={H - 4} textAnchor="middle"
        fill="rgba(148,163,184,0.4)" fontSize="8">1</text>
      {n > 1 && (
        <text x={getX(n - 1)} y={H - 4} textAnchor="middle"
          fill="rgba(148,163,184,0.4)" fontSize="8">{n}</text>
      )}
    </svg>
  );
}

export default async function FortschrittPage({
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

  const sessions = await getSessionHistory(fach, 50);

  const ubungSessions = sessions.filter((s) => s.session_type === "uebung");
  const pruefungSessions = sessions.filter((s) => s.session_type === "pruefung");

  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;
  const best = (arr: number[]) => (arr.length ? Math.max(...arr) : null);

  const allPct = sessions.map((s) => s.percentage);
  const pruefungPct = pruefungSessions.map((s) => s.percentage);
  const ubungPct = ubungSessions.map((s) => s.percentage);

  const stats = [
    { label: "Sitzungen gesamt", value: sessions.length },
    { label: "Beste Prüfung", value: best(pruefungPct) !== null ? `${best(pruefungPct)}%` : "–" },
    { label: "Ø Prüfung", value: avg(pruefungPct) !== null ? `${avg(pruefungPct)}%` : "–" },
    { label: "Ø Übung", value: avg(ubungPct) !== null ? `${avg(ubungPct)}%` : "–" },
  ];

  // Last 20 for chart
  const chartData = sessions.slice(-20);

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
          <span className="text-slate-400">Fortschritt</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              <span className={meta.color}>{meta.name}</span>
              <span className="ml-2 text-slate-400 text-xl font-semibold">Fortschritt</span>
            </h1>
            <p className="mt-1 text-sm text-slate-600">Deine persönlichen Lernstatistiken</p>
          </div>
          <Link
            href={`/${standort}/${fach}/rangliste`}
            className="flex items-center gap-1.5 rounded-lg border border-white/8 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Rangliste
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-12 text-center">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-slate-400 font-medium">Noch keine Sitzungen absolviert</p>
            <p className="mt-1 text-sm text-slate-600">Starte dein erstes Quiz, um deinen Fortschritt zu sehen.</p>
            <Link
              href={`/${standort}/${fach}/quiz`}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 transition-colors"
            >
              Quiz starten
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/7 bg-white/[0.025] p-4">
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="mt-0.5 text-xs text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-white/7 bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-300">Verlauf (letzte {chartData.length} Sitzungen)</p>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Bestanden</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" /> Nicht bestanden</span>
                </div>
              </div>
              <LineChart sessions={chartData} />
            </div>

            {/* Session list */}
            <div className="rounded-2xl border border-white/7 bg-white/[0.02] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5">
                <p className="text-sm font-medium text-slate-300">Alle Sitzungen</p>
              </div>
              <div className="divide-y divide-white/4">
                {[...sessions].reverse().slice(0, 20).map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs rounded-md px-2 py-0.5 border font-medium ${
                        s.session_type === "pruefung"
                          ? "border-violet-800/40 bg-violet-950/40 text-violet-300"
                          : "border-sky-800/40 bg-sky-950/40 text-sky-300"
                      }`}>
                        {s.session_type === "pruefung" ? "Prüfung" : "Übung"}
                      </span>
                      <span className="text-xs text-slate-600">
                        {s.thema ?? "50 Fragen"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${s.percentage >= 60 ? "text-emerald-300" : "text-red-300"}`}>
                        {s.percentage}%
                      </span>
                      <span className="text-xs text-slate-700">
                        {new Date(s.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
