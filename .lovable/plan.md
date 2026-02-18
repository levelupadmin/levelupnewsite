

## Community Section: Full-Viewport Orbiting Layout

### What changes

1. **Expand the concentric ovals to fill the viewport** -- The container will go from a capped `max-w-[900px]` box to a near-full-screen layout (~90vw x 80vh), so the rings stretch edge-to-edge.

2. **Center content = text + CTA only** -- Remove the stats grid from the center. The core will contain only the label, headline, paragraph, and CTA button, giving it room to breathe.

3. **Stats become orbiting elements** -- Each of the 4 stat counters (12,000+ Members, 850+ Projects, etc.) will be positioned on the rings alongside the avatars, styled as small floating "pill" cards. They'll be placed on the inner rings for prominence and spaced evenly so they don't overlap with avatar clusters.

4. **Ring radii scale up** -- The `rx`/`ry` values will increase so the outermost ring nearly touches the viewport edges. Approximate new values:
   - Ring 0 (innermost): rx ~30%, ry ~25%
   - Ring 1: rx ~38%, ry ~32%
   - Ring 2: rx ~46%, ry ~40%
   - Ring 3 (outermost): rx ~54%, ry ~48%

5. **Avatar angles re-distributed** -- With stats now occupying ring positions, avatar angles will be adjusted slightly to avoid collisions.

### Technical details

**File: `src/components/CommunitySection.tsx`**

- Change the outer container from `max-w-[900px] aspect-[9/7]` to `w-[90vw] max-w-[1200px] h-[80vh] min-h-[600px]` so it scales with the viewport.
- Update `containerW` / `containerH` to `1200` / `800` for the SVG viewBox.
- Remove the stats `<div className="grid grid-cols-4 ...">` from the center content block.
- Add a new `orbitingStats` array, each with a `ring`, `angle`, `target`, `suffix`, `label`, and `hasComma` property.
- Render each stat as a positioned element on the ring (same trig math as avatars), styled as a small card with `bg-card border border-border/50 rounded-xl px-4 py-2` containing the `AnimatedCounter` and label.
- Stats will have the same `animate-float-slow` animation as avatars for visual consistency.
- Center content `max-w` stays at `md` (~28rem) so the text doesn't crowd.
