

## Move Hero Carousel Progress Dots from Top to Bottom

Single change in `src/components/HeroCarousel.tsx` line 126:

Change `top-3` to `bottom-3` in the progress dots container className.

**Before:** `className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"`
**After:** `className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"`

This matches the Forge carousel's dots placement at the bottom, maintaining visual consistency across the site.

