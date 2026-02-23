

## Fix: Why LevelUp Cards Not Loading on Mobile

### Root Cause

The card wrapper `div` uses `minHeight` (via inline style) but no explicit `height`. Inside it, the child div has `h-full` (`height: 100%`), and the actual content layers use `absolute inset-0`.

In CSS, `height: 100%` does **not** resolve against a parent that only has `min-height` -- the child treats the parent's height as `auto` and collapses to zero. On desktop this is masked because the flex-row layout and fixed widths cause the cards to stretch, but on mobile (`flex-col`), each card's inner content becomes invisible.

### Fix

In `src/components/WhyLevelUp.tsx`, two small changes to the card rendering (around lines 119-134):

1. **Add `height` alongside `minHeight`** on the outer card div for mobile so the inner `h-full` child can resolve its percentage height. Change the style from just `minHeight` to also include `height` on mobile:
   - Mobile collapsed: `height: 432px`
   - Mobile expanded: `height: 504px`
   - Desktop: keep only `minHeight: 528` (unchanged, works via flex stretch)

2. Alternatively (and more robustly), make the outer card div a flex column container so the `h-full` child stretches naturally without needing percentage resolution:
   - Add `flex flex-col` to the outer card div class
   - Change the inner div from `h-full` to `flex-1` so it fills the available space regardless of how the parent's height is defined

**Chosen approach**: Option 2 (flex) -- it is more robust and doesn't hardcode pixel values.

### Changes

**`src/components/WhyLevelUp.tsx`** (lines ~123 and ~137)

- Line 123: Add `flex flex-col` to the outer card `div`'s className
- Line 137: Change inner div from `h-full` to `flex-1 min-h-0`

No other files are affected. The visual appearance and interaction behavior remain identical.
