import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Anmelden | MedLearn",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grid px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-blue-500/30">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              MedLearn
            </span>
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Willkommen zurück</h1>
            <p className="mt-1 text-sm text-slate-500">
              Melde dich an, um weiter zu lernen
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/7 bg-white/[0.03] p-6 shadow-2xl">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          MSB Berlin · MSH Hamburg · HMU Potsdam
        </p>
      </div>
    </div>
  );
}
