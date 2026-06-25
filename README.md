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

## Current Milestone

Milestone 2 adds Clerk authentication and the protected RecruitLook app shell:

- Clerk provider and route middleware
- Public sign-in and sign-up routes
- Protected `/app` route group
- RecruitLook command-center shell with sidebar, top bar, and user menu
- Mock dashboard metrics for the first authenticated workspace

Supabase, R2, Stripe, Resend, and OpenAI are intentionally not connected yet.

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
- `components/app/` - protected app shell and RecruitLook dashboard preview
- `lib/` - reusable utilities and seeded UI data

## Product Direction

This is a real SaaS build. Do not introduce Google Drive, Airtable, Softr,
Dropbox, or no-code shortcuts into the production architecture.
