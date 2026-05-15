-- mypulse.city dev portal — API keys schema
-- Run against the nag-platform Supabase project (or any project using auth.users).

create extension if not exists "pgcrypto";

create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  key_type text check (key_type in ('live', 'test')) not null,
  key_prefix text not null,
  key_hash text not null,
  created_at timestamptz default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create index if not exists api_keys_user_id_idx on api_keys (user_id);
create index if not exists api_keys_key_hash_idx on api_keys (key_hash);

-- Row Level Security: users may only see/insert/revoke their own keys.
alter table api_keys enable row level security;

-- SELECT: a user can read their own keys.
drop policy if exists "api_keys_select_own" on api_keys;
create policy "api_keys_select_own"
  on api_keys
  for select
  to authenticated
  using (auth.uid() = user_id);

-- INSERT: a user can create keys for themselves only.
drop policy if exists "api_keys_insert_own" on api_keys;
create policy "api_keys_insert_own"
  on api_keys
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- UPDATE (revoke): a user can update their own keys. The api-keys lib only
-- ever sets revoked_at, but we keep this policy scoped to the row owner.
drop policy if exists "api_keys_update_own" on api_keys;
create policy "api_keys_update_own"
  on api_keys
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- No DELETE policy — revocation is logical (set revoked_at), not destructive.
-- The service role bypasses RLS and is used by verifyApiKey() to look keys up
-- across all users by hash.
