-- Formularios nativos: contacto y partners (DOMAKEA)
-- Aplicar en Supabase SQL editor o con `supabase db push` cuando el proyecto CLI esté vinculado.

create extension if not exists pgcrypto;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  job_role text not null,
  job_role_other text,
  company_name text not null,
  email text not null,
  phone text not null,
  economic_sector text,
  sector_other text,
  service_interest text,
  start_when text,
  attribution text not null,
  attribution_other text,
  message text,
  privacy_accepted_at timestamptz not null,
  user_agent text,
  source_path text
);

create table if not exists public.partner_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  job_role text not null,
  job_role_other text,
  email text not null,
  phone text,
  company_name text not null,
  website text not null,
  economic_sector text,
  sector_other text,
  company_focus text,
  partnership_pitch text not null,
  attribution text not null,
  attribution_other text,
  privacy_accepted_at timestamptz not null,
  user_agent text,
  source_path text
);

alter table public.contact_leads enable row level security;
alter table public.partner_leads enable row level security;

-- Solo inserción anónima desde el sitio (sin lectura pública).
drop policy if exists "anon_insert_contact_leads" on public.contact_leads;
create policy "anon_insert_contact_leads"
  on public.contact_leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anon_insert_partner_leads" on public.partner_leads;
create policy "anon_insert_partner_leads"
  on public.partner_leads
  for insert
  to anon, authenticated
  with check (true);

create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
create index if not exists partner_leads_created_at_idx on public.partner_leads (created_at desc);