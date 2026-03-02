

## Plan: Animated India-to-World Narrative for GeoReachScene

### Concept

A **three-phase scroll-triggered animation** that tells a story:

1. **Phase 1 — India Lights Up** (0–3s): A large India outline/dot-map fills the viewport. Cities and towns light up state-by-state in a ripple from the center (Nagpur outward). Indian city labels appear (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Jaipur, etc.) with learner counts. Stats for India flash in below (821 cities, 28 states).

2. **Phase 2 — Zoom Out to World** (3–5s): The India map smoothly scales down and repositions as the world map fades in around it. India remains highlighted/glowing while the rest of the world renders as muted outlines.

3. **Phase 3 — Global Connections** (5–7s+): Connection arcs draw from India to international cities (Dubai, London, New York, Singapore, Sydney, Toronto, LA). Traveling dots animate along arcs. City markers and labels fade in. Final stats appear (821 cities, 13+ countries).

### Animation Approach

All animation is **time-based after scroll trigger** (not scroll-driven), using a single `useScrollReveal` to detect entry, then a `phase` state that advances via `setTimeout`:
- `phase=0`: hidden
- `phase=1`: India zoomed in, dots rippling
- `phase=2`: scale transition, world map fading in
- `phase=3`: arcs + international cities

The India-to-World zoom is achieved by animating `transform: scale()` and `translate()` on a wrapper `<g>` element via inline styles with CSS transitions — no Framer Motion scroll triggers (per project conventions).

### Indian Cities Data

New data file with ~15 major Indian cities positioned on the IndiaDotsMap coordinate system (local coords 0–200 x 0–280):
- Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Kochi, Indore, Bhopal, Vizag

Each with a learner count label.

### File Changes

1. **Create `src/components/impact/indiaMapData.ts`** — Indian cities array with positions mapped to the IndiaDotsMap local coordinate space, plus state-wise grouping for staggered lighting.

2. **Rewrite `src/components/impact/GeoReachScene.tsx`** — Three-phase animated narrative:
   - Phase 1: Large India SVG (reuses `IndiaDotsMap` component) centered in viewport with Indian city markers lighting up state-by-state. India stats below.
   - Phase 2: CSS transition scales India down from `scale(2.5)` to `scale(1)` and translates it to the India position on the world map. World map image fades in simultaneously.
   - Phase 3: Current arc/city marker logic kicks in for international cities.
   - Single SVG element throughout — the viewBox stays fixed, India `<g>` transform animates.

3. **Update `src/index.css`** — Add `animate-india-city-appear` keyframe for Indian city label staggered fade-in, and a `geo-phase-transition` class for the smooth scale/translate.

### Layout Sketch

```text
Phase 1 (India zoomed):
┌──────────────────────────────┐
│       Global Reach           │
│  Spreading from India...     │
│                              │
│      ╭─── INDIA MAP ───╮    │
│      │  ● Delhi         │    │
│      │     ● Jaipur     │    │
│      │  ● Mumbai        │    │
│      │     ● Bangalore  │    │
│      │  ● Chennai       │    │
│      ╰──────────────────╯    │
│   821 cities · 28 states     │
└──────────────────────────────┘

Phase 2 (zoom out):
India shrinks ← CSS scale(2.5→1) + translate

Phase 3 (world view):
┌──────────────────────────────┐
│  ╭ world map ───────────╮    │
│  │  LA ─── Toronto      │    │
│  │    NYC ──── London    │    │
│  │              Dubai ●INDIA │
│  │           Singapore  │    │
│  │              Sydney  │    │
│  ╰──────────────────────╯    │
│   821 cities · 13+ countries │
└──────────────────────────────┘
```

### Technical Details

- India `<g>` starts at `transform: translate(Xcenter, Ycenter) scale(2.5)` (centered in SVG viewBox), transitions to `translate(indiaWorldX, indiaWorldY) scale(1)` over 1.5s with `ease-in-out`
- Indian city labels use `<text>` elements inside the India `<g>`, so they scale with it — font sizes are set to look right at the zoomed-in scale (will become tiny at world scale, which is correct)
- World map `<image>` opacity transitions from 0 to 0.4 during phase 2
- Phase timings: phase 1 starts at scroll trigger, phase 2 at +3s, phase 3 at +4.5s
- Stats row smoothly swaps from India stats to global stats between phases

