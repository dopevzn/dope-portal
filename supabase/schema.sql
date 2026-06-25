-- DOPE Portal Supabase schema
-- Production foundation for the RecruitLook Hoops tenant and future tenants.
-- Apply before supabase/rls.sql and supabase/seed.sql.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'organization_role') then
    create type public.organization_role as enum (
      'owner',
      'media_director',
      'admin',
      'photographer',
      'videographer',
      'editor',
      'scout',
      'coach',
      'sponsor',
      'viewer'
    );
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Keeps updated_at current for mutable DOPE Portal records.';

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tenant_type text not null default 'sports_organization',
  logo_url text,
  brand_color text,
  status text not null default 'active'
    check (status in ('active', 'inactive', 'archived')),
  timezone text not null default 'America/Chicago',
  storage_limit_gb integer not null default 3072
    check (storage_limit_gb > 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.organizations is
  'Top-level tenant records for RecruitLook Hoops and future DOPE Portal organizations.';

create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text not null,
  full_name text not null,
  avatar_url text,
  phone text,
  title text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.user_profiles is
  'Application profile records keyed to Clerk users. Tenant membership lives in organization_members.';

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_profile_id uuid references public.user_profiles(id) on delete set null,
  clerk_user_id text not null,
  role public.organization_role not null,
  status text not null default 'active'
    check (status in ('invited', 'active', 'suspended', 'removed')),
  invited_at timestamptz,
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, clerk_user_id)
);

comment on table public.organization_members is
  'Role-based tenant membership for Clerk users across DOPE Portal organizations.';

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  city text not null,
  state text not null,
  address text,
  timezone text not null default 'America/Chicago',
  court_count integer not null default 1 check (court_count > 0),
  contact_name text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.venues is
  'Event venue records with court capacity and market context.';

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  name text not null,
  event_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'planning'
    check (status in ('intake', 'planning', 'creator booking', 'locked', 'live', 'completed', 'archived')),
  visibility text not null default 'internal'
    check (visibility in ('internal', 'client', 'public')),
  courts text[] not null default '{}',
  age_groups text[] not null default '{}',
  media_priority text not null default 'medium'
    check (media_priority in ('low', 'medium', 'high')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at >= starts_at)
);

comment on table public.events is
  'RecruitLook events, tournaments, showcases, camps, and circuits needing media coverage.';

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  city text not null,
  state text not null,
  classification text,
  conference text,
  website text,
  logo_url text,
  primary_contact text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name, state)
);

comment on table public.schools is
  'School and program records attached to athletes, teams, galleries, and requests.';

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  name text not null,
  level text not null,
  season text not null,
  coach_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.teams is
  'School or club team records used to group athletes and media packages.';

create table if not exists public.athletes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  first_name text not null,
  last_name text not null,
  graduation_year integer not null check (graduation_year between 2020 and 2045),
  position text not null,
  height text,
  jersey_number text,
  recruiting_status text not null default 'evaluation'
    check (recruiting_status in ('evaluation', 'watchlist', 'offered', 'committed')),
  hometown text,
  instagram_handle text,
  profile_status text not null default 'active'
    check (profile_status in ('active', 'needs media', 'archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.athletes is
  'Athlete profile records used for media routing, recruiting context, and requests.';

create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_profile_id uuid references public.user_profiles(id) on delete set null,
  display_name text not null,
  role text not null check (role in ('photographer', 'videographer', 'editor')),
  email text not null,
  phone text,
  home_market text not null,
  rate_type text not null default 'day'
    check (rate_type in ('day', 'event', 'hour', 'retainer')),
  day_rate numeric(10,2),
  status text not null default 'active'
    check (status in ('active', 'confirmed', 'pending', 'hold', 'inactive')),
  specialties text[] not null default '{}',
  equipment jsonb not null default '{}'::jsonb,
  rating numeric(3,2) check (rating is null or (rating >= 0 and rating <= 5)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.creators is
  'Photographers, videographers, and editors available for tenant assignments.';

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  creator_id uuid references public.creators(id) on delete set null,
  title text not null,
  assignment_type text not null check (assignment_type in ('photo', 'video', 'edit', 'operations')),
  court text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'confirmed', 'queued', 'live', 'needs review', 'completed', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high')),
  shot_list jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at >= starts_at)
);

comment on table public.assignments is
  'Creator work orders for event coverage and edit delivery.';

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  category text not null,
  contact_name text,
  contact_email text,
  tier text not null default 'community'
    check (tier in ('premier', 'gold', 'silver', 'community')),
  contract_status text not null default 'active'
    check (contract_status in ('active', 'renewal', 'paused', 'expired')),
  start_date date,
  end_date date,
  deliverables_due integer not null default 0 check (deliverables_due >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

comment on table public.sponsors is
  'Sponsor and partner records connected to assets and deliverables.';

create table if not exists public.media_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  assignment_id uuid references public.assignments(id) on delete set null,
  creator_id uuid references public.creators(id) on delete set null,
  athlete_id uuid references public.athletes(id) on delete set null,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  file_name text not null,
  file_type text not null check (file_type in ('photo', 'video', 'audio', 'document')),
  mime_type text not null,
  storage_key text not null,
  storage_provider text not null default 'r2_pending',
  size_bytes bigint not null default 0 check (size_bytes >= 0),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  captured_at timestamptz,
  uploaded_at timestamptz not null default now(),
  processing_status text not null default 'ready'
    check (processing_status in ('queued', 'processing', 'ready', 'needs tags', 'failed', 'archived')),
  visibility text not null default 'internal'
    check (visibility in ('internal', 'client library', 'public')),
  tags text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, storage_key)
);

