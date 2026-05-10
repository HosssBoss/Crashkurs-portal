"use client";

import { useState, useTransition, useMemo } from "react";
import Link from "next/link";
import {
  toggleStatus,
  moveFrage,
  deleteFrage,
  importFromQuizData,
  type DbFrage,
} from "@/app/actions/fragen";

// ── Helpers ───────────────────────────────────────────────────────────────────

const FACH_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  chemie:      { text: "text-orange-400", bg: "bg-orange-500/10",  border: "border-orange-500/20"  },
  biochemie:   { text: "text-green-400",  bg: "bg-green-500/10",   border: "border-green-500/20"   },
  physik:      { text: "text-yellow-400", bg: "bg-yellow-500/10",  border: "border-yellow-500/20"  },
  biologie:    { text: "text-sky-400",    bg: "bg-sky-500/10",     border: "border-sky-500/20"     },
  physiologie: { text: "text-rose-400",   bg: "bg-rose-500/10",    border: "border-rose-500/20"    },
};

function FachBadge({ fach }: { fach: string }) {
  const c = FACH_COLORS[fach] ?? { text: "text-slate-400", bg: "bg-white/5", border: "border-white/10" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${c.text} ${c.bg} ${c.border}`}>
      {fach}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    "quiz-data": "text-blue-400 bg-blue-500/10 border-blue-500/20",
    manual:      "text-slate-400 bg-white/5 border-white/10",
    pdf:         "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${map[source] ?? map.manual}`}>
      {source}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

type View = "tabelle" | "kategorien";

export default function FragenClient({ initialFragen }: { initialFragen: DbFrage[] }) {
  const [fragen, setFragen] = useState<DbFrage[]>(initialFragen);
  const [view, setView] = useState<View>("tabelle");
  const [search, setSearch] = useState("");
  const [filterFach, setFilterFach] = useState("");
  const [filterThema, setFilterThema] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "active" | "inactive">("");
  const [, startTransition] = useTransition();
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ imported?: number; skipped?: number; error?: string } | null>(null);

  // Derived lists for filter dropdowns
  const allFaecher = useMemo(() => [...new Set(fragen.map((f) => f.fach))].sort(), [fragen]);
  const allThemen = useMemo(
    () => [...new Set(fragen.filter((f) => !filterFach || f.fach === filterFach).map((f) => f.thema))].sort(),
    [fragen, filterFach]
  );

  // Filtered questions
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return fragen.filter((f) => {
      if (filterFach && f.fach !== filterFach) return false;
      if (filterThema && f.thema !== filterThema) return false;
      if (filterStatus && f.status !== filterStatus) return false;
      if (q && !f.question.toLowerCase().includes(q) && !f.thema.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [fragen, search, filterFach, filterThema, filterStatus]);

  // All fach+thema combinations for move dropdown
  const allKategorien = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const f of fragen) {
      if (!map.has(f.fach)) map.set(f.fach, new Set());
      map.get(f.fach)!.add(f.thema);
    }
    const result: { fach: string; thema: string }[] = [];
    for (const [fach, themen] of [...map.entries()].sort()) {
      for (const thema of [...themen].sort()) result.push({ fach, thema });
    }
    return result;
  }, [fragen]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  function handleToggle(id: string, current: "active" | "inactive") {
    // Optimistic update
    setFragen((prev) =>
      prev.map((f) => f.id === id ? { ...f, status: current === "active" ? "inactive" : "active" } : f)
    );
    startTransition(async () => {
      const res = await toggleStatus(id, current);
      if (res.error) {
        // Revert
        setFragen((prev) => prev.map((f) => f.id === id ? { ...f, status: current } : f));
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Frage wirklich löschen?")) return;
    setFragen((prev) => prev.filter((f) => f.id !== id));
    startTransition(async () => {
      const res = await deleteFrage(id);
      if (res.error) {
        alert("Löschen fehlgeschlagen: " + res.error);
        // Reload would be ideal here — simplified by just leaving it removed
      }
    });
  }

  function handleMove(id: string, newFach: string, newThema: string) {
    setFragen((prev) =>
      prev.map((f) => f.id === id ? { ...f, fach: newFach, thema: newThema } : f)
    );
    startTransition(async () => {
      const res = await moveFrage(id, newFach, newThema);
      if (res.error) alert("Verschieben fehlgeschlagen: " + res.error);
    });
  }

  async function handleImport() {
    setImporting(true);
    setImportResult(null);
    const result = await importFromQuizData();
    setImportResult(result);
    setImporting(false);
    if (!result.error && result.imported > 0) {
      // Reload page to get fresh data
      window.location.reload();
    }
  }

  // ── Render helpers ───────────────────────────────────────────────────────────

  function MoveDropdown({ frage }: { frage: DbFrage }) {
    return (
      <select
        value={`${frage.fach}||${frage.thema}`}
        onChange={(e) => {
          const [nf, nt] = e.target.value.split("||");
          if (nf !== frage.fach || nt !== frage.thema) handleMove(frage.id, nf, nt);
        }}
        className="rounded-lg border border-white/8 bg-[#0d1b2e] px-2 py-1 text-xs text-slate-300 outline-none"
        title="Verschieben zu…"
      >
        {allKategorien.map(({ fach, thema }) => (
          <option key={`${fach}||${thema}`} value={`${fach}||${thema}`}>
            {fach} / {thema}
          </option>
        ))}
      </select>
    );
  }

  function StatusToggle({ frage }: { frage: DbFrage }) {
    return (
      <button
        onClick={() => handleToggle(frage.id, frage.status)}
        title={frage.status === "active" ? "Deaktivieren" : "Aktivieren"}
        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
          frage.status === "active"
            ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
            : "border-slate-600 bg-white/4 text-slate-500 hover:bg-white/8 hover:text-slate-300"
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${frage.status === "active" ? "bg-green-400" : "bg-slate-600"}`} />
        {frage.status === "active" ? "Aktiv" : "Inaktiv"}
      </button>
    );
  }

  // ── Tabelle view ─────────────────────────────────────────────────────────────

  function TabelleView() {
    return (
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500">
            {search || filterFach || filterThema || filterStatus ? "Keine Fragen gefunden." : "Noch keine Fragen vorhanden."}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Frage</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Fach</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Thema</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Quelle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr
                  key={f.id}
                  className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "bg-white/[0.01]" : ""} ${f.status === "inactive" ? "opacity-50" : ""}`}
                >
                  <td className="max-w-xs px-4 py-3 text-slate-300">
                    <p className="line-clamp-2 text-sm">{f.question}</p>
                  </td>
                  <td className="px-4 py-3"><FachBadge fach={f.fach} /></td>
                  <td className="px-4 py-3 text-xs text-slate-400">{f.thema}</td>
                  <td className="px-4 py-3"><SourceBadge source={f.source} /></td>
                  <td className="px-4 py-3"><StatusToggle frage={f} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <MoveDropdown frage={f} />
                      <Link
                        href={`/admin/questions/${f.id}/edit`}
                        className="rounded-lg border border-white/8 px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-white/15 hover:text-white"
                      >
                        Bearbeiten
                      </Link>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // ── Kategorien view ───────────────────────────────────────────────────────────

  function KategorienView() {
    const [openFaecher, setOpenFaecher] = useState<Set<string>>(new Set(allFaecher));
    const [openThemen, setOpenThemen] = useState<Set<string>>(new Set());

    const grouped = useMemo(() => {
      const map = new Map<string, Map<string, DbFrage[]>>();
      for (const f of filtered) {
        if (!map.has(f.fach)) map.set(f.fach, new Map());
        const sub = map.get(f.fach)!;
        if (!sub.has(f.thema)) sub.set(f.thema, []);
        sub.get(f.thema)!.push(f);
      }
      return map;
    }, []);

    const toggleFach = (fach: string) =>
      setOpenFaecher((prev) => { const n = new Set(prev); n.has(fach) ? n.delete(fach) : n.add(fach); return n; });

    const toggleThema = (key: string) =>
      setOpenThemen((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

    if (grouped.size === 0) {
      return <div className="py-16 text-center text-sm text-slate-500">Keine Fragen gefunden.</div>;
    }

    return (
      <div className="space-y-3">
        {[...grouped.entries()].sort().map(([fach, themen]) => {
          const fachTotal = [...themen.values()].reduce((s, qs) => s + qs.length, 0);
          const c = FACH_COLORS[fach] ?? { text: "text-slate-400", bg: "bg-white/5", border: "border-white/10" };
          const isOpen = openFaecher.has(fach);
          return (
            <div key={fach} className={`rounded-2xl border ${c.border} bg-white/[0.02] overflow-hidden`}>
              <button
                onClick={() => toggleFach(fach)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <span className={`text-sm font-bold capitalize ${c.text}`}>{fach}</span>
                <span className="text-xs text-slate-600">{fachTotal} Fragen · {themen.size} Themen</span>
                <svg className={`ml-auto h-4 w-4 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-white/5 px-4 pb-4 pt-2 space-y-2">
                  {[...themen.entries()].sort().map(([thema, qs]) => {
                    const key = `${fach}||${thema}`;
                    const isThemaOpen = openThemen.has(key);
                    return (
                      <div key={thema} className="rounded-xl border border-white/5 bg-white/[0.02]">
                        <button
                          onClick={() => toggleThema(key)}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left"
                        >
                          <span className="text-sm font-medium text-slate-300">{thema}</span>
                          <span className="text-xs text-slate-600">{qs.length} Fragen</span>
                          <svg className={`ml-auto h-3.5 w-3.5 text-slate-600 transition-transform ${isThemaOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isThemaOpen && (
                          <div className="border-t border-white/5">
                            {qs.map((f) => (
                              <div key={f.id} className={`flex items-center gap-3 border-b border-white/5 last:border-0 px-4 py-2.5 ${f.status === "inactive" ? "opacity-50" : ""}`}>
                                <span className="flex-1 text-sm text-slate-400 line-clamp-1">{f.question}</span>
                                <SourceBadge source={f.source} />
                                <StatusToggle frage={f} />
                                <MoveDropdown frage={f} />
                                <Link href={`/admin/questions/${f.id}/edit`} className="text-xs text-slate-500 hover:text-white transition-colors">Bearbeiten</Link>
                                <button onClick={() => handleDelete(f.id)} className="text-xs text-red-500 hover:text-red-400 transition-colors">×</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  const activeCount = fragen.filter((f) => f.status === "active").length;

  return (
    <div className="space-y-5">
      {/* Import result banner */}
      {importResult && (
        <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${importResult.error ? "border-red-500/25 bg-red-500/10" : "border-green-500/25 bg-green-500/10"}`}>
          <div className="flex-1 text-sm">
            {importResult.error ? (
              <p className="text-red-300">Import fehlgeschlagen: {importResult.error}</p>
            ) : (
              <p className="text-green-300">
                <strong>{importResult.imported} Fragen</strong> importiert
                {importResult.skipped ? `, ${importResult.skipped} bereits vorhanden` : ""}.
              </p>
            )}
          </div>
          <button onClick={() => setImportResult(null)} className="text-slate-500 hover:text-white">×</button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-48 flex-1">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Frage oder Thema suchen…"
            className="w-full rounded-xl border border-white/8 bg-white/4 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50"
          />
        </div>

        {/* Fach filter */}
        <select
          value={filterFach}
          onChange={(e) => { setFilterFach(e.target.value); setFilterThema(""); }}
          className="rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-sm text-slate-300 outline-none focus:border-violet-500/50"
        >
          <option value="" className="bg-[#0d1b2e]">Alle Fächer</option>
          {allFaecher.map((f) => <option key={f} value={f} className="bg-[#0d1b2e] capitalize">{f}</option>)}
        </select>

        {/* Thema filter */}
        <select
          value={filterThema}
          onChange={(e) => setFilterThema(e.target.value)}
          className="rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-sm text-slate-300 outline-none focus:border-violet-500/50"
        >
          <option value="" className="bg-[#0d1b2e]">Alle Themen</option>
          {allThemen.map((t) => <option key={t} value={t} className="bg-[#0d1b2e]">{t}</option>)}
        </select>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "" | "active" | "inactive")}
          className="rounded-xl border border-white/8 bg-white/4 px-3 py-2 text-sm text-slate-300 outline-none focus:border-violet-500/50"
        >
          <option value="" className="bg-[#0d1b2e]">Alle Status</option>
          <option value="active" className="bg-[#0d1b2e]">Aktiv</option>
          <option value="inactive" className="bg-[#0d1b2e]">Inaktiv</option>
        </select>

        {/* View toggle */}
        <div className="flex rounded-xl border border-white/8 bg-white/4 p-0.5">
          {(["tabelle", "kategorien"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${view === v ? "bg-violet-500/20 text-violet-300" : "text-slate-500 hover:text-slate-300"}`}
            >
              {v === "tabelle" ? "Tabelle" : "Kategorien"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats + actions row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          <span className="font-medium text-white">{filtered.length}</span> von {fragen.length} Fragen
          {" · "}
          <span className="text-green-400">{activeCount} aktiv</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleImport}
            disabled={importing}
            className="flex items-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/15 disabled:opacity-60"
          >
            {importing ? (
              <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Importiere…</>
            ) : (
              <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>quiz-data.ts importieren</>
            )}
          </button>
          <Link
            href="/admin/questions/new"
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Neue Frage
          </Link>
        </div>
      </div>

      {/* Content */}
      {view === "tabelle" ? <TabelleView /> : <KategorienView />}
    </div>
  );
}
