

## Award-Winning Bento Grid Interactions

### Current state
The cards have basic `FadeInSection` entrance + uniform `scale: 1.015, y: -2` hover. Stars are static. Community mosaic is inert. Globe icon is static. Counter just counts up with no celebration. Every card behaves identically. Nothing feels "award-winning."

### Design philosophy
Each card gets a **unique signature interaction** that reinforces its content. No two cards should feel the same.

### Card-by-card upgrades

**Card 1 — Rating (4.86/5)**
- Stars animate in sequentially on scroll reveal (stagger 120ms each, scale from 0 + rotate) using Framer Motion `m.div` with `whileInView`
- On hover: stars gently pulse (a subtle `scale` keyframe loop), and the 5th partial star "fills up" from 60% to 100% opacity
- Counter gets the existing `counter-celebrate` bounce class once counting finishes

**Card 2 — Paid Learners (58,746)**
- Photo overlay does a slow, continuous `scale(1.05) → scale(1)` Ken Burns drift (CSS animation, 12s infinite alternate)
- On hover: the number text gets a brief shimmer sweep (reuse `badge-shimmer` pattern adapted for text)
- Noise texture subtle flicker via opacity animation

**Card 3 — Community (300,000+ mosaic)**
- Each mosaic photo tile gets a staggered scale-in entrance (Framer `whileInView`, stagger 60ms per tile, scale from 0.8 + opacity 0)
- On hover over the card: mosaic photos subtly shift/parallax — each tile translates slightly based on its grid position (CSS transition, creating a "breathing" feel)
- Orange overlay opacity reduces further on hover (0.30 → 0.15) revealing more of the photos

**Card 4 — Cities/Countries (821 / 13+)**
- Globe icon: continuous slow rotation (CSS `animate-spin` at 30s duration) — "always spinning"
- On hover: Globe rotation speeds up (8s), and a subtle ring/pulse radiates outward from the globe
- The two counters (cities, countries) animate sequentially — cities first, then countries 400ms later

**Card 5 — Collaborations (3,000+)**
- Handshake icon: on scroll reveal, animates with a "shake" — rotate(-10deg) → rotate(10deg) → settle, giving it a literal handshake motion
- On hover: icon subtly repeats the handshake wiggle
- Counter celebrate bounce on completion

### Technical approach
- All per-card animations use Framer Motion (`m.div`, `m.span`, `variants`, `whileInView`, `whileHover`)
- CSS keyframes added to `index.css` for: `ken-burns`, `globe-spin`, `handshake-wiggle`, `star-pulse`
- `AnimatedCounter` gets an optional `onComplete` callback to trigger celebrate class
- Community mosaic tiles wrapped in `m.div` with stagger via `variants` + `staggerChildren`

### Files to edit
1. `src/components/ImpactBentoGrid.tsx` — per-card unique animations, hover states, mosaic stagger
2. `src/index.css` — new keyframes (`ken-burns`, `globe-spin`, `handshake-wiggle`, `star-pulse`)
3. `src/components/AnimatedCounter.tsx` — add `onComplete` callback + celebrate class support

