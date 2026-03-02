

## Vision: India-Centered Narrative World Map

The current implementation uses a standard Mercator world map SVG with India positioned off to the right side. The user wants India as the **focal center** of the visualization, with global locations radiating outward, and a richer narrative storytelling approach.

### Current Problems
- India is not centered — it sits at ~70% from the left edge of a standard world map
- The visualization is passive — dots and arcs appear but don't tell a story
- No sequential narrative — everything appears roughly simultaneously
- The base world map SVG dominates visually, diluting the India focus

### Proposed Redesign: Hub-Spoke Radial Layout

Replace the standard world map with a **custom India-centered composition**:

```text
                    Toronto · 75
                        ○
           London · 85  |
               ○────────┐
                        │
    NY · 120+ ○─────────┤
                        │
                   ┌────┼────┐
    LA · 110+ ○────┤  INDIA  ├────○ Singapore · 95
                   │  (large │
                   │  detail │
                   │   map)  │
                   └────┬────┘
                        │
              Dubai ○───┘────○ Sydney · 60
               180+
```

**Key layout change**: India's detailed dot-map (from `IndiaDotsMap.tsx`) sits large and centered. International cities orbit around it as nodes on curved arcs, positioned by their real-world compass direction relative to India (London = upper-left, Singapore = right, Sydney = lower-right, etc.).

### Narrative Sequence (scroll-triggered, ~4s total)

| Phase | Timing | What Happens |
|-------|--------|-------------|
| 1. "The Hub" | 0–1s | India dot-map fades in at center with heartbeat pulse at Nagpur. Radial glow expands. |
| 2. "India Lights Up" | 1–2s | Indian city dots ripple outward from center (existing stagger). City labels fade in. Internal arcs draw between cities. |
| 3. "Going Global" | 2–3.5s | International arcs draw outward from India one by one. Traveling dots begin their journeys. International city nodes appear at arc endpoints with learner counts. |
| 4. "Always Connected" | 3.5s+ | Continuous: heartbeat pulse, traveling dots loop, subtle breathing on India dots. Stats counter animates below. |

### Visual Enhancements

1. **India-centered viewBox**: Custom SVG viewBox where India occupies ~40% of the center area. International cities positioned at compass-accurate angles but at fixed radial distances from India center.

2. **Concentric range rings**: Faint dashed circles at 2 radii around India (like radar), reinforcing the "hub" metaphor. Fade in during Phase 1.

3. **Arc trail glow**: Each traveling dot leaves a brief fading trail (SVG gradient along the path that follows the dot), creating a comet-tail effect.

4. **City reveal animation**: International city nodes scale up from 0 with a bounce ease when their arc reaches them, rather than just fading in.

5. **Active hover state**: Hovered city shows a tooltip card with city name + learner count + a mini flag emoji. The arc to that city brightens. On mobile, tap toggles.

6. **Ambient particle field**: Very sparse, slow-drifting tiny dots in the background (like stars/dust) to add depth without distraction.

### Technical Approach

**Files to change:**
- `src/components/impact/GeoReachScene.tsx` — Full rewrite of the SVG composition. Remove `WorldMapSvg` import. Use `IndiaDotsMap` (modified) as the center piece. Position international cities in a radial layout with custom viewBox.
- `src/components/IndiaDotsMap.tsx` — Minor tweaks to work as an embedded SVG `<g>` element rather than standalone `<svg>`, so it can be composed inside the parent SVG.
- `src/index.css` — Add new keyframes: range-ring fade, comet-trail, city-bounce-in, ambient particle drift. Update existing impact keyframes as needed.
- `src/components/impact/worldMapData.ts` — Update international city positions to radial coordinates centered on India.

**No new dependencies needed.** Pure SVG + CSS animations + existing scroll-trigger infrastructure.

### Mobile Considerations
- India map scales down but remains centered and readable
- International city labels hidden on mobile, only dots + learner counts shown
- Range rings hidden on mobile to reduce clutter
- Tap-to-reveal tooltips preserved

