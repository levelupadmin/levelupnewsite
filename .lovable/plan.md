

# Hero Section Background Refinement

Update the hero section background to match the reference image (image-7.png) -- a deep charcoal, matte, cinematic feel with scattered star-like dots, subtle grid lines, grain texture, and a soft radial vignette. No glossy gradients.

## What Changes

Only the background layers in `HeroSection.tsx` will be updated. All content (headline, subtext, CTA, carousel) stays exactly as-is.

## Background Layers (bottom to top)

1. **Base color**: Deep charcoal `hsl(220 12% 7%)` -- not pure black, slightly warm/blue-tinted
2. **Faint grid lines**: Very low opacity (~3%) thin grid lines at ~60px intervals, subtle gray
3. **Scattered star dots**: Tiny white dots at random-feeling intervals (~0.6px), very low opacity (~8-10%) to mimic the sparse starfield in the reference -- distinct from a uniform grid
4. **Grain/noise texture**: SVG fractal noise overlay at ~5% opacity with `mix-blend-overlay` for that matte film texture
5. **Soft radial vignette**: Elliptical gradient darkening edges, keeping the center slightly brighter -- matte, not glossy
6. **Subtle warm center glow**: Very faint warm-toned radial from center-top (~5% opacity) for depth without looking like a spotlight

## Technical Details

**File**: `src/components/HeroSection.tsx`

- Replace the current `radial-gradient` dot grid (28px uniform dots at 25% opacity) with a much sparser, smaller dot pattern (~1px dots, ~40px spacing, ~8% opacity) to look like scattered stars rather than a grid
- Add a separate faint line grid layer (~60px, ~3% opacity) using `linear-gradient` for the subtle grid overlay
- Keep the existing noise/grain layer but lower opacity slightly to ~5%
- Adjust the vignette to be softer and more gradual -- fading from ~35% center transparency to edges
- Keep the warm glow but reduce to ~5% opacity for subtlety
- Change base bg from `hsl(220 15% 6%)` to `hsl(220 12% 7%)` for a slightly warmer charcoal

No other files are modified.

