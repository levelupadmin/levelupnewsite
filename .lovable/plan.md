

## Problem

The current Global Reach scene uses a complex multi-phase SVG world map with animated viewBox zooming, India outline paths, city dots, and international arcs. It's been difficult to get the India outline accurate, and the overall effect isn't landing visually.

## Proposed Alternative: Animated Concentric Rings + Stat Cards

Replace the map entirely with a **radial expansion** concept — a cinematic, abstract visualization that communicates geographic reach without needing geographic accuracy.

### Visual Concept

```text
┌─────────────────────────────────────────────┐
│          "Global Reach"  (label)            │
│                                             │
│    "From 821 Cities to 13+ Countries"       │
│         (gradient heading)                  │
│                                             │
│              ╭─────────╮                    │
│          ╭───┤  INDIA  ├───╮                │
│      ╭───┤   ╰─────────╯   ├───╮           │
│  ╭───┤    ring 2 (states)    ├───╮          │
│  │    ring 3 (cities)             │         │
│  │     ring 4 (countries)         │         │
│  ╰────────────────────────────────╯         │
│                                             │
│   ┌──────┐  ┌──────┐  ┌──────┐             │
│   │ 821  │  │  28  │  │ 13+  │             │
│   │cities│  │states│  │ctry  │             │
│   └──────┘  └──────┘  └──────┘             │
│                                             │
│   City pills: Mumbai · Delhi · Bengaluru…   │
│   Country flags: 🇦🇪 🇬🇧 🇺🇸 🇸🇬 🇦🇺 🇨🇦       │
└─────────────────────────────────────────────┘
```

### How It Works

1. **Central hub** — A glowing branded dot in the center labeled "India" with a heartbeat pulse animation
2. **Expanding concentric rings** — 3-4 rings that ripple outward on scroll-reveal, each representing a layer of reach (states → cities → countries). Rings use soft gradient strokes with staggered animation delays
3. **Floating city/country pills** — Small pill badges orbit or float around the rings. Indian cities on inner rings, international cities (with flag emoji) on outer rings. These fade in with stagger
4. **Big stat numbers** — Three large animated counters below (821 Cities, 28 States, 13+ Countries) using the existing `AnimatedCounter` component
5. **Subtle particle dots** — Tiny dots scattered along the rings that breathe/pulse, suggesting data points

### Why This Is Better

- No geographic accuracy issues — abstract visualization sidesteps the India outline problem entirely
- Simpler code — no SVG path data, no viewBox animation, no coordinate mapping
- More visually striking — concentric rings with glowing gradients look premium and cinematic
- Faster to render — pure CSS/SVG circles instead of complex path data
- Mobile-friendly — scales naturally without needing separate mobile viewBox calculations

### Implementation Plan

1. **Rewrite `GeoReachScene.tsx`** — Replace the entire map SVG with the concentric rings layout. Use simple SVG circles with CSS animations for the rings, Framer Motion for staggered pill reveals
2. **Add ring animations to `index.css`** — Keyframes for ring expansion, pulse, and pill float
3. **Remove unused dependencies** — Delete imports of `worldMapData.ts`, `IndiaStatesMap.tsx`, `world-map.svg`. These files can stay but won't be imported by the scene anymore
4. **Data** — Reuse existing city/country data from `worldMapData.ts` for the pill labels and flags, or inline a simpler list

### Technical Details

- Rings: 3-4 `<circle>` elements with `stroke-dasharray` animation, gradient strokes via `<linearGradient>`
- City pills: Absolutely positioned `<div>` elements arranged in a circle using `transform: rotate(Xdeg) translateX(Rpx) rotate(-Xdeg)`
- Stats: Reuse existing `AnimatedCounter` component
- Animation trigger: Reuse existing `useScrollReveal` hook
- All within the existing `ImpactScene` wrapper — no structural changes to the section system

