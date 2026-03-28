

## Replace Forge Video in Hero Carousel

The user uploaded `Website.mp4` to replace the current `forge.mp4` video used in the hero carousel's second slide.

### Steps

1. **Copy the uploaded file** to `public/videos/forge.mp4`, overwriting the existing forge video
2. No code changes needed — `HeroCarousel.tsx` already references `/videos/forge.mp4` as the source for slide 2

### Technical Detail
- The hero carousel in `src/components/HeroCarousel.tsx` uses `src: "/videos/forge.mp4"` for the second slide
- Simply replacing the file at that path will update the video without any code changes
- The file will be copied as `.mp4` format per project constraints

