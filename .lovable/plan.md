

## Replace PVR Trailer Poster Image

Same pattern as the previous Forge poster update. The PVR trailer is the first slide (index 0) in `HeroCarousel.tsx`, using `heroPoster1` imported from `@/assets/hero-poster-1.jpg`.

### Steps

1. **Copy uploaded image** to `src/assets/hero-poster-1.jpg` (replacing the current PVR poster)
2. No code changes needed — `HeroCarousel.tsx` already imports and uses this file path as the `poster` attribute for the first video slide.

