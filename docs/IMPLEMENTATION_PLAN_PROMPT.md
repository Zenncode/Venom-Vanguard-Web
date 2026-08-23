# Implementation Plan Prompt — Venom Vanguard Squad Website

> Paste this entire document as the prompt when kicking off implementation with a coding agent.

---

## Role

You are implementing the official website for **Venom Vanguard (VV)**, a Mobile Legends: Bang Bang (MLBB) squad. This is a **static showcase website** — no backend, no auth. All content is managed through typed data files that leaders can edit directly.

## Critical environment rules

- **Next.js 16.3.2 + React 19 + Tailwind CSS v4** — this is NOT the Next.js you know from training data. Before writing any code, read the relevant guides in `node_modules/next/dist/docs/` (App Router structure, fonts, images, metadata). Heed all deprecation notices.
- Follow existing conventions in `AGENTS.md`.
- No new dependencies unless listed below. Do not add comments to code.
- Run `npm run lint` and `npm run build` at the end of each phase — both must pass.

## Tech stack

- Next.js App Router (TypeScript), React Server Components by default
- Tailwind CSS v4 for styling (design tokens via CSS variables / `@theme`)
- Fonts via `next/font`: a techy display face (e.g. Orbitron) for headings + Rajdhani/Inter for body
- Images via `next/image`, assets in `public/`
- Content as typed TypeScript data modules in `src/data/` (or `app/data/`) — single source of truth
- Motion: `motion` for springs/transitions; CSS 3D transforms as the baseline; optional `@react-three/fiber` hero scene (see 3D spec)

## Design system — "Toxic Esports"

Dark esports aesthetic, venom-themed:

| Token | Value |
|---|---|
| Background | near-black `#07070B` with subtle radial glows |
| Primary accent | venom green `#7CFC00` / `#39FF14` |
| Secondary accent | toxic purple `#A855F7` |
| Surface | `#101018` cards with 1px `rgba(124,252,0,0.15)` borders |
| Text | `#EDEDF2` primary, `#8A8A99` muted |

Visual language — **modern 3D**:

- Angular/clipped-corner cards (`clip-path` notches), sharp 0–4px radii
- Subtle scanline/grid texture on hero sections
- Glow hover states (green box-shadow) on interactive elements
- Role color coding: Jungler = red, Mid = blue, EXP = orange, Gold = gold, Roam = cyan
- Fully responsive; mobile-first; sticky navbar collapsing to hamburger menu

### 3D & motion spec

Depth and dimensionality throughout, implemented in three tiers (cheapest first):

1. **CSS 3D everywhere (baseline, zero JS cost)**
   - `TiltCard`: every card (players, matches) gets a pointer-tracked 3D tilt (`perspective` + `rotateX/Y`, max ~8°) with a moving specular glare highlight
   - Layered depth: cards float above backgrounds using stacked shadows + slight translateZ parallax on scroll
   - Hero: multi-layer parallax scene (background glow → grid floor → logo/title foreground) reacting to mouse position
   - Smooth entrance animations on scroll (fade-up/slide-in via IntersectionObserver or the animation lib below)
2. **Micro-interactions**
   - Magnetic/glow buttons with springy hover scale, animated underline nav links
   - Number counters that count up when scrolled into view (stat strip)
   - Page transitions: subtle cross-fade/slide between routes
   - Respect `prefers-reduced-motion` — all of the above degrades gracefully to static
3. **Signature WebGL moment (hero only)** — one lightweight Three.js scene via `@react-three/fiber` + `@react-three/drei`: e.g. a slowly rotating low-poly venom-green crystal/serpent emblem with bloom, draggable, capped DPR, lazy-loaded client-side. If bundle/perf budget is exceeded, fall back to tier 1 CSS hero only.

Performance guardrails: total first-load JS for 3D ≤ ~150KB gzipped (three.js code-split, loaded after hydration), animations GPU-only (`transform`/`opacity`), no layout-thrashing scroll handlers. Lighthouse targets still apply.

Suggested additions to stack: `motion` (framer-motion successor) for springs/transitions; `@react-three/fiber` + `@react-three/drei` for the hero scene only.

## Site map

```
/                Home
/roster          Squad roster (+ per-member detail view)
/matches         Match history, tournaments & achievements
/recruit         Recruitment / tryouts
/gallery         Media gallery
```

Shared: Navbar, Footer (Discord/FB/TikTok links), MainLayout.

## Data models (`data/squad.ts`)

