

## Plan: Add Particle Constellation Canvas to CredibilityCues

### What
Add an interactive Canvas-based particle field behind the stats section. ~40 amber/white particles drift organically, connect with faint lines when near each other, and repel from the cursor with a warm radial glow.

### Implementation

**1. Create `src/components/CredibilityParticles.tsx`**
- Canvas component with ~40 particles (80% white, 20% amber, sizes 1–3px)
- Seeded random positions for consistency
- Organic drift via sine-wave motion (`requestAnimationFrame`)
- Proximity lines: faint connections between particles within ~80px (opacity ~0.08)
- Cursor repulsion: particles push away within ~120px radius
- Warm radial glow follows cursor (`hsla(24, 95%, 58%, 0.08)`)
- DPR-aware resize handling
- Edge fade via CSS mask so particles dissolve at section boundaries
- Overall container opacity ~0.3 to not overpower stats text

**2. Update `src/components/CredibilityCues.tsx`**
- Replace the static dot-grid `div` overlay with `<CredibilityParticles />`
- Keep existing layout, counters, and fade-in sections unchanged

### Technical Notes
- Pattern follows existing `CollabNetwork.tsx` (Canvas + rAF + mouse tracking + seeded random)
- Lightweight: no extra dependencies, ~120 lines
- Intersection Observer not needed here since parent `FadeInSection` already handles visibility

