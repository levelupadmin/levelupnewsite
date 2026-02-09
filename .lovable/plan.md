

# Hero Background — Exact Reference Match (Final Tuned Version)

## What the reference image shows (precise breakdown)
The reference has a very specific look: a dark base with a **large, prominent smoky/foggy bloom** in the center-upper area, **clearly visible film grain** across everything, **faint thin grid lines**, and **tiny scattered white dots**. The center bloom is the most defining feature — it's a large, soft, lighter area that makes the middle significantly brighter than the edges.

## Changes (single file: `src/components/HeroSection.tsx`)

### Layer 1: Faint grid lines (NEW — add before star dots)
Add a thin crosshatch grid with very fine lines. These are barely visible but add texture depth.
- Line width: `0.5px`
- Color: `hsla(0,0%,100%,0.06)` (6% white — extremely subtle)
- Spacing: `48px`

### Layer 2: Star dots (KEEP current — already good)
The 8-layer scattered radial-gradient dots stay exactly as they are.

### Layer 3: Grain texture (MODIFY — boost significantly)
The reference has very prominent, clearly visible grain. Current `0.35` opacity is not enough.
- Increase opacity from `0.35` to `0.55`
- Keep `mix-blend-soft-light`
- Reduce `baseFrequency` from `0.65` to `0.55` for coarser, more visible grain particles
- Keep `numOctaves='4'`
- Increase `backgroundSize` from `200px` to `256px` for less tiling repetition

### Layer 4: Primary center bloom (MODIFY — dramatic boost)
This is the key layer that makes or breaks the reference match. Currently way too subtle.
- Change opacity from `0.12` to `0.35`
- Change color from `hsl(220 10% 20%)` to `hsl(220 6% 40%)` (much lighter, more visible)
- Change ellipse from `70% 50% at 50% 30%` to `100% 80% at 50% 30%` (much larger, fills more of the center)
- Change transparent stop from `70%` to `80%` (softer falloff)

### Layer 5: Secondary warm atmospheric haze (NEW)
The reference has a warm, slightly brownish tone in the bloom. Add a second glow layer:
- `radial-gradient(ellipse 130% 90% at 50% 25%, hsla(30,8%,35%,0.18) 0%, transparent 55%)`
- This adds the warm cloudy/foggy quality seen in the reference

### Layer 6: Vignette (MODIFY — darken edges more)
The reference has very dark corners. Tighten the vignette:
- Change transparent stop from `35%` to `20%`
- Change dark color from `hsl(220 12% 5%)` to `hsl(220 12% 3%)` (nearly black)

## Summary of all values (final tuned)

| Layer | Opacity | Key params |
|-------|---------|------------|
| Grid | 6% white | 0.5px lines, 48px spacing |
| Star dots | 15-40% per dot | 8 layers, varied sizes (unchanged) |
| Grain | 55%, soft-light | baseFrequency 0.55, 256px tiles |
| Primary bloom | 35% | hsl(220 6% 40%), 100% x 80% ellipse |
| Warm haze | 18% | hsla(30,8%,35%), 130% x 90% ellipse |
| Vignette | full | transparent at 20%, fades to hsl(220 12% 3%) |

## Why this will match
- The **primary bloom at 35% opacity with a much lighter color** creates the prominent smoky center that defines the reference
- The **secondary warm haze** adds the brownish warmth visible in the reference
- **Grain at 55%** with coarser frequency makes it clearly visible like the reference
- **Tight vignette at 20%** darkens corners aggressively to match
- The grid and dots add the subtle texture detail layer

