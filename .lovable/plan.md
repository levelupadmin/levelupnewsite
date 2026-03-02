

## ImpactBentoGrid Full-Width Immersive Revamp

### Vision

Replace the current static 5-card bento grid with a **sequential, scroll-triggered immersive experience** where each stat reveals cinematically as the user scrolls. Think Apple product pages meets film credits — full-width treatments, dramatic counter animations, particle effects, and layered depth. Each stat becomes a "scene" in a story about LevelUp's impact.

### Architecture: 5 Scenes, Full-Width

Each scene fills the viewport width and uses a combination of animated backgrounds, counters, and micro-interactions. Scenes stack vertically and reveal via `IntersectionObserver` (using the existing `FadeInSection` pattern).

```text
┌──────────────────────────────────────────────┐
│ SCENE 1: RATING (4.86/5)                     │
│ ┌──────────────────────────────────────────┐  │
│ │  5 stars ignite left-to-right            │  │
│ │  Giant counter animates to 4.86          │  │
│ │  Rolling review snippets scroll behind   │  │
│ │  Subtle film grain + warm radial glow    │  │
│ └──────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ SCENE 2: COMMUNITY (3,00,000+)               │
│ ┌──────────────────────────────────────────┐  │
│ │  Community photos as floating particles  │  │
│ │  that drift and cluster on scroll        │  │
│ │  Giant counter with amber glow pulse     │  │
│ │  "Community" label fades in below        │  │
│ └──────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ SCENE 3: LEARNERS (58,746)                   │
│ ┌──────────────────────────────────────────┐  │
│ │  Orange-dominant scene, Ken Burns drift  │  │
│ │  on a community photo background         │  │
│ │  Counter with shimmer text effect        │  │
│ │  Subtle enrollment ticker animation      │  │
│ └──────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ SCENE 4: GEOGRAPHIC REACH (821 cities, 13+)  │
│ ┌──────────────────────────────────────────┐  │
│ │  Full-width India dot map (SVG)          │  │
│ │  Dots ripple in from center (Nagpur)     │  │
│ │  International arcs draw themselves      │  │
│ │  Ping pulses on major cities             │  │
│ │  Stats overlay at bottom                 │  │
│ └──────────────────────────────────────────┘  │
├──────────────────────────────────────────────┤
│ SCENE 5: COLLABORATIONS (3,000+)             │
│ ┌──────────────────────────────────────────┐  │
│ │  Network graph visualization — nodes     │  │
│ │  connected by animated lines             │  │
│ │  Handshake icon with wave animation      │  │
│ │  Counter + "collaborations enabled"      │  │
│ └──────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Files to Create / Modify

**New files:**
1. `src/components/impact/ImpactScene.tsx` — Shared scene wrapper (full-width, IntersectionObserver reveal, ambient glow, film grain overlay)
2. `src/components/impact/RatingScene.tsx` — Star ignition + rolling reviews + giant counter
3. `src/components/impact/CommunityScene.tsx` — Floating photo particles + giant counter
4. `src/components/impact/LearnersScene.tsx` — Orange scene with Ken Burns + shimmer counter
5. `src/components/impact/GeoReachScene.tsx` — Full-width India map with ripple + international arcs + city pings
6. `src/components/impact/CollaborationsScene.tsx` — Animated network graph + handshake + counter
7. `src/components/impact/NetworkGraph.tsx` — SVG network visualization with animated connections

**Modified files:**
1. `src/components/ImpactBentoGrid.tsx` — Replace entirely with the new `ImpactImmersive` component that composes all 5 scenes
2. `src/index.css` — Add new keyframes (star-ignite, photo-drift, city-ping, network-pulse, review-scroll)

### Scene Details

**Scene 1 — Rating (4.86/5)**
- Background: Subtle warm dark gradient with film grain overlay
- Stars appear one by one with a spring "ignite" animation (scale from 0 + golden glow burst)
- Behind the counter: 3-4 real review snippets scroll upward in a faded column (like credits), giving social proof depth
- Counter: oversized (text-7xl+), animates from 0 to 4.86 with the existing `AnimatedCounter`
- On hover: stars pulse in sequence

**Scene 2 — Community (3,00,000+)**
- Background: 9 community photos arranged in a loose mosaic that "breathes" — tiles shift slightly with a gentle CSS animation
- A warm amber color overlay with multiply blend
- Counter: massive, with a subtle glow pulse animation behind it
- Label fades in 200ms after counter completes

**Scene 3 — Learners (58,746)**
- Background: One of the community photos with Ken Burns slow zoom, tinted orange with `mix-blend-mode: multiply`
- Film grain + noise overlay
- Counter: large white text with a CSS shimmer sweep effect on completion
- Below: a subtle "enrollment ticker" showing program names cycling

**Scene 4 — Geographic Reach (821 cities, 13+ countries)**
- Full-width rendering of the existing `IndiaDotsMap` SVG, scaled up
- Dots ripple in from center with staggered delays (existing animation, enhanced)
- International connection arcs draw themselves with `pathLength` animation
- Major cities get a pulsing ping ring
- Stats (821 cities, 13+ countries) positioned as an overlay with counters

**Scene 5 — Collaborations (3,000+)**
- Background: animated network graph — 12-15 nodes connected by thin animated lines that draw in
- Nodes glow on appearance, connections animate with dashed stroke
- Central handshake icon with the existing shake animation
- Counter at bottom with "collaborations enabled"

### Interaction & Animation Standards
- All scenes use `IntersectionObserver` via `FadeInSection` or `useScrollReveal` — animations trigger once on scroll into view
- Pause-on-hover for any looping animations (consistent with existing standards)
- Film grain overlay (existing `.noise-overlay` pattern) on every scene
- Warm hue-22 palette throughout — no neutral blacks
- All motion uses the established cubic-bezier `[0.16, 1, 0.3, 1]` easing
- Each scene has ~200-280px height on mobile, ~320-400px on desktop
- Scenes are separated by subtle accent lines (existing `AccentLine` component)

### Component Size
Each scene component targets <120 lines. Shared utilities (ImpactScene wrapper, NetworkGraph) handle layout and ambient effects to avoid duplication.

