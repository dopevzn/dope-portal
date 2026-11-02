# DOPE Delivery

A standalone, client-facing delivery application for DOPE VZN. It lives in an isolated subdirectory of the `dope-portal` source repository but runs as a **separate Vercel application**, with separate configuration and domain. It does **not** expose LOCKED's internal editing interface.

## Included in v1

- Editorial public landing page (does not expose clients or files)
- Studio sign-in using the existing LOCKED Supabase Auth credentials
- Owner/admin membership validation against LOCKED `organization_members`
- Client galleries assembled from existing LOCKED `media_assets`
- 256-bit random share links stored only as SHA-256 hashes
- Optional scrypt-hashed passcodes, signed HttpOnly browser session, expiring galleries
- Gallery revocation, re-enabling, and link rotation
- Video previews, image previews, original downloads via short-lived R2 presigned URLs
- Client comments with optional playback timestamp, final approval and revision request
- Separate metadata and feedback tables with RLS enabled and no public data access
- Responsive mobile/tablet/desktop layouts

## Setup

1. Run `npm install` and `npm run dev` locally (Node 22.16+).
2. Apply the **additive** SQL in `sql/001_delivery_portal.sql` to the existing LOCKED Supabase database **after reviewing the schema**. It adds only `delivery_portal_*` tables.
3. Set the environment variables documented in `.env.example` on the **new Vercel application**, not the existing LOCKED site. Never commit secrets.
4. Use your existing Supabase Auth email and password at `/admin`. The account must be an active `owner` or `admin` in `organization_members`; optional `DELIVERY_ADMIN_EMAILS` further restricts access.
5. Select media assets that already exist in LOCKED's `media_assets`. Publish, copy the private URL immediately, and send to the client. Shared raw URLs are not retained, only their hashes.

## Required configuration

- `NEXT_PUBLIC_SUPABASE_URL`: existing LOCKED Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase Auth key for sign-in
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key; **never use in browser**
- `DELIVERY_SESSION_SECRET`: random secret 32+ chars for signed passcode sessions
- `DELIVERY_ADMIN_EMAILS`: optional comma-separated permitted studio sign-ins
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`: **server-only** credentials for the existing private R2 media bucket
- `NEXT_PUBLIC_DELIVERY_BASE_URL`: deployed public gallery origin (e.g. `https://delivery.dopevzn.com`)

## Important safeguards

- No client data is publicly listed, indexed, or searchable.
- Server API validates the gallery token and access policy for **every** metadata/media/feedback request.
- Admin reads are scoped to an active organization membership and assets are verified to belong to that organization.
- Original media remains in private R2. Only presigned URLs valid for five minutes are returned on access.
- Client links expire (1–365 days), can be revoked or rotated; optional passcode gives another access layer.
- Sharing a private link grants access. Do not send sensitive assets to the wrong recipient.
- V1 does not automatically email clients, upload/transcode new media, or sync revisions in real time from LOCKED. Those are future integration steps.
- Before enabling public gallery sharing, configure automated rate limiting for passcode and feedback endpoints (e.g. Upstash/Vercel Firewall), audit access logs, and test with non-sensitive sample media.

## Deployment

Create a separate Vercel Git project linked to `dopevzn/dope-portal` using `apps/dope-delivery` as Root Directory. Do not overwrite the existing `dope-portal` Vercel project or its environment settings. After configuring the database and environment values, test the entire create-share-view-review-download flow on a preview deployment before setting the custom domain.
