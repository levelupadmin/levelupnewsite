
## Visual UX Audit — GeoReach "India to World" Narrative

### What is currently breaking immersion (priority order)
1. India silhouette is not clearly recognizable in Phase 1.
- What user sees: glowing fragments, not one coherent India.
- Why confusing: narrative promise is “India lights up,” but viewer first has to decode abstract polygons.
- Root cause: only per-state paths are rendered; no persistent outer national contour/coastline anchor.

2. India drifts/misaligns during Phase 1→2 transition.
- What user sees: state cluster appears to land over another country.
- Why confusing: story continuity breaks (“this is India”) and trust drops.
- Root cause: zoom/pan applied via CSS `style.transform` on SVG `<g>` with pixel-like values while map content is in SVG user coordinates/viewBox; coordinate systems are mixed.

3. World alignment relies on one hardcoded India center.
- What user sees: arcs/hub can feel slightly off from actual India location.
- Why confusing: users perceive geographic inaccuracy instantly in map narratives.
- Root cause: single `INDIA_CENTER` constant + manual `WORLD_TX/WORLD_TY` calibration, not geometry-anchored to actual India path bounds in the world SVG.

4. Phase timing is rigid, not perception-driven.
- What user sees: transitions continue even if user is still decoding Phase 1.
- Why confusing: user misses the “state-wise” story and perceives it as rushed animation.
- Root cause: fixed `setTimeout` sequencing (3s/4.5s) without readiness gate, replay logic, or slow-device adaptation.

5. Label density creates clutter in Phase 1.
- What user sees: many names + counts competing with state lighting.
- Why confusing: eye cannot prioritize map shape vs dots vs text.
- Root cause: city labels and learner counts appear broadly at similar visual weight; no hierarchy by zoom level/region.

6. Visual style mismatch between India layer and world layer.
- What user sees: India is vector paths, world is a flat `<image>` with opacity fade.
- Why confusing: the scene looks composited from different systems, not one map.
- Root cause: raster-like world image treatment + inability to style individual countries in the same semantic SVG layer.

7. Mobile introduces additional transform instability.
- What user sees: jumpiness/repositioning around entry and transition.
- Why confusing: narrative feels “buggy,” not cinematic.
- Root cause: `useIsMobile()` resolves after mount, so transform preset can switch after initial render.

### Why this is confusing for the audience (experience impact)
- Identity loss: if India shape is not instantly legible, Phase 1 message fails.
- Spatial discontinuity: if India “teleports,” the brain treats Phase 2 as unrelated shot.
- Cognitive overload: too many simultaneous signals (state glow + labels + metrics).
- Credibility gap: geographic mismatch undermines “821 cities, 13+ countries” claim.
- Emotional drop: cinematic build-up gets interrupted by mechanical timing artifacts.

### Concise remediation plan (seamless version)
1. Lock geography first
- Add a persistent India outer contour path behind state paths (always visible at low opacity).
- Calibrate India layer to world map using one shared SVG coordinate system only (no CSS pixel transform on `<g>`).

2. Fix transform architecture
- Animate via SVG `transform` values in user units (or animate a wrapper group with consistent viewBox math).
- Compute target India anchor from actual world SVG India geometry (centroid/bbox), not manual constants.

3. Improve Phase 1 readability
- State glow first, then dots, then only top-tier labels initially.
- Delay full learner-count labels until the tail end of Phase 1 (or on hover/tap).

4. Make phase transitions perceptually smooth
- Use overlap windows (India still visible while world fades in).
- Start arc draw only after India has settled into exact world position.

5. Mobile-first stabilization
- Resolve viewport preset before animation starts.
- Reduce label count and stroke complexity on mobile to keep map legible.

### Technical details (implementation guidance)
- Current problematic areas: `GeoReachScene.tsx` transform math and timing state-machine, `IndiaStatesMap.tsx` lack of national boundary path, mixed map rendering approach (`<image href={worldMapUrl}>` vs semantic paths).
- Key fix direction:
  - Replace CSS pixel transform strategy with SVG-user-unit transform pipeline.
  - Introduce `INDIA_OUTLINE_PATH` and render it persistently under state paths.
  - Introduce phase substates (`1a states`, `1b dots`, `1c labels`) instead of one Phase-1 burst.
  - Replace hardcoded India target with geometry-derived anchor.
- Validation criteria:
  - India never leaves India during transition.
  - First 1 second: India instantly recognizable before any label clutter.
  - Phase 1→2 perceived as one camera move, not element teleport.
  - Mobile retains legibility without overlap collisions.
