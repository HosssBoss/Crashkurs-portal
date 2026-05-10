import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const FACH_COLORS: Record<string, string> = {
  chemie: "text-orange-400 bg-orange-500/10 border-orange-500/25",
  biochemie: "text-green-400 bg-green-500/10 border-green-500/25",
  physik: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  biologie: "text-sky-400 bg-sky-500/10 border-sky-500/25",
  physiologie: "text-rose-400 bg-rose-500/10 border-rose-500/25",
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: questions } = await supabase
    .from("questions")
    .select("id, fach, created_at, question")
    .order("created_at", { ascending: false });

  const total = questions?.length ?? 0;

  const byFach: Record<string, number> = {};
  for (const q of questions ?? []) {
    byFach[q.fach] = (byFach[q.fach] ?? 0) + 1;
  }

  const recent = (questions ?? []).slice(0, 5);

  const quickActions = [
    {
      href: "/admin/questions/new",
      label: "Neue Frage",
      desc: "Frage manuell erstellen",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: "border-violet-500/25 bg-violet-500/10 text-violet-400 hover:bg-violet-500/15",
    },
    {
      href: "/admin/questions",
      label: "Alle Fragen",
      desc: `${total} Fragen verwalten`,
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "border-blue-500/25 bg-blue-500/10 text-blue-400 hover:bg-blue-500/15",
    },
    {
      href: "/admin/pdf",
      label: "PDF Import",
      desc: "Fragen aus PDF extrahieren",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      color: "border-teal-500/25 bg-teal-500/10 text-teal-400 hover:bg-teal-500/15",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Übersicht und Schnellzugriff</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-1 lg:col-span-1 rounded-2xl border border-white/8 bg-white/[0.025] p-5">
          <p className="text-xs text-slate-500">Gesamt</p>
          <p className="mt-1 text-3xl font-bold text-white">{total}</p>
          <p className="mt-0.5 text-xs text-slate-600">Fragen in Supabase</p>
        </div>
        {Object.entries(byFach).map(([fach, count]) => {
          const color = FACH_COLORS[fach] ?? "text-slate-400 bg-white/5 border-white/10";
          return (
            <div key={fach} className={`rounded-2xl border p-5 ${color}`}>
              <p className="text-xs opacity-70 capitalize">{fach}</p>
              <p className="mt-1 text-3xl font-bold">{count}</p>
              <p className="mt-0.5 text-xs opacity-50">Fragen</p>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-slate-400">Schnellzugriff</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group flex items-center gap-4 rounded-2xl border p-5 transition-colors ${a.color}`}
            >
              <div className="shrink-0">{a.icon}</div>
              <div>
                <p className="font-semibold text-white text-sm">{a.label}</p>
                <p className="text-xs opacity-60">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent questions */}
      {recent.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-400">Zuletzt hinzugefügt</h2>
            <Link href="/admin/questions" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
              Alle anzeigen →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            {recent.map((q, i) => {
              const color = FACH_COLORS[q.fach] ?? "text-slate-400";
              return (
                <div
                  key={q.id}
                  className={`flex items-center gap-4 px-5 py-3.5 ${i < recent.length - 1 ? "border-b border-white/5" : ""} bg-white/[0.015] hover:bg-white/[0.03] transition-colors`}
                >
                  <span className={`shrink-0 text-xs font-medium capitalize ${color.split(" ")[0]}`}>
                    {q.fach}
                  </span>
                  <p className="flex-1 truncate text-sm text-slate-300">{q.question}</p>
                  <Link
                    href={`/admin/questions/${q.id}/edit`}
                    className="shrink-0 text-xs text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {total === 0 && (
        <div className="rounded-2xl border border-dashed border-white/8 py-14 text-center">
          <p className="text-slate-500">Noch keine Fragen in Supabase.</p>
          <Link href="/admin/questions/new" className="mt-3 inline-block text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Erste Frage erstellen →
          </Link>
        </div>
      )}
    </div>
  );
}
