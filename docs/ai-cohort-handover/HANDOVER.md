# `/ai-cohort` — Handover for clonk.ai

> **Read this first.** This is a complete handover of the LevelUp **AI Generalist Program** landing page (`/ai-cohort`). It hands you the current state, the source-of-truth assets, what works, what doesn't, and where it's stuck — so you can take over cleanly.

---

## 0. Mandate from Rahul (the owner)

**Rahul is not satisfied with the current execution.** You are explicitly invited to **revamp, rework, or rebuild this however you do it best** — your own structure, your own componentization, your own build approach. Do not feel bound by the current single-file HTML approach or any decision documented below. Treat the current page as *context and reference*, not as a constraint.

The **one hard requirement** that has caused all the friction so far:

> **Pixel-fidelity to the design images.** Rahul designs each section as an image (in Higgsfield), and the page must replicate that image exactly — the exact text, the exact visuals, the exact structure/layout. "Inspired by" is not enough. The previous build kept producing *approximations* (gradient placeholders instead of the real photos, re-interpreted layouts, paraphrased copy), and that is precisely what Rahul rejected: *"Absolutely nothing matches any of the images... The fidelity should be the exact text, the exact visuals, the exact structures, whatever is there in the images."*

So: **the reference images in [`./reference/`](./reference/) are the spec for layout/visuals, and [`./SPEC.md`](./SPEC.md) is the spec for copy.** Match both.

If you think a *different* direction would be better, that's a conversation to have with Rahul — but the current accepted direction is the **light modern-SaaS** look he fell in love with (see §4).

---

## 1. What this is & where it lives

- **The page:** a single self-contained file → `public/ai-cohort/index.html` (one inline `<style>` + one inline vanilla-JS `<script>`, no framework). It is **not** an Astro route and **not** a React island. Astro copies `public/` verbatim, so it serves at `leveluplearning.in/ai-cohort` in prod.
- **Repo:** `levelupnewsite` (this repo) — Astro 5 marketing site for leveluplearning.in. The `/ai-cohort` page is intentionally **unlisted** (not in the sitemap/nav).
- **Branch:** `feat/ai-cohort-revamp` (this branch). **Not deployed.** `main` still has the old version.
- **Assets:** `public/ai-cohort/assets/` — tool-logo SVGs in `logos/`, real cropped photos (`honest-*.jpg`, `persona-*.jpg`), `cta-motion.png`.

### Why single-file?
It was chosen for fast iteration and zero build coupling. **You are free to break it into components / a proper Astro page / Tailwind / whatever** if that helps you hit fidelity faster and cleaner. The only thing that must survive is the URL (`/ai-cohort`) and that it deploys as part of this Astro site.

---

## 2. How to run & preview

```bash
npm install
npm run dev            # Astro dev server
```

- **Important dev quirk:** the bare path `/ai-cohort` **404s in dev**. Open the full file path instead:
  `http://localhost:<port>/ai-cohort/index.html`
  (In prod the clean `/ai-cohort` works because of how Astro serves `public/`.)
- There is local-only tooling on Rahul's machine (`.claude/refresh-preview.sh` + a Stop hook) that auto-reloads his Safari tab after each edit. **It is not committed** (it's machine-specific, points at Safari + a hardcoded localhost port). Set up your own preview/reload however you like.

---

## 3. Source of truth (match these exactly)

### 3a. Copy → [`./SPEC.md`](./SPEC.md)
`LevelUp-AI-Copy-v2-Restructured.md` — **17 sections in a locked flow**, all final copy. Key facts that have drifted before, so lock them:
- **Duration is 3 MONTHS / 12 WEEKS** (an earlier build wrongly said 8 weeks — do not regress).
- Curriculum module weeks: `00 → Wk 1–2`, `01 → Wk 3–5`, `02 → Wk 6–8`, `03 → Wk 9–11`, `04 → Wk 12`.
- Hero eyebrow: **"THE 3-MONTH AI GENERALIST PROGRAM"**.
- Secondary CTA everywhere: **"Download the curriculum"**.
- **All CTAs point to WhatsApp:** `https://wa.me/919791520177`.

