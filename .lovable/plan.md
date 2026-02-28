

## Plan: Revamp the Impact Stats Section

### What's changing
Replace the current `StudentLogosSection` top half (headline + 2 stats + CTA link, lines 54-98) with a bento-grid layout inspired by the reference image. The logo marquee below stays untouched.

### Layout (Bento Grid)

```text
Desktop (md+):
┌──────────┬────────────────┬──────────┐
│  4.86/5  │   58,746       │ 300,000+ │
│  rating  │  paid learners │community │
│  (cream) │  (orange+photo)│(photo    │
│          │                │  grid)   │
├──────────┼────────────────┤          │
│ 821 cities│  3000+         │          │
│ 13+ ctry  │collaborations │          │
│ (orange)  │  (cream)      │          │
└──────────┴────────────────┴──────────┘

Mobile:
2-column grid, community card spans full width at bottom
```

### Cards
1. **Rating card** (cream/warm bg, orange border) — star icon + "4.86/5" animated counter + "average rating across 9,000 learners"
2. **Paid learners card** (orange bg, overlay photo from community images) — "58,746" animated counter + "paid learners"
3. **Community card** (tall, right column spanning 2 rows) — photo grid mosaic of community images with orange overlay + "300,000+" counter + "community"
4. **Cities/Countries card** (orange bg) — "821 cities | 13+ countries" with a subtle dotted globe SVG decoration
5. **Collaborations card** (cream bg, orange border) — collaboration icon + "3000+" counter + "collaborations enabled"

### Technical approach
- New component: `src/components/ImpactBentoGrid.tsx`
- Uses `AnimatedCounter` for all numbers
- Uses `FadeInSection` for staggered entrance animations
- Cards use framer-motion `whileHover` for subtle scale/shadow micro-interactions (award-worthy feel)
- Community photo grid card uses 4x3 grid of community images with an orange color overlay (`mix-blend-mode: multiply`)
- Cream cards: `bg-[hsl(24,40%,96%)]` with `border border-primary/30 rounded-xl`
- Orange cards: `bg-primary text-primary-foreground rounded-xl`
- CSS Grid layout: `grid-cols-3` on desktop with the right column `row-span-2`
- Mobile: `grid-cols-2` with adjusted spans
- Replaces lines 54-98 of `StudentLogosSection.tsx` (everything above the logo marquee)
- Star icon from Lucide (`Star`)
- Collaboration icon from Lucide (`Handshake` or `Users`)

### Animations & interactivity
- Each card fades up with staggered delays via `FadeInSection`
- Counters animate on scroll into view (existing `AnimatedCounter`)
- Cards have `whileHover={{ scale: 1.02, y: -4 }}` with spring transition
- Subtle hover glow shadow matching the site's existing interactive glow pattern
- Community photo grid has a slow CSS `animation` that subtly shifts/pans the mosaic

### Files to create/edit
1. **Create** `src/components/ImpactBentoGrid.tsx` — the new bento grid component
2. **Edit** `src/components/StudentLogosSection.tsx` — replace the top section (lines 54-98) with `<ImpactBentoGrid />`

