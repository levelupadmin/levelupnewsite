
# Move "40+ Working Mentors" Stat to Right Column

## What Changes
In the expanded Expert Mentors card, the "40+ / WORKING MENTORS" stat currently sits at the bottom of the left column (below the illustration). It will be moved to the bottom of the right column (below the bullet points), and the right column text will shift up slightly to maintain balanced spacing.

## Technical Steps

### `src/components/WhyLevelUp.tsx`

**1. Remove stat block from left column (lines 204-213)**
- Delete the `feature.stat` conditional block from the left column

**2. Add stat block to right column (after bullets, around line 235)**
- Insert the same stat block after the bullets `div`, inside the right column
- Align it left (not centered) to match the text column alignment

**3. Adjust right column spacing**
- Change `justify-center` to `justify-start` on the right column (line 222) so content sits higher
- Add top padding (`pt-4 md:pt-6`) to give breathing room from the top without centering vertically
- Reduce `mb-6` on the description paragraph to `mb-4` for tighter spacing

| Line Range | Change |
|------------|--------|
| 204-213 | Remove stat block from left column |
| 222 | Change `justify-center` to `justify-start`, add `pt-4 md:pt-6` |
| 223 | Reduce `mb-6` to `mb-4` on description |
| After line 235 | Insert stat block (left-aligned, with `mt-6` spacing) |