### 3b. Visuals/layout → [`./reference/`](./reference/)
Downscaled copies of Rahul's Higgsfield design images (originals are 8K PNGs in his `~/Downloads`, named `hf_20260619_*.png`):

| File | Section | Status |
|---|---|---|
| `section3-stat-bar.jpg` | §3 — proof/urgency stat bar | built, **approximate — needs fidelity pass** |
| `section4-honest-part.jpg` | §4 — "the honest part" (Watching vs Building) | **rebuilt by hand, matches** ✅ |
| `section5-who-is-a-generalist.jpg` | §5 — "Who is an AI generalist" | built, **approximate — needs full rebuild** |
| `section6-is-this-you.jpg` | §6 — "Is this you" (4 persona cards) | rebuilt to fidelity, **needs a final live QA** |

> Hero (§2) was matched from a reference Rahul pasted inline (no file saved). It is the **only** section he confirmed already matches. Use the hero as the north-star for the visual language.

There are **more sections still to be designed** by Rahul — he drops a new `hf_*.png` in `~/Downloads` when ready. Watch that folder (or ask him) for new section designs. The backlog of spec sections not yet given a design image: §7 "What you become", §10 "The tools (grouped)", plus real price / seat-count / mentor-photo placeholders.

---

## 4. Design system (current "light modern SaaS" direction)

Tokens are defined in `:root` at the top of the `<style>` block in `index.html`:

```
--bg:#F3F2EF   --surface:#FBFAF8   --card:#fff
--ink:#15140F  --body:#3B3833      --muted:#6E6A62   --faint:#9A958B
--line:#E7E3DC
--orange:#FF5A1F   --orange-ink:#C2410C (small orange text on light, AA-safe)
--orange-2:#F4490F --orange-tint:#FFEDE4
--green:#1F9D57
radius: 24 / 16 / 12
```
- **Fonts:** Inter (UI/headings) + IBM Plex Mono (labels/eyebrows, via `.mono`).
- **Reusable classes:** `.wrap .sec .shead .eyebrow .badge .btn .card .spot (spotlight) .rv (scroll-reveal)`.
- **21st.dev-style touches present:** logo marquee, aurora hero backdrop, spotlight/border-beam cards, testimonial marquee, CTA shine, magnetic buttons. Rahul likes this energy **but hates "AI slop"** — generic trendy-serif costumes, fake UI mockups, node diagrams, count-up numbers, repetitive card grids. Avoid those.

