-- Run this in your Supabase SQL editor

create table if not exists questions (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  options jsonb not null default '[]'::jsonb,
  correct_index integer not null default 0,
  explanation text not null default '',
  fach text not null,
  thema text not null,
  source text not null default 'manual',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  created_by uuid references auth.users(id) on delete set null
);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger questions_updated_at
  before update on questions
  for each row
  execute function update_updated_at_column();

-- Row Level Security
alter table questions enable row level security;

-- Admin gets full access
create policy "admin_full_access" on questions
  for all
  to authenticated
  using ((auth.jwt() ->> 'email') = 'hosam828@outlook.de')
  with check ((auth.jwt() ->> 'email') = 'hosam828@outlook.de');

-- All authenticated users can read
create policy "authenticated_read" on questions
  for select
  to authenticated
  using (true);
