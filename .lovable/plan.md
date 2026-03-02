

## Problem

The India map in the Global Reach section looks crude and unappealing. From the screenshot:
- The outline is too thick and heavy with excessive glow, creating a rough, bloated appearance
- City dots are oversized relative to the map when zoomed in
- The orange fill is too opaque, making India look like a solid blob rather than an elegant outline
- Labels crowd the map, especially at the zoomed-in India phase

## Plan

### 1. Refine the India outline in `IndiaStatesMap.tsx`
- Reduce glow layer `strokeWidth` from `0.6` to `0.3`
- Reduce crisp outline `strokeWidth` from `0.3` to `0.15`
- Lower fill opacities: glow fill `0.08` → `0.04`, crisp fill `0.12` → `0.06`
- Lower glow stroke opacity from `0.15` to `0.08`
- Lower crisp stroke opacity from `0.6` to `0.35`

### 2. Scale down city markers in `IndiaStatesMap.tsx`
- Tier 1: outer circle `r=2` → `r=1.2`, inner dot `r=0.8` → `r=0.5`, ping `r=0.8` → `r=0.5`
- Tier 2: outer circle `r=1.2` → `r=0.7`, inner dot `r=0.5` → `r=0.3`
- Reduce label font sizes: Tier 1 from `2/2.5` to `1.5/1.8`, Tier 2 from `2` to `1.4`
- Adjust label offset (y - 3 → y - 2 for tier 1, y - 2 → y - 1.2 for tier 2)

### 3. Soften the `india-glow` filter in `GeoReachScene.tsx`
- Reduce `stdDeviation` from `2` to `1`

All changes across two files: `IndiaStatesMap.tsx` and `GeoReachScene.tsx`.

