# DOPE Portal Supabase Foundation

This folder contains the production database foundation for DOPE Portal, starting with the RecruitLook Hoops tenant.

## Files

- `schema.sql` creates extensions, role enum, tables, timestamps, update triggers, comments, constraints, foreign keys, and indexes.
- `rls.sql` enables and forces Row Level Security, adds Clerk-aware membership helpers, and creates tenant isolation policies.
- `seed.sql` inserts structured RecruitLook Hoops operational seed data.

## Apply Order

Run these files in the Supabase SQL editor or through a migration pipeline using a privileged database role:

```sql
\i supabase/schema.sql
\i supabase/rls.sql
\i supabase/seed.sql
```

Supabase SQL editor users can paste/run each file in the same order.

## Environment Variables

Local Next.js uses these values from `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not commit `.env.local`. The service-role key is server-only and must never be used in Client Components.

## Tenant Model

`organizations` is the tenant root. Tenant-owned tables carry:

```sql
organization_id uuid references public.organizations(id) on delete cascade
```

`organization_members` maps Clerk users into organizations and roles:

- `owner`
- `media_director`
- `admin`
- `photographer`
- `videographer`
- `editor`
- `scout`
- `coach`
- `sponsor`
- `viewer`

## RLS Model

RLS is enabled and forced on every table. Policies are scoped to the authenticated role and use:

- `current_clerk_user_id()`
- `is_org_member(organization_id)`
- `is_org_admin(organization_id)`
- `can_read_user_profile(clerk_user_id)`

There are no anonymous public table policies. Tenant rows are readable and writable only by active organization members. Deletes and membership edits are restricted to owner, media director, and admin roles.

The RLS helper expects Supabase requests to receive a JWT where the `sub` claim is the Clerk user id. The current UI still reads local RecruitLook data; live reads should be connected after Clerk/Supabase JWT integration is configured.

## Seed Contents

`seed.sql` creates:

- RecruitLook Hoops organization
- 5 venues
- 5 events
- 10 schools
- 3 teams
- 20 athletes
- 8 creators
- 12 assignments
- 6 sponsors
- 25 media file metadata records
- 10 deliverables
- 8 media requests
- 4 sponsor assets
- 6 notifications
- 1 storage usage snapshot
- 2 audit log records

The media rows are metadata only. Cloudflare R2 binary storage is intentionally not integrated in this foundation step.
