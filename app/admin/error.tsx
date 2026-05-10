"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin] Error:", error);
  }, [error]);

  const isAuthError =
    error.message?.includes("Invalid API key") ||
    error.message?.includes("auth");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/10">
        <svg className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>

      <h1 className="text-xl font-bold text-white">Fehler im Admin-Bereich</h1>

      {isAuthError ? (
        <div className="mt-3 space-y-1.5">
          <p className="text-sm text-slate-400">
            Supabase-Verbindung fehlgeschlagen: <code className="text-red-400 font-mono text-xs">Invalid API key</code>
          </p>
          <p className="text-xs text-slate-500">
            Mögliche Ursachen: falscher Anon-Key in <code className="font-mono">.env.local</code> oder Supabase-Projekt pausiert.
          </p>
          <p className="text-xs text-slate-600">
            Lösung: Supabase Dashboard → Settings → API → Anon Key kopieren und in <code className="font-mono">.env.local</code> einfügen.
          </p>
        </div>
      ) : (
        <p className="mt-2 max-w-sm text-sm text-slate-400">
          {error.message || "Ein unbekannter Fehler ist aufgetreten."}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/8 px-4 py-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          Zur App
        </Link>
      </div>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-slate-700">digest: {error.digest}</p>
      )}
    </div>
  );
}
