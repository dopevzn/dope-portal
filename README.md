# DOPE Portal

DOPE Portal is a production-grade multi-tenant sports media operating system.
The first tenant is RecruitLook Hoops, with architecture planned for future
organizations including schools, leagues, athletes, sponsors, and premium sports
media brands.

## Getting Started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Current Foundation

The app now includes the RecruitLook production portal foundation:

- Clerk provider, public auth routes, and protected `/app` route group
- RecruitLook command-center shell with sidebar, top bar, and user menu
- Protected module pages for events, media, uploads, creators, assignments,
  athletes, schools, sponsors, deliverables, requests, analytics, and settings
- Shared app UI primitives for stats, filters, tables, status badges, empty
  states, module cards, section headers, and page shells
- Supabase-ready schema, RLS, and RecruitLook seed data under `supabase/`
- Typed Supabase browser, server, and admin client factories under `lib/supabase/`
- Live server-side Supabase reads for RecruitLook dashboard and operating modules
- Cloudflare R2 presigned upload/download foundation for protected media files

Stripe, Resend, and OpenAI are intentionally not integrated yet.

## Clerk Setup

Create a local `.env.local` file from `.env.example` and fill in your Clerk
keys from the Clerk dashboard:

```bash
cp .env.example .env.local
```

Required variables:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app
```

Do not commit `.env.local`.

## Supabase Setup

The local app expects these Supabase variables in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key is server-only. Do not read it in Client Components and do
not commit it.

Apply the database files in this order:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/seed.sql`

See `supabase/README.md` for the tenant model, RLS approach, and seed contents.
The protected UI reads live Supabase records through server-only data access
functions scoped to the RecruitLook organization.

## Cloudflare R2 Setup

The Upload Center uses server-generated presigned URLs so the browser uploads
files directly to Cloudflare R2. R2 credentials stay server-only.

Add these values to `.env.local`:

```bash
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=
CLOUDFLARE_R2_PUBLIC_BASE_URL=
```

Manual Cloudflare setup:

1. Create a private R2 bucket for RecruitLook media.
2. Create an R2 API token with object read/write access for that bucket.
3. Add the account id, access key id, secret access key, and bucket name to `.env.local`.
4. Configure bucket CORS to allow local and production app origins to `PUT` and `GET` with `Content-Type`.
5. Optional: set `CLOUDFLARE_R2_PUBLIC_BASE_URL` only if a public/custom domain is intentionally configured.

Apply `supabase/migrations/001_media_files_r2_fields.sql` before relying on
production uploads. The app can still create a legacy media record if the
migration has not been applied, but the R2 metadata columns are the production
path.

Upload flow:

1. A signed-in user selects media and routing metadata in `/app/upload`.
2. `/api/media/presign-upload` validates the RecruitLook event and returns a short-lived R2 PUT URL.
3. The browser uploads directly to R2.
4. `/api/media/complete-upload` creates the `media_files` record in Supabase.
5. `/app/media-library` requests a short-lived download URL through `/api/media/presign-download`.

## Protected Routes

Public routes:

- `/`
- `/sign-in(.*)`
- `/sign-up(.*)`

Protected routes:

- `/app(.*)`

To test locally:

1. Run `npm run dev`.
2. Visit `/` and confirm the landing page loads without auth.
3. Visit `/sign-in` or `/sign-up` and confirm Clerk renders.
4. Visit `/app` while signed out and confirm Clerk redirects to `/sign-in`.
5. Sign in and confirm `/app` renders the RecruitLook command center.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Project Shape

- `app/` - Next.js App Router routes and global CSS
- `app/app/` - protected internal app routes
- `components/ui/` - shadcn-style primitives owned by the app
- `components/landing/` - public landing page sections
- `components/app/` - protected app shell, shared app UI, dashboard, and module renderer
- `lib/supabase/` - typed Supabase client factories
- `lib/` - reusable utilities, static app metadata, and live RecruitLook data access
- `supabase/` - schema, RLS policies, seed data, and database setup docs
- `types/database.ts` - Supabase database types used by client factories

## Product Direction

This is a real SaaS build. Do not introduce Google Drive, Airtable, Softr,
Dropbox, or no-code shortcuts into the production architecture.
# dope-portal
