

# Fix Rotating Word Spacing in Hero Headline

## Problem
The spacing between the rotating word (e.g., "filmmakers", "editors") and "become" feels inconsistent because:
1. The rotating word container has a fixed `width: "7ch"` -- this is too wide for short words (creating a visible gap) and too narrow for long words (which visually overflow)
2. There is **double spacing**: `gap-x-[0.3em]` on the flex parent AND `mr-[0.15em]` on the rotating container, stacking up unevenly

## Solution
- **Remove** the `mr-[0.15em]` from the rotating word container to eliminate double spacing
- **Adjust the container width** from `7ch` to `8.5ch` -- this better accommodates the range of word lengths while keeping the gap to "become" visually consistent
- **Keep** the flex `gap-x-[0.3em]` as the single source of spacing between all three words ("Where", rotating word, "become")

## Technical Details

### File: `src/components/HeroSection.tsx`

**Line 48** (h1 tag): No change -- keep `gap-x-[0.3em]`

**Line 50** (rotating word container):
- Change `className="relative inline-flex justify-start overflow-visible mr-[0.15em]"` to `className="relative inline-flex justify-start overflow-visible"`
- Change `style={{ width: "7ch" }}` to `style={{ width: "8.5ch" }}`

This ensures the gap between the rotating word and "become" is consistent and controlled by a single spacing value (`gap-x-[0.3em]`), while the wider container better fits longer words like "screenwriters" and "cinematographers".

