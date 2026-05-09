"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState =
  | { error: string; message?: never }
  | { message: string; error?: never }
  | undefined;

function translateError(msg: string): string {
  if (msg.includes("Invalid login credentials"))
    return "Ungültige E-Mail-Adresse oder Passwort.";
  if (msg.includes("Email not confirmed"))
    return "Bitte bestätige zuerst deine E-Mail-Adresse.";
  if (msg.includes("User already registered"))
    return "Diese E-Mail-Adresse ist bereits registriert.";
  if (msg.includes("Password should be") || msg.includes("password"))
    return "Das Passwort muss mindestens 6 Zeichen lang sein.";
  if (msg.includes("rate limit") || msg.includes("too many"))
    return "Zu viele Versuche. Bitte warte kurz und versuche es erneut.";
  if (msg.includes("fetch failed") || msg.includes("network") || msg.includes("UNABLE_TO_VERIFY"))
    return "Verbindungsfehler. Bitte Internetverbindung prüfen und erneut versuchen.";
  if (msg.includes("signup_disabled") || msg.includes("Signups not allowed"))
    return "Registrierungen sind aktuell deaktiviert. Bitte wende dich an den Administrator.";
  console.error("[auth] Unhandled Supabase error:", msg);
  return "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
}

export async function login(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Bitte E-Mail und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: translateError(error.message) };
  }

  redirect("/");
}

export async function signup(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!email || !password) {
    return { error: "Bitte alle Felder ausfüllen." };
  }
  if (password !== confirm) {
    return { error: "Die Passwörter stimmen nicht überein." };
  }
  if (password.length < 6) {
    return { error: "Das Passwort muss mindestens 6 Zeichen lang sein." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: translateError(error.message) };
  }

  // If email confirmation is required, identities will be empty
  if (data.user && data.user.identities?.length === 0) {
    return { error: "Diese E-Mail-Adresse ist bereits registriert." };
  }

  if (data.session) {
    // Email confirmation disabled → directly logged in
    redirect("/");
  }

  return {
    message:
      "Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse. Schau auch im Spam-Ordner nach.",
  };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
