# LevelUp Site — Autonomous Overnight Session Context

**Session start:** 2026-04-29 ~03:25 IST
**User goal (verbatim):** Clone Lokesh, Nelson Dilipkumar, and Ravi Basrur's Framer-hosted masterclass pages into the Astro site at 99-100% fidelity. Self-host every asset (image/video/font). Make each page mobile-perfect, SEO-clean, LLM-discoverable, and Lighthouse-optimized for Facebook ads. User is asleep; all 3 must be live on www.leveluplearning.in by morning.

**Auth path the user mentioned:** "Level Up code folder" has access tokens. Memory note `reference_levelup_interakt.md` exists; primary GitHub PAT is at `/Users/rahul/Library/Mobile Documents/com~apple~CloudDocs/Claude Projects/LevelUp Core/_system/github_pat.md` (per the migration plan in `/Users/rahul/.claude/plans/...`).

---

## Repo / Deploy

- **Repo:** github.com/levelupadmin/levelupnewsite (branch `main`)
- **Local clone:** `/tmp/levelupnewsite`
- **Vercel project ID:** `prj_NE0jadHsZaIcAzgo1mJcBoex6N5m`
- **Vercel team ID:** `team_sqMPD1UdixPRyxoiCKHfeE2M`
- **Live URL:** https://www.leveluplearning.in
- **Builds take ~12-23 min** because postbuild AVIF/WebP encoding on Vercel's 2-core builder.

## Working dirs

- Recon scratch: `/tmp/lokesh-recon/`, `/tmp/nelson-recon/`, `/tmp/ravi-recon/`
- Playwright sandbox (has playwright + sharp installed): `/tmp/mobile-compare/`

---

## Lokesh masterclass — STATUS

**Live URL (intended):** https://www.leveluplearning.in/masterclass/lokesh-kanagaraj
**Original Framer URL:** https://masterclass.leveluplearning.in/lokesh-kanagaraj (Framer/sites.framer.app)

**Files added/touched:**
- `src/pages/masterclass/lokesh-kanagaraj.astro` — main page (~12 sections)
- `src/components/lokesh/EpisodeAccordion.tsx`
- `src/components/lokesh/FAQAccordion.tsx`
- `src/components/lokesh/TestimonialCarousel.tsx`
- `src/components/lokesh/LokeshTrailer.tsx` (YouTube embed facade)
- `src/components/lokesh/PosterMarquee.tsx` (closing pitch marquee)
- `src/components/MasterclassSection.tsx` — switched Lokesh href to internal `/masterclass/lokesh-kanagaraj`
- `public/levelup-logo-mark.svg`
- `public/masterclass/lokesh/` — 42 assets (8 mp4, 21 jpg, 13 png, 2 svg). 48 MB total.

**Already shipped (commits on main):**
- `324c9aa` — V1 of clone (12 sections, all assets)
- `965cd54` — V2: hero video, YouTube trailer, real revolver, typography overhaul, marquee, fixed reveal-hidden default

**Working tree right now (uncommitted):**
- Hero tightened (less gradient, gold accent on "Lokesh Kanagaraj" in headline)
- Who-Is-This-For: heading no-wrap, larger revolver, brighter rings, tighter pill positions

## Nelson Dilipkumar masterclass — TODO

- **Original Framer URL:** https://masterclass.leveluplearning.in/nelson-dilipkumar
- **Currently linked from:** `src/components/MasterclassSection.tsx` (last entry, href `https://masterclass.leveluplearning.in/nelson-dilipkumar`)
- **Asset destination:** `public/masterclass/nelson/` (create new dir)
- **Page route:** `src/pages/masterclass/nelson-dilipkumar.astro`

## Ravi Basrur masterclass — TODO

- **Original Framer URL:** https://masterclass.leveluplearning.in/ravi-basrur
- **Currently linked from:** `src/components/MasterclassSection.tsx` (Ravi Basrur entry)
- **Asset destination:** `public/masterclass/ravi/` (create new dir)
- **Page route:** `src/pages/masterclass/ravi-basrur.astro`

---

## Recon recipe (proven on Lokesh)

```bash
# 1. Download HTML
mkdir -p /tmp/<NAME>-recon
curl -sL https://masterclass.leveluplearning.in/<slug> -o /tmp/<NAME>-recon/page.html

# 2. Extract all framerusercontent asset URLs
grep -oE 'https://framerusercontent.com/[a-zA-Z0-9./_-]+\.(jpg|jpeg|png|webp|svg|mp4)' /tmp/<NAME>-recon/page.html | sort -u > /tmp/<NAME>-recon/asset-urls.txt

# 3. Download in parallel (8 concurrent)
mkdir -p /tmp/<NAME>-recon/assets && cd /tmp/<NAME>-recon/assets
cat /tmp/<NAME>-recon/asset-urls.txt | xargs -n1 -P8 -I{} curl -sf -O {}

# 4. Identify revolver-equivalent / hero / trailer using extract-dom + extract-css scripts in /tmp/mobile-compare/
# Each Framer masterclass page seems to follow the same structure: hero video → trailer → class info → director films → who-is-this-for → why-is-this-masterclass → certificate → testimonials → what-you-get → LCU-equivalent → closing pitch → FAQ → footer.

# 5. Find YouTube trailer ID
grep -oE 'youtube.com/embed/[^"?]+' /tmp/<NAME>-recon/page.html | head -1
```

## Build template

The Lokesh page in `src/pages/masterclass/lokesh-kanagaraj.astro` is the canonical Framer-clone template. For each new instructor:

1. Copy the Astro page to a new file
2. Replace ASSET path constant
3. Replace episodes/FAQs/testimonials/films arrays with new instructor's data
4. Replace YT_TRAILER_ID with new YouTube ID
5. Update CTA_HREF + course JSON-LD instructor name
6. Asset filenames will be different (Framer hashes) — use the same naming pattern under public/masterclass/<slug>/

## Vercel deploy commands

```bash
# Push triggers auto-deploy
git push origin main

# Monitor (mcp tool): mcp__3d335074-9467-4808-ab39-74c53bf6f708__list_deployments
# Build logs: mcp__3d335074-9467-4808-ab39-74c53bf6f708__get_deployment_build_logs
# Note: NO cancel deployment tool available; new commit on main supersedes BUILDING old.
```

## Image optimization pipeline

`scripts/optimize-images.mjs` walks `dist/`, recompresses every PNG/JPG, emits AVIF + WebP siblings, then mirrors to `.vercel/output/static/`. Already optimized to encode-once-then-copy — runs ~10-12 min on Vercel for ~250 images (the slow part is AVIF effort=6).

---

## Next session — pick up here

If this session ends mid-work, check `git log --oneline main` for latest commit hash. The current state should be one of:
- Lokesh in progress — tweaking hero/who-is-this-for/why-is-this. Not yet committed.
- Lokesh shipped, Nelson recon in progress.
- Nelson shipped, Ravi recon in progress.
- All 3 shipped, doing Lighthouse + SEO audit.

Run `git status` and `git log --oneline -10` to see exact state.
