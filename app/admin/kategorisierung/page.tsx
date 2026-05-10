"use client";

import { useState } from "react";
import { THEMEN_PER_FACH, type FachResult, type KategorisierungResult } from "@/lib/themen-config";
import { kategorisiereAlleFragen, kategorisiereFach } from "@/app/actions/kategorisierung";

const FACH_META: Record<string, { label: string; color: string; border: string; bg: string }> = {
  chemie:      { label: "Chemie",      color: "text-amber-300",   border: "border-amber-800/40",   bg: "bg-amber-950/50"   },
  physik:      { label: "Physik",      color: "text-indigo-300",  border: "border-indigo-800/40",  bg: "bg-indigo-950/50"  },
  biochemie:   { label: "Biochemie",   color: "text-emerald-300", border: "border-emerald-800/40", bg: "bg-emerald-950/50" },
  physiologie: { label: "Physiologie", color: "text-rose-300",    border: "border-rose-800/40",    bg: "bg-rose-950/50"    },
};

type FachState = "idle" | "running" | "done" | "error";

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function KategorisierungPage() {
  const [globalState, setGlobalState] = useState<"idle" | "running" | "done">("idle");
  const [globalResult, setGlobalResult] = useState<KategorisierungResult | null>(null);

  const [fachStates, setFachStates] = useState<Record<string, FachState>>({});
  const [fachResults, setFachResults] = useState<Record<string, FachResult & { errors: string[] }>>({});

  const setFachState = (fach: string, state: FachState) =>
    setFachStates((prev) => ({ ...prev, [fach]: state }));

  const handleAll = async () => {
    setGlobalState("running");
    setGlobalResult(null);
    setFachStates(
      Object.fromEntries(Object.keys(THEMEN_PER_FACH).map((f) => [f, "running"]))
    );
    try {
      const res = await kategorisiereAlleFragen();
      setGlobalResult(res);
      // Reflect per-fach results
      const newFachStates: Record<string, FachState> = {};
      const newFachResults: Record<string, FachResult & { errors: string[] }> = {};
      for (const fr of res.faecher) {
        newFachStates[fr.fach] = "done";
        newFachResults[fr.fach] = { ...fr, errors: [] };
      }
      // Mark failed ones (not in result)
      for (const fach of Object.keys(THEMEN_PER_FACH)) {
        if (!newFachStates[fach]) newFachStates[fach] = "error";
      }
      setFachStates(newFachStates);
      setFachResults(newFachResults);
    } catch (err) {
      setGlobalResult({
        updated: 0,
        faecher: [],
        errors: [err instanceof Error ? err.message : "Unbekannter Fehler"],
      });
      setFachStates(Object.fromEntries(Object.keys(THEMEN_PER_FACH).map((f) => [f, "error"])));
    } finally {
      setGlobalState("done");
    }
  };

  const handleSingleFach = async (fach: string) => {
    setFachState(fach, "running");
    try {
      const res = await kategorisiereFach(fach);
      setFachResults((prev) => ({ ...prev, [fach]: res }));
      setFachState(fach, res.errors.length > 0 ? "error" : "done");
    } catch (err) {
      setFachResults((prev) => ({
        ...prev,
        [fach]: {
          fach,
          updated: 0,
          themen: {},
          errors: [err instanceof Error ? err.message : "Fehler"],
        },
      }));
      setFachState(fach, "error");
    }
  };

  const isAnyRunning =
    globalState === "running" || Object.values(fachStates).some((s) => s === "running");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">KI-Kategorisierung</h1>
        <p className="mt-1 text-sm text-slate-500">
          Claude analysiert jede Frage in Supabase und weist ihr automatisch ein sinnvolles Unterthema zu.
        </p>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-800/35 bg-amber-950/30 px-4 py-3">
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div>
          <p className="text-xs font-medium text-amber-300">Überschreibt vorhandene Themen</p>
          <p className="mt-0.5 text-xs text-amber-700">
            Alle bestehenden thema-Werte in Supabase werden durch die neuen KI-Zuweisungen ersetzt. Die Aktion dauert 1–3 Minuten.
          </p>
        </div>
      </div>

      {/* Global action */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleAll}
          disabled={isAnyRunning}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {globalState === "running" ? (
            <>
              <SpinnerIcon />
              Läuft… (1–3 Min.)
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Alle Fächer kategorisieren
            </>
          )}
        </button>

        {globalResult && (
          <span className={`text-sm ${globalResult.errors.length ? "text-amber-300" : "text-emerald-300"}`}>
            {globalResult.updated} Fragen aktualisiert
            {globalResult.errors.length > 0 && ` · ${globalResult.errors.length} Fehler`}
          </span>
        )}
      </div>

      {/* Global errors */}
      {globalResult?.errors.length ? (
        <div className="rounded-xl border border-red-800/30 bg-red-950/30 px-4 py-3">
          {globalResult.errors.map((e, i) => (
            <p key={i} className="text-xs text-red-400">{e}</p>
          ))}
        </div>
      ) : null}

      {/* Per-fach cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {Object.entries(THEMEN_PER_FACH).map(([fach, themen]) => {
          const meta = FACH_META[fach] ?? { label: fach, color: "text-slate-300", border: "border-white/8", bg: "bg-white/4" };
          const state = fachStates[fach] ?? "idle";
          const result = fachResults[fach];

          return (
            <div key={fach} className={`rounded-2xl border ${meta.border} bg-white/[0.02] p-5`}>
              {/* Fach header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className={`text-base font-bold ${meta.color}`}>{meta.label}</h3>
                <button
                  onClick={() => handleSingleFach(fach)}
                  disabled={isAnyRunning}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${meta.border} ${meta.bg} ${meta.color} hover:opacity-80`}
                >
                  {state === "running" ? (
                    <><SpinnerIcon /> Läuft…</>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Nur {meta.label}
                    </>
                  )}
                </button>
              </div>

              {/* Result summary (shown after run) */}
              {result && state === "done" && (
                <div className={`mb-4 rounded-lg border px-3 py-2.5 ${meta.border} ${meta.bg}`}>
                  <p className={`mb-1.5 text-xs font-medium ${meta.color}`}>
                    {result.updated} Fragen zugeordnet
                  </p>
                  <div className="space-y-0.5">
                    {Object.entries(result.themen)
                      .sort(([, a], [, b]) => b - a)
                      .map(([thema, count]) => (
                        <div key={thema} className="flex items-center justify-between text-xs text-slate-500">
                          <span>{thema}</span>
                          <span className="tabular-nums">{count}</span>
                        </div>
                      ))}
                  </div>
                  {result.errors.length > 0 && (
                    <div className="mt-2 border-t border-white/5 pt-2">
                      {result.errors.map((e, i) => (
                        <p key={i} className="text-xs text-red-400">{e}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Topic taxonomy preview */}
              <div className="space-y-1">
                <p className="mb-1.5 text-xs font-medium text-slate-600">Mögliche Unterthemen</p>
                {themen.map((t) => {
                  const count = result?.themen[t];
                  return (
                    <div key={t} className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{t}</span>
                      {count !== undefined && (
                        <span className={`text-xs tabular-nums ${meta.color}`}>{count}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
