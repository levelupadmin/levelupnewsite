

## Problem

The hero carousel videos have two issues causing cropping:
1. **`scale-[1.3]`** — zooms the video to 130%, cropping edges
2. **`object-cover`** — fills the container by cropping to fit the aspect ratio

## Plan

**File: `src/components/HeroCarousel.tsx` (line 126)**

Change the video className from:
```
object-cover object-center bg-card scale-[1.3]
```
to:
```
object-contain object-center bg-card
```

This removes the 1.3x scale zoom and switches from `object-cover` (crop to fill) to `object-contain` (fit entire video within frame, no cropping). The `aspect-[16/9]` container is preserved so layout stays consistent — if a video isn't exactly 16:9, small letterbox bars may appear but the full frame will always be visible.

### Designer note
For best results with no letterboxing, all three videos should be exported at the same aspect ratio (ideally 16:9, 1920×1080).