```ts
type Role = "Jungler" | "Mid" | "EXP" | "Gold" | "Roam";

interface Player {
  id: string;
  ign: string;            // in-game name
  realName?: string;
  role: Role;
  captain?: boolean;
  rank: string;           // e.g. "Mythical Glory"
  peakRank?: string;
  winRate: number;        // 0-100
  matchesPlayed: number;
  signatureHeroes: { name: string; image?: string }[];
  joinedDate: string;
  bio?: string;
}

interface Match {
  id: string;
  date: string;
  opponent: string;
  opponentLogo?: string;
  format: string;         // e.g. "Bo3", "Bo5", "Scrim"
  tournament?: string;
  score: [number, number];
  result: "win" | "loss";
  mvp?: string;           // player id
  notes?: string;
}

interface Achievement {
  id: string;
  title: string;          // e.g. "Champion — Campus Clash S3"
  date: string;
  placement: string;      // "1st", "Top 4"...
  image?: string;
}

interface GalleryItem {
  id: string;
  src: string;
  caption?: string;
  type: "screenshot" | "event" | "meme";
}
```

Seed every file with realistic placeholder content (6-player roster covering all 5 roles, ~10 matches, ~4 achievements, ~9 gallery placeholders) so the UI is fully populated from day one. Replace later by editing these files only.

## Page specs

### Home `/`
- Full-viewport 3D hero: WebGL emblem scene (or CSS parallax fallback), squad logo, tagline ("Strike first. Strike last." — adjust), CTA buttons → `/recruit` + Discord; mouse-reactive parallax layers
- Animated stat strip: total matches, win rate, tournaments won, active members (computed from data files) — counters count up on scroll into view
- "Featured members" — captain + top 2 by win rate as tilting PlayerCards
- Latest 3 match results (MatchCards) with link to full history
- Achievements marquee/timeline teaser
- Socials banner

### Roster `/roster`
- Filter tabs by role (All / Jungler / Mid / EXP / Gold / Roam) with animated layout transitions when filtering
- PlayerCard grid: avatar frame with role color border, IGN, role badge, rank emblem text, win rate bar, signature heroes row — cards tilt in 3D on hover with glare effect
- Click → detail panel/modal or dedicated route with a depth-zoom transition: full stats, bio, hero pool
- Captain gets a visual crown/badge distinction

### Matches `/matches`
- Season record summary: W–L–(win%) big number header
- Filters: All / Tournaments / Scrims; toggle Win/Loss
- MatchCard list (chronological desc): logos, score, format, tournament chip, MVP
- Achievements section: trophy timeline with placements

### Recruit `/recruit`
- Requirements card: min rank (e.g. Mythic), age, mic, availability for scrims
- Open positions per role (driven by data flag)
- Tryout application: static-site friendly — either a styled form posting to a placeholder endpoint (Formspree-ready) **or** prominent "Apply via Discord" CTA linking to the server's #tryout channel. Include required-info checklist (IGN, role, rank, hero pool, availability).
- FAQ accordion

### Gallery `/gallery`
- Responsive masonry grid with category filter chips and staggered 3D flip/scale entrance
- Lightbox on click (keyboard navigable, no heavy dependency — small custom component)

## Component inventory

`Navbar` · `Footer` · `HeroBanner` (+ `Hero3DScene`) · `StatStrip` · `TiltCard` · `PlayerCard` · `RoleBadge` · `RankBadge` · `MatchCard` · `AchievementTimeline` · `SectionHeading` · `GlowButton` · `FilterTabs` · `ScrollReveal` · `Counter` · `Lightbox` · `FaqAccordion`

Place reusable components under `app/components/`; keep pages thin — composition + data mapping only.

## Implementation phases (build & verify in order)

1. **Foundation** — design tokens in globals.css, fonts, MainLayout, Navbar (mobile menu), Footer, SEO base metadata + OG tags; install `motion` (+ `@react-three/fiber`/`@react-three/drei` if pursuing the WebGL hero); build `TiltCard`, `ScrollReveal`, `GlowButton` primitives
2. **Data layer** — `squad.ts` types + seeded data; helper functions (`getWinRate()`, `getLatestMatches()`, etc.)
3. **Home** — HeroBanner with 3D scene (CSS parallax first, WebGL upgrade after), StatStrip with animated counters, featured members, latest results
4. **Roster** — tilting cards, role filters with layout animations, member detail transition
5. **Matches** — record summary, filters, cards, achievements timeline
6. **Recruit** — requirements, positions, application flow, FAQ
7. **Gallery** — grid, filters, lightbox, staggered entrances
8. **Polish & performance** — responsive audit (360px→1440px), focus states, `prefers-reduced-motion` fallbacks for every animation, code-split/lazy-load the WebGL scene and verify JS budget, favicon/logo assets, `sitemap.ts`/`robots.txt`, Lighthouse ≥ 90 (perf included) across the board

Each phase ends with: lint passes, build passes, manual check of the touched routes at mobile + desktop widths.

## Out of scope (v1)

No CMS, no auth/admin, no database, no live MLBB API integration. Everything ships as a statically rendered site deployable to Vercel/netlify with zero config.
