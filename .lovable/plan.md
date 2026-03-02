

## Plan: Redesign ImpactBentoGrid with India Dot Map

### Overview
Three deliverables: (1) new `IndiaDotsMap.tsx` SVG component, (2) restructured grid layout in `ImpactBentoGrid.tsx`, (3) CSS keyframes for dot animations.

### 1. New file: `src/components/IndiaDotsMap.tsx`

A pure SVG component (~75 dots) positioned to form the recognizable shape of India within a `viewBox="0 0 200 280"`. Key city clusters (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Jaipur, etc.) get slightly larger dots. International presence shown as 5-6 labeled dots around the perimeter (UAE, US, UK, Singapore, etc.) with faint connecting arcs.

- Dots use framer-motion `m.circle` with `staggerChildren` (0.015s) for a ripple-in effect from center outward
- On card hover: dots pulse with amber glow via CSS animation
- Dots colored in `hsl(var(--primary))` with varying opacity for depth
- Country dots in a muted tone with tiny 4px text labels

### 2. Restructured `src/components/ImpactBentoGrid.tsx`

New grid layout (desktop):

```text
┌─────────────┬──────────────────────┬─────────────┐
│  4.86/5     │                      │  58,746     │
│  Rating     │   Community Mosaic   │  Learners   │
│  Stars      │   300,000+           │  (orange)   │
│  (dark)     │   (spans 2 rows)     │             │
├─────────────┤                      ├─────────────┤
│  821 Cities │                      │  3,000+     │
│  13 Countries                      │  Collabs    │
│  India Map  │                      │  Handshake  │
│  (dark)     │                      │  (dark)     │
└─────────────┴──────────────────────┴─────────────┘
```

- Grid: `grid-cols-1 md:grid-cols-[1fr_1.6fr_1fr]`
- Community mosaic moves to center, spans 2 rows -- it's the visual anchor with the photo grid
- Cities/Countries card switches from orange to dark theme, uses `IndiaDotsMap` instead of the `Globe` icon
- Add "OUR IMPACT" section label above the grid (uppercase, tracking-widest, muted text)
- Remove `Globe` import from lucide-react
- Mobile: single column stack, all cards full width

Card order in markup:
1. Rating (top-left)
2. Community mosaic (center, `row-span-2`)
3. Learners (top-right, orange)
4. Cities/Countries with India map (bottom-left, dark)
5. Collaborations (bottom-right, dark)

### 3. CSS additions in `src/index.css`

```css
@keyframes dot-breathe {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}
```

Remove the now-unused `globe-spin` keyframes and classes.

### Technical Details

- India dot coordinates: ~75 `[cx, cy]` pairs hardcoded, grouped by region with a `delay` index for stagger ordering (center-out ripple)
- No external map libraries -- pure SVG circles
- The map component accepts an `isHovered` prop to trigger the breathing animation
- Country arcs: simple quadratic bezier `<path>` elements with low opacity

