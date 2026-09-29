-- Khuluma core schema
-- Run via: supabase db push  (or paste into Supabase SQL editor)

-- Verified resource directory (GBV Command Centre, Masimanyane, FAMSA, UFH GBVPGD, etc.)
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  category text not null,               -- e.g. 'Crisis', 'NGO', 'Health', 'Academic'
  name text not null,
  phone text,
  email text,
  address text,
  notes text,
  verified boolean default false,
  verified_at timestamptz,
  created_at timestamptz default now()
);

-- Anonymous-by-default SOS activation events (no PII required to trigger)
create table if not exists public.sos_events (
  id uuid primary key default gen_random_uuid(),
  device_session text not null,         -- rotating client-side token, not tied to identity
  triggered_at timestamptz default now(),
  location_shared boolean default false,
  latitude double precision,
  longitude double precision,
  escalated_to text,                    -- e.g. 'GBVCC', 'manual_protocol'
  escalation_status text default 'pending', -- pending | escalated | resolved
  notes text
);

-- Optional user profiles — only created if a survivor chooses to register
-- (Khuluma should always allow anonymous use without this table being populated)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

-- CounselEase: licensed practitioners (revenue-side, not survivor-facing)
create table if not exists public.counselors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  qualification text,
  languages text[],                     -- e.g. {'English','isiXhosa'}
  active boolean default true,
  platform_fee_status text default 'unpaid', -- unpaid | current | overdue
  created_at timestamptz default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  counselor_id uuid references public.counselors(id),
  scheduled_at timestamptz,
  status text default 'booked',         -- booked | completed | cancelled
  created_at timestamptz default now()
);

-- Row Level Security — lock down by default, open only what's needed
alter table public.resources enable row level security;
alter table public.sos_events enable row level security;
alter table public.profiles enable row level security;
alter table public.counselors enable row level security;
alter table public.sessions enable row level security;

-- Public read access to verified resources only (this is public safety info)
create policy "public read verified resources"
  on public.resources for select
  using (verified = true);

-- SOS events: insert-only from the app, no public read (protects survivor data)
create policy "anyone can trigger sos"
  on public.sos_events for insert
  with check (true);

-- Profiles: users can only see/edit their own row
create policy "users manage own profile"
  on public.profiles for all
  using (auth.uid() = id);
