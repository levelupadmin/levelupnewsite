
# Mobile Optimization for Logos Section

## Problem
On mobile (390px wide), logos at `h-14` (56px) are oversized, and the `gap-16` (64px) spacing between them is too generous. The vertical gap between the stats CTA and "Our students come from" heading is also excessive.

## Changes

### File: `src/components/StudentLogosSection.tsx`

1. **Reduce mobile logo size**: Change `h-14` to `h-10` (40px) -- keeps them readable but less dominant on small screens
2. **Reduce mobile gap**: Change `gap-16` to `gap-10` so logos sit more comfortably within the marquee at mobile widths
3. **Tighten vertical spacing**: Reduce the padding between the stats/CTA area and the "Our students come from" heading (currently there are two separate `<div>` blocks with independent padding that stack up)

### Specific line changes
- Line 123: `h-14 md:h-20 lg:h-24` becomes `h-10 md:h-20 lg:h-24`
- Line 114: `gap-16 md:gap-24 lg:gap-32` becomes `gap-10 md:gap-24 lg:gap-32`
- Line 96 (heading): Reduce `mb-12 md:mb-16` to `mb-8 md:mb-16` for tighter mobile spacing
