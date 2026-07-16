# Connecting the interest registry to Supabase

The `/register` form saves each submission to Supabase via a server action
(`src/app/register/actions.ts`). It talks to Supabase's REST endpoint server-side
with the **service role key**, so the key never reaches the browser. Two steps:

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

-- Lock the table down: with RLS on and no public policies, only the service
-- role (used by our server action) can read or write it.
alter table public.registrations enable row level security;
```

## 2. Add the credentials

Find these in the dashboard → **Project Settings → API**:

- **Project URL** → `SUPABASE_URL`
- **`service_role` secret** (under Project API keys) → `SUPABASE_SERVICE_ROLE_KEY`

Create a `.env.local` file in the project root (it is git-ignored — never commit it):

```bash
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

Restart the dev server so it picks up the new env vars. Submitting the form should
now insert a row into `registrations` and show the "Interest registered" screen.

> The `service_role` key bypasses row-level security and can read/write the whole
> project — keep it server-side only (never prefix it with `NEXT_PUBLIC_`).
