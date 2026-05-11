"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type QuestionResult = {
  question: string;
  options: string[];
  selectedIndex: number | null; // null = timeout
  correctIndex: number;
  correct: boolean;
  topicName?: string;
};

export type SessionData = {
  standort: string;
  fach: string;
  thema?: string;
  sessionType: "uebung" | "pruefung";
  score: number;
  total: number;
  timeUsedSeconds?: number;
  questionResults?: QuestionResult[];
};

export type HistoryEntry = {
  id: string;
  session_type: string;
  score: number;
  total: number;
  percentage: number;
  thema: string | null;
  created_at: string;
};

export type LeaderboardEntry = {
  user_id: string;
  display_name: string;
  best_percentage: number;
  session_count: number;
  rank: number;
  is_me: boolean;
};

function makeDisplayName(email: string): string {
  const prefix = (email.split("@")[0] ?? "xxx").toLowerCase();
  return prefix.slice(0, 3).padEnd(3, "x") + "***";
}

export async function saveSession(data: SessionData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Nicht eingeloggt" };

  const percentage = data.total > 0 ? Math.round((data.score / data.total) * 100) : 0;

  const { error } = await supabase.from("quiz_sessions").insert({
    user_id: user.id,
    display_name: makeDisplayName(user.email ?? ""),
    standort: data.standort,
    fach: data.fach,
    thema: data.thema ?? null,
    session_type: data.sessionType,
    score: data.score,
    total: data.total,
    percentage,
    time_used_seconds: data.timeUsedSeconds ?? null,
    question_results: data.questionResults ?? [],
  });

  if (error) return { error: error.message };
  revalidatePath(`/${data.standort}/${data.fach}/fortschritt`);
  return {};
}

export async function getSessionHistory(
  fach: string,
  limit = 50
): Promise<HistoryEntry[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("quiz_sessions")
    .select("id, session_type, score, total, percentage, thema, created_at")
    .eq("user_id", user.id)
    .eq("fach", fach)
    .order("created_at", { ascending: true })
    .limit(limit);

  return (data ?? []) as HistoryEntry[];
}

export async function getLeaderboard(
  standort: string,
  fach: string
): Promise<{ entries: LeaderboardEntry[]; myRank: number | null; percentile: number | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all pruefung sessions for this fach+standort
  const { data: rows } = await supabase
    .from("quiz_sessions")
    .select("user_id, display_name, percentage")
    .eq("fach", fach)
    .eq("standort", standort)
    .eq("session_type", "pruefung");

  if (!rows?.length) return { entries: [], myRank: null, percentile: null };

  // Aggregate best per user
  const byUser = new Map<string, { display_name: string; best: number; count: number }>();
  for (const row of rows) {
    const existing = byUser.get(row.user_id);
    if (!existing) {
      byUser.set(row.user_id, { display_name: row.display_name, best: row.percentage, count: 1 });
    } else {
      existing.best = Math.max(existing.best, row.percentage);
      existing.count++;
    }
  }

  const sorted = [...byUser.entries()]
    .map(([uid, d]) => ({ user_id: uid, ...d }))
    .sort((a, b) => b.best - a.best);

  const entries: LeaderboardEntry[] = sorted.map((e, i) => ({
    user_id: e.user_id,
    display_name: e.display_name,
    best_percentage: e.best,
    session_count: e.count,
    rank: i + 1,
    is_me: e.user_id === user?.id,
  }));

  const myIdx = entries.findIndex(e => e.is_me);
  const myRank = myIdx >= 0 ? entries[myIdx].rank : null;
  const percentile =
    myRank !== null && entries.length > 1
      ? Math.round(((entries.length - myRank) / (entries.length - 1)) * 100)
      : null;

  return { entries: entries.slice(0, 50), myRank, percentile };
}
