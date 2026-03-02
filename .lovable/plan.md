

## Problem

The Global Reach section has several visual issues making it look crude:
- Arc connection lines are too thick (strokeWidth 1.5) creating ugly ribbon-like bands, especially the long Sydney arc
- Traveling dots along arcs are too large (r=2.5) with heavy glow
- International city markers are oversized (r=4 inner dot, r=7 outer ring)
- The gradient on arcs creates a solid ribbon appearance instead of elegant lines

## Plan

### 1. Refine arc strokes in `GeoReachScene.tsx`
- Reduce `strokeWidth` from `1.5` to `0.8`
- Change `strokeDasharray` from `"6 4"` to `"4 3"` for finer dashes
- Reduce traveling dot radius from `2.5` to `1.5`
- Remove the heavy `filter="url(#geo-glow)"` from traveling dots (or reduce stdDeviation)
- Reduce gradient stop opacities for subtler arcs (0.8→0.5, 0.2→0.08)

### 2. Scale down international city markers
- Reduce outer ring radius from `7`/`10` to `5`/`7`
- Reduce inner dot radius from `4` to `2.5`
- Reduce ping ring radius from `4` to `2.5`
- Reduce stroke widths proportionally
- Scale down font sizes from `10`/`8` to `9`/`7`

### 3. Reduce glow filter intensity
- Reduce `geo-glow` stdDeviation from `3` to `1.5` for subtler effect

All changes in `src/components/impact/GeoReachScene.tsx`.