> History (so you don't re-tread it): earlier directions were a warm "Build Journal" (Instrument Serif) and a "Brutalist" (Archivo) look — **both were rejected.** The current light-SaaS direction is the one that stuck.

---

## 5. Current state, section by section

Order in the file: announcement bar → nav → hero (+ "OS dashboard" + showcase) → logo marquee → §4 honest part → §5 who-is-a-generalist → §6 is-this-you → what-you-build → curriculum → comparison → mentors → testimonial marquee → pricing → FAQ → final CTA → footer.

- **Hero (§2):** ✅ matches, accepted. North-star.
- **§3 stat bar:** ⚠️ approximate. Rebuild to `reference/section3-stat-bar.jpg`.
- **§4 honest part:** ✅ rebuilt by hand to match — uses **real cropped photos** (`honest-watching.jpg`, `honest-building.jpg`), a fanned brand-card pile, workflow cards, 97/0-vs-98/3 gauges, tinted Watching/Building panels, a VS circle, 3 bottom points. This is the proof that the hand-build + real-photo approach works.
- **§5 who-is-a-generalist:** ⚠️ approximate — **needs a full rebuild** to `reference/section5-who-is-a-generalist.jpg`: operator photo, Before/After panel, a `GOAL → AI AGENT → TOOLS → CHECK → DONE` flow with a FEEDBACK LOOP, and Marketing/Operations/Data function tabs with agent-output preview cards.
- **§6 is-this-you:** ◑ just rebuilt to fidelity — 4 persona cards with **real cropped photos** (`persona-founders/family/corporate/aspiring.jpg`), orange-circle-outline checks, icon badges, exact copy. **Needs one final live QA** against `reference/section6-is-this-you.jpg` (the preview tab had drifted to `/` when work paused, so the last visual diff wasn't confirmed).
- **Everything else** (logo marquee, what-you-build, curriculum, comparison, mentors, testimonials, pricing, FAQ, final, footer): built from the **copy spec** but **not yet matched to a design image** (Rahul hasn't designed those as images yet). They are reasonable but should be considered provisional.

---

## 6. Gotchas & failure modes (learn from these)

1. **Text-only agent fleets produced approximations, not fidelity.** A multi-agent "fleet" was run to build/refine sections, but agents can't see the rendered browser, so they guessed at layout and paraphrased copy → exactly the mismatch Rahul rejected. **Fidelity work needs to be done against the rendered page with live visual verification** (screenshot vs reference, iterate). Don't trust a blind build.
2. **Use the REAL photos, not gradient placeholders.** The big unlock for §4/§6 was extracting the actual photos from the 8K reference PNGs with ImageMagick crops, e.g.:
   ```bash
   magick input-8k.png -crop WxH+X+Y +repage -resize 720x -strip -quality 86 out.jpg
   ```
   Placeholders read as "AI slop" and fail the fidelity bar.
3. **Shared CSS class collision:** the persona cards (§6) and the pricing cards (§14) both used `.pcard`. This was just fixed by scoping §6's rules to `.pgrid .pcard` — but if you refactor, watch for this pattern (generic class names colliding across sections in one big stylesheet). This is a good argument for componentizing.
4. **Mid-page screenshots:** screenshots reliably capture only the top of the page. The workaround used was to hide a section's previous siblings ("isolate at top") before capturing. If you have better tooling (Playwright element screenshots), prefer it.
5. **Backups** of earlier states exist only on Rahul's machine at `/tmp/ai-cohort-ORIGINAL.html` and `/tmp/ai-cohort-prefleet-backup.html` (not in the repo).

---

## 7. Deploy

- The site deploys via **Vercel** (project for leveluplearning.in, team `level-up4`). Merging to `main` ships to prod; pushing this branch creates a Vercel **preview** deployment.
- Because `/ai-cohort` is a static file under `public/`, no special build config is needed — it ships with the normal Astro build.
- **Git author gotcha:** Vercel rejects deploys made with the auto-generated `user@host.local` fallback author. Always commit with a real `user.email`. (This handover commit uses the `levelupadmin` identity.)

---

## 8. Access & credentials (locations, not secrets)

**No secrets are stored in this repo or this document — on purpose.** GitHub secret-scanning auto-revokes any PAT committed to a repo, which would break access. Rahul holds the credentials and will provide them to you directly:

- **GitHub:** repo is `levelupadmin/levelupnewsite`. Rahul will give you a Personal Access Token out-of-band. **Recommended:** use a *fresh fine-grained PAT scoped to just this repo* with an expiry, rather than a broad classic token.
- **Vercel:** token + project access held by Rahul (team `level-up4`).
- Other LevelUp credentials live in Rahul's private store (iCloud `LevelUp Core/…/03_source_references/`), not here.

---

## 9. Suggested first moves

1. Pull this branch, `npm install`, run dev, open `/ai-cohort/index.html`.
2. Open `reference/` side-by-side with the rendered page. Confirm hero (✅) and §4 (✅) match.
3. Decide your architecture: keep single-file, or componentize. Either is fine with Rahul.
4. Take the **worst-matching sections first** — §5, then §3, then final-QA §6 — and rebuild to exact fidelity against the reference images (real photos, exact copy from `SPEC.md`, exact layout). Verify each with a live screenshot-vs-reference diff before moving on.
5. Ask Rahul for any **new `hf_*.png` section designs** sitting in his Downloads, and for the missing data (real prices, seat count, mentor names/photos).
6. When in doubt on copy, `SPEC.md` wins. When in doubt on layout/visuals, the `reference/` image wins.

Good luck — you have a clear bar (match the images) and a clean runway to do it your way.
