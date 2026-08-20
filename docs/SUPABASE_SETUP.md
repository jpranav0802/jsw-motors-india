# Connecting the interest registry to Supabase

The `/register` form saves each submission to Supabase via a server action
(`src/app/register/actions.ts`). It talks to Supabase's REST endpoint with the
**anon (public) key**; a row-level-security policy lets that key insert
registrations but not read them back. Two steps:

## 1. Create the table

In the Supabase dashboard → **SQL Editor**, run:

```sql
create table if not exists public.registrations (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text not null,
  phone      text not null,
  city       text,
  model      text not null
);

alter table public.registrations enable row level security;

-- Let anyone submit a registration, but nobody read them back through the API.
-- Reads stay available in the Supabase dashboard / with the service_role key.
create policy "public can register interest"
  on public.registrations
  for insert
  to anon
  with check (true);
```

## 2. Add the credentials

Find these in the dashboard → **Project Settings → API**:

- **Project URL** → `SUPABASE_URL`
- **`anon` `public` key** (under Project API keys) → `SUPABASE_ANON_KEY`

Create a `.env.local` file in the project root (it is git-ignored — never commit it):

```bash
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

Restart the dev server so it picks up the new env vars. Submitting the form should
now insert a row into `registrations` and show the "Interest registered" screen.

> The `anon` key is meant to be public; RLS is what keeps the data safe. Never put
> the `service_role` key in this app — it bypasses RLS and can read/write everything.
