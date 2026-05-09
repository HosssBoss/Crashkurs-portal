-- Quiz results table
-- Run this in the Supabase SQL Editor or via supabase db push

CREATE TABLE IF NOT EXISTS quiz_results (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  standort    TEXT        NOT NULL,   -- 'msb' | 'msh' | 'hmu'
  fach        TEXT        NOT NULL,   -- 'biochemie' | 'chemie' | 'physik' | 'biologie'
  thema       TEXT        NOT NULL,   -- topic id, e.g. 'aminosaeuren'
  score       INTEGER     NOT NULL,   -- correct answers
  total       INTEGER     NOT NULL,   -- total questions
  percentage  INTEGER     NOT NULL,   -- 0-100
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own results"
  ON quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own results"
  ON quiz_results FOR SELECT
  USING (auth.uid() = user_id);

-- Index for fast user history lookups
CREATE INDEX IF NOT EXISTS quiz_results_user_id_idx ON quiz_results (user_id);
CREATE INDEX IF NOT EXISTS quiz_results_fach_idx    ON quiz_results (user_id, fach);
