import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export async function NavAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/login"
          className="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:text-white"
        >
          Anmelden
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          Registrieren
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs text-slate-500 sm:block">
        {user.email}
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="rounded-lg border border-white/8 px-3 py-1.5 text-sm text-slate-400 transition-colors hover:border-white/15 hover:text-white"
        >
          Abmelden
        </button>
      </form>
    </div>
  );
}
