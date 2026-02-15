
# Fix "Why LevelUp" Section on Mobile

## The Problem
The section forces a 3-column grid with 440px fixed-height flip cards on all screen sizes. On mobile (390px), each card is only ~110px wide, causing:
- Truncated titles ("Expert Membe...", "Comm...")
- Unreadable body text wrapping one word per line
- Squished SVG illustrations
- Flip interaction is awkward on touch devices at that size

## The Solution
Switch to a **vertical stack on mobile** (1 column) with a reduced card height, then restore the 3-column layout on tablets and up (`md:` breakpoint).

### Layout Changes
- **Grid**: `grid-cols-1 md:grid-cols-3` instead of `grid-cols-3`
- **Card height**: 360px on mobile, 440px on desktop (via responsive style)
- **Gap**: `gap-5 md:gap-6` for tighter mobile spacing

### Headline Changes
- Stack heading and subtext vertically on mobile (already `flex-col` default, just needs spacing refinement)

## Technical Details

### File: `src/components/WhyLevelUp.tsx`

1. **Line 73** -- Change grid from `grid-cols-3` to `grid-cols-1 md:grid-cols-3`

2. **Line 82** -- Make the card container height responsive using a className approach instead of inline style:
   - Remove `style={{ perspective: 1200, height: 440 }}`
   - Add `style={{ perspective: 1200 }}` and className `h-[360px] md:h-[440px]`

These two changes ensure:
- Cards stack vertically and fill the width on mobile, so all text and illustrations are readable
- The flip animation still works identically on all sizes
- Desktop layout remains completely unchanged
