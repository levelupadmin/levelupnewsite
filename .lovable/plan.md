

## Problems Identified

From the screenshot, the current map has major visual issues:

1. **International cities barely visible** — tiny dots at edges, labels either not rendering or too faint (arc-draw animation ends at `opacity: 0.15`, label-fade ends at `opacity: 0.75` but font is tiny `9px`)
2. **Range rings invisible** — `range-ring-fade` animates to `opacity: 0.12` which is nearly invisible on dark backgrounds, and animates `r` from 0 which doesn't work on SVG circle elements
3. **Arcs too faint** — arc gradient ends at `stopOpacity="0.05"`, arc-draw animation ends at `opacity: 0.15`
4. **City bounce-in uses CSS `transform: scale()`** — this doesn't work reliably on SVG `<g>` elements without proper `transform-origin` in SVG coordinate space
5. **Ambient particles drift via CSS `transform: translate()`** — also unreliable on SVG elements
6. **No section heading** — jumps straight into the SVG with no context
7. **India dot-map is too small** relative to the viewBox — the dots cluster in a small area
8. **No visual hierarchy** — everything is the same muted color, no differentiation between India (primary) and international (secondary)

## Redesign Plan

### 1. Fix worldMapData.ts — Better Radial Positioning
- Spread international cities more evenly at larger, more visible distances
- Keep them within the `900×600` viewBox but closer to the edges for drama

### 2. Rewrite GeoReachScene.tsx — Cleaner, Bolder Composition
- Add section heading ("Our Global Reach") above the SVG
- **Scale up India** by applying a larger transform scale to the IndiaDotsMap `<g>`
- Replace CSS-based animations on SVG elements with **SVG-native animations** (`<animate>`, `<set>`) where CSS transforms fail
- Make range rings use `<animate attributeName="r">` instead of CSS
- Make city nodes use `<animate attributeName="opacity">` instead of `animate-city-bounce-in`
- **Brighter arcs**: increase gradient end opacity from `0.05` to `0.25`, arc-draw end opacity from `0.15` to `0.4`
- **Brighter labels**: increase font size to `11px`, use `fill="hsl(var(--foreground))"` instead of muted
- Add a subtle **India silhouette glow** — a larger blurred circle behind the dot map
- Add a **"Spreading from India"** text label near the center
- Improve tooltip styling with better padding and contrast

### 3. Update CSS Keyframes in index.css
- Fix `range-ring-fade` — remove `r: 0` (doesn't work), just animate opacity from 0 to 0.2
- Increase `impact-arc-draw` end opacity to `0.4`
- Increase `impact-internal-arc` end opacity to `0.5`
- Remove `ambient-particle` CSS transform animation (replace with SVG `<animateMotion>`)
- Fix `city-bounce-in` — simplify to just opacity fade since CSS scale on SVG `<g>` is unreliable

### 4. Files Changed
- `src/components/impact/worldMapData.ts` — adjusted city positions
- `src/components/impact/GeoReachScene.tsx` — full visual overhaul
- `src/index.css` — fixed keyframes

