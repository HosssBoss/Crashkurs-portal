"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthState } from "@/app/actions/auth";

export default function RegisterForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    signup,
    undefined
  );

  if (state?.message) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-green-500/25 bg-green-500/10 px-5 py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/15">
            <svg
              className="h-6 w-6 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-green-300">
              Bestätigungs-E-Mail gesendet!
            </p>
            <p className="mt-1 text-xs leading-relaxed text-green-400/70">
              {state.message}
            </p>
          </div>
        </div>
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-xl border border-white/8 px-4 py-2.5 text-sm text-slate-400 transition-colors hover:border-white/15 hover:text-white"
        >
          Zur Anmeldung
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {/* Error message */}
      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm text-red-300">{state.error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-medium text-slate-400"
        >
          E-Mail-Adresse
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@beispiel.de"
          className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/6"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs font-medium text-slate-400"
        >
          Passwort
          <span className="ml-1.5 text-slate-600">(mind. 6 Zeichen)</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/6"
        />
      </div>

      {/* Confirm password */}
      <div>
        <label
          htmlFor="confirm"
          className="mb-1.5 block text-xs font-medium text-slate-400"
        >
          Passwort bestätigen
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/6"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Registrieren…
          </span>
        ) : (
          "Konto erstellen"
        )}
      </button>

      {/* Terms note */}
      <p className="text-center text-xs leading-relaxed text-slate-600">
        Mit der Registrierung stimmst du der Nutzung des Lernportals zu.
      </p>

      {/* Footer link */}
      <p className="text-center text-xs text-slate-500">
        Bereits registriert?{" "}
        <Link
          href="/login"
          className="text-blue-400 transition-colors hover:text-blue-300"
        >
          Jetzt anmelden
        </Link>
      </p>
    </form>
  );
}
