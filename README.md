# mypulse.city

Marketing + developer portal for **Pulse** — the real-time ambient-presence SDK for the location-aware web.

> Presence, from the horizon.

This is the Next.js 14 (App Router) site that ships under `mypulse.city`. The showcase game (Jetpack Inferno → Pulse) is a separate project; this site links to it at `/play`.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (dark-mode default)
- Three.js (hero pulse-beam animation)
- `@supabase/supabase-js` (auth/data — wired in Stream 3B)

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Routes

| Route | Page |
|---|---|
| `/` | Landing — animated Three.js pulse-beams hero |
| `/dev` | Dev portal landing — "Build with Pulse" + quick start |
| `/dev/dashboard` | Placeholder dashboard ("Sign in to access") — Stream 3B wires auth + API keys |
| `/docs` | Quick-start SDK docs with code blocks |
| `/pricing` | Four pricing tiers (Free / Indie $19 / Growth $0.05 MAU / Scale $0.02 MAU) + Enterprise |
| `/play` | Server-side redirect to the showcase game |

## Project layout

```
mypulse-city-site/
  app/
    layout.tsx         # Root layout, Inter font, Pulse meta
    page.tsx           # Landing
    globals.css        # Tailwind + Pulse palette
    dev/
      page.tsx
      dashboard/page.tsx
    docs/page.tsx
    pricing/page.tsx
    play/page.tsx      # redirect → showcase game
  components/
    Nav.tsx
    Footer.tsx
    HeroCanvas.tsx     # Three.js pulse beams (client)
  tailwind.config.ts
  tsconfig.json
  next.config.js
  postcss.config.js
  package.json
```

## Brand palette

- Background: `#05060d` (very dark navy)
- Pulse gradient: `#fcd34d` (gold) → `#ff6b35` (flame) → `#ff3d7f` (rose)
- Beam palette: `#ff3d7f`, `#ff6b35`, `#fcd34d`, `#10b981`, `#06b6d4`, `#a855f7`

## Build

```bash
npm run build
npm start
```

## Deployment

Not deployed from this repo. Stream 3C handles deploy (Vercel project pointing at `mypulse.city`).

## Environment variables

When Stream 3B wires the dashboard you'll want:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both come from the **nag-platform** Supabase project that backs Pulse infrastructure.
