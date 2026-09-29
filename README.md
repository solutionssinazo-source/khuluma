# Khuluma — Self-Hosted Scaffold

This is a starting skeleton, not a finished replica of your Base44 app. It gives you a
working SOS button, a verified-resources page, and a database schema — deployed on
infrastructure you own, at near-zero cost, instead of Base44's credit system.

## What's here
- `supabase/migrations/0001_init.sql` — the database schema (resources, SOS events, profiles,
  counselors, sessions), with row-level security locked down by default.
- `app/page.tsx` — home screen with the SOS button.
- `app/resources/page.tsx` — verified resource directory, pulled live from Supabase.
- `components/SosButton.tsx` — the core safety feature. Currently logs an SOS event to your
  database with a rotating anonymous session token (no identity required to trigger it).
- `app/protection-order/page.tsx` — a guided assist flow for DVA Form 2/6. **It does not file
  anything with a court.** It collects the information a survivor needs, then produces a
  print/save-ready summary to take to her nearest Magistrate's Court. It also flags the Form 7
  route (a CounselEase counsellor applying on her behalf, with consent) as an option. All data
  stays client-side in this scaffold — nothing is written to the database from this page.

## What this does NOT yet do
- It does not call the GBV Command Centre directly — that requires the interoperability
  agreement in your partnership proposal letter first. Right now it just logs the event.
- It has no real content-moderation, encryption-at-rest review, or security audit. Do not
  point real survivors at this until that review has happened.
- It is not a pixel-for-pixel copy of your Base44 app's screens — it's the same core logic,
  rebuilt.

## Deploying it (roughly 1–2 hours of setup, not overnight)

1. **Create a Supabase project** at supabase.com (free tier is enough to start).
2. In the SQL editor, paste and run `supabase/migrations/0001_init.sql`.
3. Copy your Project URL and anon public key from Project Settings → API.
4. **Push this folder to a GitHub repo.**
5. In Vercel, import that repo. Add two environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy. Vercel gives you a live URL immediately; add your own domain afterward if you want.
7. Install Tailwind (`npx tailwindcss init -p`) if the styling doesn't apply out of the box —
   this scaffold assumes Tailwind is configured.

## Ongoing cost
Supabase free tier + Vercel free tier covers early-stage traffic at **R0/month**. You'll only
start paying (roughly R400–1,000/month combined) once usage grows past the free tier limits —
still well below most no-code platform subscription/credit costs at scale.

## Next real steps, in order
1. Migrate your actual resource-directory data (from `Khuluma_Partner_Funder_Database.xlsx`)
   into the `resources` table.
2. Get a security-minded developer or your mentor Collin to review the SOS flow before any
   real user touches it.
3. Only then start porting additional screens from the Base44 version.
