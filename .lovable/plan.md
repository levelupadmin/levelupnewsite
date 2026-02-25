

## Swap Stats and Carousel Order in Forge Section

Currently the order inside the Forge section is:
1. Feature points (3-column grid) — lines 178-191
2. Stats (7 Cities, 11 Editions, 248 Shortfilms) — lines 193-205, inside the `FadeInSection`
3. Carousel — lines 208-290, outside the `FadeInSection`

### Change

Move the **stats block** (lines 193-205) to **after the carousel and dots** (after line ~290), and move the **carousel block** up to where the stats currently are.

Concretely:
- End the `FadeInSection` right after the feature points grid (line 191)
- Place the carousel block immediately after
- Place the stats block after the carousel dots

This puts them in the order: Features → Carousel → Stats.

Single file edit in `src/components/ForgeSection.tsx`, no new dependencies.

