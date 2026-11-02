-- Additive client-delivery layer. Apply to the existing LOCKED Supabase project.
-- No changes to LOCKED's existing tables, accounts, or workflow.
create extension if not exists pgcrypto;
create table if not exists public.delivery_portal_galleries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  client_name text not null check (char_length(client_name) between 1 and 120),
  title text not null check (char_length(title) between 1 and 150),
  description text,
  cover_asset_id uuid references public.media_assets(id) on delete set null,
  token_hash text not null unique,
  pin_salt text,
  pin_hash text,
  published boolean not null default false,
  allow_downloads boolean not null default true,
  allow_feedback boolean not null default true,
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','revisions_requested')),
  expires_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default now(),
  constraint delivery_portal_pin_pair check ((pin_salt is null) = (pin_hash is null))
);
create table if not exists public.delivery_portal_items (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.delivery_portal_galleries(id) on delete cascade,
  asset_id uuid not null references public.media_assets(id) on delete restrict,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (gallery_id,asset_id)
);
create table if not exists public.delivery_portal_events (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.delivery_portal_galleries(id) on delete cascade,
  item_id uuid references public.delivery_portal_items(id) on delete set null,
  kind text not null check (kind in ('view','download','comment','decision')),
  actor_name text,
  message text,
  seconds integer,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists delivery_portal_galleries_org_idx on public.delivery_portal_galleries(organization_id,created_at desc);
create index if not exists delivery_portal_items_gallery_idx on public.delivery_portal_items(gallery_id,sort_order);
create index if not exists delivery_portal_events_gallery_idx on public.delivery_portal_events(gallery_id,created_at desc);
alter table public.delivery_portal_galleries enable row level security;
alter table public.delivery_portal_items enable row level security;
alter table public.delivery_portal_events enable row level security;
-- No anon/authenticated policies. All access goes through server-only, validated routes.
revoke all on public.delivery_portal_galleries from anon, authenticated;
revoke all on public.delivery_portal_items from anon, authenticated;
revoke all on public.delivery_portal_events from anon, authenticated;
