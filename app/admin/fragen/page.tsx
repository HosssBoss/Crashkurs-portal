import { loadFragen } from "@/app/actions/fragen";
import FragenClient from "./FragenClient";

export const dynamic = "force-dynamic";

export default async function FragenPage() {
  const { fragen, error } = await loadFragen();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Fragenverwaltung</h1>
        <p className="mt-1 text-sm text-slate-500">
          {fragen.length} Fragen in Supabase
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Datenbankfehler: {error}
        </div>
      )}

      <FragenClient initialFragen={fragen} />
    </div>
  );
}
