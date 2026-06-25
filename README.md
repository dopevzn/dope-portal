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

Milestone 1 establishes the public landing page and design system foundation:

- Next.js App Router starter cleanup
- Premium dark DOPE Portal landing page
- shadcn-compatible UI primitives
- RecruitLook dashboard preview with seeded product data
- Tailwind v4 design tokens in `app/globals.css`

No environment variables are required for Milestone 1. Clerk, Supabase, R2,
Stripe, Resend, and OpenAI variables will be added as those integrations land.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Project Shape

- `app/` - Next.js App Router routes and global CSS
- `components/ui/` - shadcn-style primitives owned by the app
- `components/landing/` - public landing page sections
- `lib/` - reusable utilities and seeded UI data

## Product Direction

This is a real SaaS build. Do not introduce Google Drive, Airtable, Softr,
Dropbox, or no-code shortcuts into the production architecture.
