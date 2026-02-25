

## Use Uploaded Image as Forge Video Poster in Hero Carousel

The forge video is the second slide (index 1) in `src/components/HeroCarousel.tsx`, currently using `heroPoster2` imported from `@/assets/hero-poster-2.jpg`.

### Steps

1. **Copy the uploaded image** to `src/assets/hero-poster-2.jpg` (replacing the current forge poster)
2. No code changes needed — `HeroCarousel.tsx` already imports `heroPoster2` from `@/assets/hero-poster-2.jpg` and uses it as the `poster` attribute on the forge video element.

Single file copy, zero code edits.

