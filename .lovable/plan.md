

## Three-Row Auto-Scrolling Community Section

### Approach
Split the 6 images across 3 rows, each scrolling horizontally in an infinite loop. Rows alternate direction (left, right, left) for visual interest. Each row gets 2 base images duplicated multiple times to fill the strip.

### Changes

**File: `src/components/CommunitySection.tsx`**

1. **Split images into 3 rows** of 2 images each:
   - Row 1: community1, community2 → scrolls left
   - Row 2: community3, community4 → scrolls right
   - Row 3: community5, community6 → scrolls left

2. **Quadruple each row's images** (repeat 4x) so the strip is wide enough for seamless looping

3. **Render 3 stacked marquee rows** inside the masked container, each with:
   - `flex gap-4 w-max` layout
   - Alternating `scroll-left` / `scroll-right` animations (already defined in CSS)
   - Slightly different speeds per row (e.g. 25s, 30s, 20s) for organic feel
   - Shared `paused` state on hover

4. **Reduce card height slightly** to fit 3 rows comfortably: ~`h-[120px] md:h-[160px]`

5. **Add `gap-3` between rows** via a `flex flex-col gap-3` wrapper

No new CSS keyframes needed — `scroll-left` and `scroll-right` already exist.

