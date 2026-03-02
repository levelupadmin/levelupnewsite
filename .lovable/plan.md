

## Revamp: World Map with India as Focal Hub

### Problem
The current implementation tries to form India's shape using ~150 scattered dots in a narrow 200x280 SVG viewBox. The result looks like random dots rather than a recognizable map.

### New Approach: Simplified World Map with India Highlighted

Replace the India-only dot cluster with a **full world map** using a lightweight Mercator-projected dot grid. The viewBox expands to a wide landscape format (e.g. `0 0 800 400`).

```text
┌──────────────────────────────────────────────────────┐
│  ·  ·              ·  ·  ·  ·                        │
│  · NA ·         ·  EUROPE  ·     · · · · · ·         │
│  ·  ·  ·         ·  ·  ·  ·    · · INDIA · · ·      │
│     ·  ·            ·  ·      · · ·██████· · · ·     │
│        ·           AFRICA     · · ·██████· · · ·     │
│                      ·  ·      · · · · · · ·    SE   │
│                      ·           · · · ·     Asia    │
│              S.America             ·              AU  │
└──────────────────────────────────────────────────────┘
         ↗ curved arcs from India to cities worldwide
```

### Technical Details

**1. Replace `GeoReachScene.tsx` entirely**
- New viewBox: `0 0 800 400` (landscape, fits the section width naturally)
- **World continents** as sparse, small dots (r=1.2, low opacity ~0.2) — just enough to read as landmasses, not detailed borders
- **India region** rendered with dense, bright dots (r=1.5–3, opacity 0.7–1.0) — clearly the most concentrated area
- **Major Indian cities** (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad) get larger dots (r=3) with animated ping rings and city labels that fade in
- **International cities** (Dubai, London, New York, Singapore, Sydney, Toronto, Los Angeles) as medium dots (r=2.5) with labels
- **Connection arcs**: Curved quadratic bezier paths from Indian cities to international cities (dashed, animated stroke-dashoffset)
- **Internal arcs**: A few arcs connecting Indian cities to each other (Mumbai↔Delhi, Bangalore↔Chennai, etc.) to show India connecting with itself

**2. Dot data structure**
- ~40–50 dots per continent outline (NA, SA, Europe, Africa, East Asia, Oceania) at low opacity
- ~80 dense dots for India at high opacity with gradient intensity (metros glow brighter)
- 6–8 international city dots with labels
- 6 major Indian city dots with labels + ping animations

**3. Animations** (CSS keyframes, no scroll-triggered — consistent with project conventions)
- India dots ripple in from center (existing `impact-dot-ripple` keyframe reused)
- World dots fade in after India (0.8s delay)
- Connection arcs draw in with `stroke-dashoffset` animation (staggered)
- City ping rings pulse (existing `impact-city-ping` reused)
- Internal India arcs draw slightly before international arcs

**4. Stats overlay** — kept as-is below the map (821 cities / 13+ countries)

**5. `IndiaDotsMap.tsx`** — can be deleted or left unused (it's only imported in `GeoReachScene` context, and the WhyLevelUp card uses a separate version)

### Files Changed
- `src/components/impact/GeoReachScene.tsx` — full rewrite with world map data + SVG
- `src/index.css` — minor: add `animate-impact-internal-arc` keyframe for India-to-India connections
- `src/components/IndiaDotsMap.tsx` — no change (used elsewhere)