comment on table public.media_files is
  'Media metadata records. Binary file storage will be connected through Cloudflare R2 later.';

create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  athlete_id uuid references public.athletes(id) on delete set null,
  school_id uuid references public.schools(id) on delete set null,
  title text not null,
  deliverable_type text not null,
  due_at timestamptz not null,
  status text not null default 'planned'
    check (status in ('planned', 'queued', 'editing', 'in review', 'needs approval', 'delivered', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high')),
  asset_count integer not null default 0 check (asset_count >= 0),
  owner_name text,
  delivery_channel text not null default 'portal'
    check (delivery_channel in ('portal', 'email', 'download', 'social')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.deliverables is
  'Media delivery packages for events, athletes, schools, teams, and sponsors.';

create table if not exists public.media_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  requester_name text not null,
  requester_email text not null,
  requester_type text not null
    check (requester_type in ('parent', 'coach', 'sponsor', 'scout', 'staff', 'media director')),
  event_id uuid references public.events(id) on delete set null,
  athlete_id uuid references public.athletes(id) on delete set null,
  school_id uuid references public.schools(id) on delete set null,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  title text not null,
  description text not null,
  request_type text not null,
  status text not null default 'open'
    check (status in ('open', 'in progress', 'waiting on tags', 'fulfilled', 'closed', 'rejected')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high')),
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.media_requests is
  'Inbound media requests from stakeholders routed through the RecruitLook workspace.';

create table if not exists public.sponsor_assets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sponsor_id uuid not null references public.sponsors(id) on delete cascade,
  name text not null,
  asset_type text not null check (asset_type in ('logo', 'brand guide', 'ad read', 'signage', 'offer')),
  file_url text,
  usage_rights text not null default 'event coverage',
  expires_at timestamptz,
  status text not null default 'active'
    check (status in ('active', 'needs review', 'expired', 'archived')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.sponsor_assets is
  'Sponsor-provided brand assets and usage rights for event media deliverables.';

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_profile_id uuid references public.user_profiles(id) on delete set null,
  title text not null,
  body text not null,
  notification_type text not null,
  severity text not null default 'info'
    check (severity in ('info', 'warning', 'high')),
  read_at timestamptz,
  action_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.notifications is
  'Tenant-scoped operational notifications for media, assignment, request, storage, and delivery activity.';

create table if not exists public.storage_usage (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  storage_provider text not null default 'r2_pending',
  total_bytes bigint not null default 0 check (total_bytes >= 0),
  used_bytes bigint not null default 0 check (used_bytes >= 0),
  media_count integer not null default 0 check (media_count >= 0),
  calculated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, storage_provider)
);

comment on table public.storage_usage is
  'Tenant-level storage accounting snapshots for the media operating system.';

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_profile_id uuid references public.user_profiles(id) on delete set null,
  actor_clerk_user_id text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  ip_address inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.audit_logs is
  'Append-friendly operational audit trail for tenant-scoped user and system actions.';

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'organizations',
    'user_profiles',
    'organization_members',
    'venues',
    'events',
    'schools',
    'teams',
    'athletes',
    'creators',
    'assignments',
    'media_files',
    'deliverables',
    'media_requests',
    'sponsors',
    'sponsor_assets',
    'notifications',
    'storage_usage',
    'audit_logs'
  ]
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );
  end loop;
end $$;

-- Tenant isolation and join indexes.
create index if not exists organization_members_organization_id_idx on public.organization_members (organization_id);
create index if not exists organization_members_user_profile_id_idx on public.organization_members (user_profile_id);
create index if not exists organization_members_clerk_user_id_idx on public.organization_members (clerk_user_id);
create index if not exists organization_members_role_idx on public.organization_members (organization_id, role);

create index if not exists venues_organization_id_idx on public.venues (organization_id);
create index if not exists events_organization_id_idx on public.events (organization_id);
create index if not exists events_venue_id_idx on public.events (venue_id);
create index if not exists events_status_starts_at_idx on public.events (organization_id, status, starts_at);
create index if not exists events_priority_idx on public.events (organization_id, media_priority);

create index if not exists schools_organization_id_idx on public.schools (organization_id);
create index if not exists teams_organization_id_idx on public.teams (organization_id);
create index if not exists teams_school_id_idx on public.teams (school_id);

create index if not exists athletes_organization_id_idx on public.athletes (organization_id);
create index if not exists athletes_school_id_idx on public.athletes (school_id);
create index if not exists athletes_team_id_idx on public.athletes (team_id);
create index if not exists athletes_class_status_idx on public.athletes (organization_id, graduation_year, profile_status);

create index if not exists creators_organization_id_idx on public.creators (organization_id);
create index if not exists creators_user_profile_id_idx on public.creators (user_profile_id);
create index if not exists creators_status_role_idx on public.creators (organization_id, status, role);
create index if not exists creators_equipment_gin_idx on public.creators using gin (equipment);

create index if not exists assignments_organization_id_idx on public.assignments (organization_id);
create index if not exists assignments_event_id_idx on public.assignments (event_id);
create index if not exists assignments_creator_id_idx on public.assignments (creator_id);
create index if not exists assignments_status_starts_at_idx on public.assignments (organization_id, status, starts_at);
create index if not exists assignments_shot_list_gin_idx on public.assignments using gin (shot_list);

create index if not exists sponsors_organization_id_idx on public.sponsors (organization_id);
create index if not exists sponsors_status_tier_idx on public.sponsors (organization_id, contract_status, tier);

create index if not exists media_files_organization_id_idx on public.media_files (organization_id);
create index if not exists media_files_event_id_idx on public.media_files (event_id);
create index if not exists media_files_assignment_id_idx on public.media_files (assignment_id);
create index if not exists media_files_creator_id_idx on public.media_files (creator_id);
create index if not exists media_files_athlete_id_idx on public.media_files (athlete_id);
create index if not exists media_files_sponsor_id_idx on public.media_files (sponsor_id);
create index if not exists media_files_status_uploaded_idx on public.media_files (organization_id, processing_status, uploaded_at desc);
create index if not exists media_files_tags_gin_idx on public.media_files using gin (tags);
create index if not exists media_files_metadata_gin_idx on public.media_files using gin (metadata);

create index if not exists deliverables_organization_id_idx on public.deliverables (organization_id);
create index if not exists deliverables_event_id_idx on public.deliverables (event_id);
create index if not exists deliverables_sponsor_id_idx on public.deliverables (sponsor_id);
create index if not exists deliverables_athlete_id_idx on public.deliverables (athlete_id);
create index if not exists deliverables_school_id_idx on public.deliverables (school_id);
create index if not exists deliverables_status_due_idx on public.deliverables (organization_id, status, due_at);

create index if not exists media_requests_organization_id_idx on public.media_requests (organization_id);
create index if not exists media_requests_event_id_idx on public.media_requests (event_id);
create index if not exists media_requests_athlete_id_idx on public.media_requests (athlete_id);
create index if not exists media_requests_school_id_idx on public.media_requests (school_id);
create index if not exists media_requests_sponsor_id_idx on public.media_requests (sponsor_id);
create index if not exists media_requests_status_due_idx on public.media_requests (organization_id, status, due_at);

create index if not exists sponsor_assets_organization_id_idx on public.sponsor_assets (organization_id);
create index if not exists sponsor_assets_sponsor_id_idx on public.sponsor_assets (sponsor_id);
create index if not exists sponsor_assets_metadata_gin_idx on public.sponsor_assets using gin (metadata);

create index if not exists notifications_organization_id_idx on public.notifications (organization_id);
create index if not exists notifications_user_profile_id_idx on public.notifications (user_profile_id);
create index if not exists notifications_unread_idx on public.notifications (organization_id, read_at, created_at desc);
create index if not exists notifications_metadata_gin_idx on public.notifications using gin (metadata);

create index if not exists storage_usage_organization_id_idx on public.storage_usage (organization_id);
create index if not exists audit_logs_organization_id_idx on public.audit_logs (organization_id);
create index if not exists audit_logs_actor_user_profile_id_idx on public.audit_logs (actor_user_profile_id);
create index if not exists audit_logs_entity_idx on public.audit_logs (organization_id, entity_type, entity_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs (organization_id, created_at desc);
