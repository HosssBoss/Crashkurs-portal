-- Run in Supabase SQL Editor
-- Adds quiz_sessions table for session tracking, progress and leaderboard

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name        text        NOT NULL,          -- anonymized: "hos***"
  standort            text        NOT NULL,          -- msb | msh | hmu
  fach                text        NOT NULL,          -- chemie | physik | biochemie | physiologie
  thema               text,                          -- topic id (NULL for exam sessions)
  session_type        text        NOT NULL           -- uebung | pruefung
    CHECK (session_type IN ('uebung', 'pruefung')),
  score               int         NOT NULL,
  total               int         NOT NULL,
  percentage          int         NOT NULL,
  time_used_seconds   int,                           -- seconds elapsed (exam mode only)
  question_results    jsonb       DEFAULT '[]',      -- [{question,options,selectedIndex,correctIndex,correct,topicName}]
  created_at          timestamptz DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read (needed for leaderboard)
CREATE POLICY "sessions_read_authenticated" ON quiz_sessions
  FOR SELECT TO authenticated USING (true);

-- Users can only insert their own sessions
CREATE POLICY "sessions_insert_own" ON quiz_sessions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS quiz_sessions_user_fach_idx ON quiz_sessions (user_id, fach);
CREATE INDEX IF NOT EXISTS quiz_sessions_standort_fach_idx ON quiz_sessions (standort, fach);
CREATE INDEX IF NOT EXISTS quiz_sessions_created_idx ON quiz_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS quiz_sessions_type_idx ON quiz_sessions (session_type);
