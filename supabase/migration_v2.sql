-- Run this in the Supabase SQL editor to add status + source tracking
-- Safe to run multiple times (idempotent)

alter table questions
  add column if not exists status text not null default 'active'
    check (status in ('active', 'inactive'));

alter table questions
  add column if not exists source_id text;

-- Unique index for source_id (allows multiple NULLs)
create unique index if not exists questions_source_id_uidx
  on questions (source_id)
  where source_id is not null;

-- Indexes for fast filtering
create index if not exists questions_fach_idx    on questions (fach);
create index if not exists questions_thema_idx   on questions (thema);
create index if not exists questions_status_idx  on questions (status);
create index if not exists questions_source_idx  on questions (source);
