

# Center "40+ Working Mentors" Stat and Add Padding

## What Changes
The "40+ / WORKING MENTORS" stat block in the right column of the expanded card will be centered horizontally (instead of left-aligned) and given padding on all four sides to increase its visual prominence.

## Technical Steps

### `src/components/WhyLevelUp.tsx` (line 224-232)

- Change `items-start` to `items-center` on the stat container
- Add `p-4` (padding on all sides) and `text-center` for balanced centering

| Line | Current | New |
|------|---------|-----|
| 225 | `items-start mt-6` | `items-center mt-6 p-4` |

