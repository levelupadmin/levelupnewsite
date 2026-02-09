

# Make Hero Section Grain Texture Visible

## Problem
The grain/noise texture layer currently uses `opacity-[0.10]` with `mix-blend-overlay`. On the dark charcoal background, `mix-blend-overlay` blending makes dark noise pixels disappear entirely, and the 10% opacity makes even the light noise pixels invisible.

## Changes (single file: `src/components/HeroSection.tsx`)

**Grain layer (lines 27-33):**
- Increase opacity from `0.10` to `0.35` (35%) so the grain is clearly visible
- Change blend mode from `mix-blend-overlay` to `mix-blend-soft-light` which preserves grain texture on dark backgrounds better than overlay
- Reduce the `backgroundSize` from `128px` to `200px` to make the grain pattern less repetitive and more natural-looking
- Increase `baseFrequency` from `0.8` to `0.65` for slightly coarser, more visible grain particles

No other layers or content are modified.

