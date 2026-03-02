

## Plan: Three-Phase Animated Narrative with India State Outline Map

### Overview

Replace the India dot map with a proper SVG outline map of India split by states. Cities light up as dots state-by-state in Phase 1 (zoomed in), then the view zooms out to reveal the world map in Phase 2, and international arcs appear in Phase 3.

### Files to Create/Modify

**1. Create `src/components/impact/IndiaStatesMap.tsx`**
- An SVG `<g>` component containing simplified SVG `<path>` elements for all major Indian states (using actual geographic path data, ~30 states/UTs)
- Each state path has a unique id (e.g., `"mh"`, `"ka"`, `"tn"`)
- States start invisible (`opacity: 0, fill: none, stroke: muted`) and light up region-by-region with a primary color fill and glow
- Accepts `phase` and `isVisible` props to control animation timing
- Local coordinate space ~0-200 x 0-280 (same as the old dot map for positioning compatibility)

**2. Create `src/components/impact/indiaMapData.ts`**
- Array of ~15-20 major Indian cities with:
  - Position in India local coords
  - `label` (city name), `learners` count
  - `region` grouping: North, South, West, East, Central (for staggered state-by-state lighting)
- State-to-region mapping for controlling which states light up in which wave
- Region animation order: Central (0s) → West (0.4s) → North (0.8s) → East (1.2s) → South (1.6s)

**3. Rewrite `src/components/impact/GeoReachScene.tsx`**
- Three-phase state machine triggered by `useScrollReveal`:
  - **Phase 1 (0-3s)**: India outline map zoomed in (`scale(2.5)` on the `<g>` wrapper, centered in SVG viewBox). States light up region-by-region with fill transitions. City dots appear with labels and learner counts staggered by region. Stats show "821 cities across 28 states".
  - **Phase 2 (3-4.5s)**: Smooth CSS transition scales India `<g>` down from `scale(2.5)` to `scale(1)` and translates it to the India position on the world map. World map `<image>` fades in simultaneously. India states remain highlighted.
  - **Phase 3 (4.5s+)**: Connection arcs draw from India to 7 international cities. Traveling dots animate along arcs. City markers with tooltips appear. Stats crossfade to "821 cities, 13+ countries".
- The `<g>` transform uses `translate(cx,cy) scale(s) translate(-cx,-cy)` pattern for proper origin
- Heading text transitions: "Lighting Up India" → "Spreading from India to the World"

**4. Update `src/index.css`**
- Add `@keyframes india-state-light-up` for state fill/stroke transitions
- Add `@keyframes india-city-dot-appear` for staggered city dot pop-in
- Add `.geo-phase-transition` class with `transition: transform 1.5s ease-in-out`

### India States SVG Approach
- Use simplified/compressed SVG path data for Indian states (not full geographic detail — enough to be recognizable)
- Each state is a `<path>` with `className` driven by the current phase and region
- States in the active region get `fill: hsl(var(--primary) / 0.3)` and `stroke: hsl(var(--primary))` with a staggered delay
- This replaces `IndiaDotsMap` entirely in the GeoReachScene (the old component stays for any other usage)

### Animation Timeline
```text
0.0s  — Scroll trigger, Phase 1 starts
0.0s  — India outline appears (stroke only, muted)
0.3s  — Central states light up (MP, Maharashtra)
0.7s  — West states (Gujarat, Rajasthan, Goa)
1.1s  — North states (Delhi, Punjab, UP)
1.5s  — East states (WB, Odisha, Bihar, NE)
1.9s  — South states (Karnataka, TN, Kerala, AP)
2.0s  — City dots start appearing per region
2.5s  — India stats fade in below
3.0s  — Phase 2: zoom-out transition begins
4.5s  — Phase 3: world map visible, arcs start drawing
5.5s  — International city markers appear
6.0s  — Stats swap to global numbers
```

