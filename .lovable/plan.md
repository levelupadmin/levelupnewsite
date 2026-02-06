

## Problem

The carousel cards are landscape (16/9) as requested, but they're too small -- the entire carousel fits within the viewport. The reference shows that only the **top half** of the video cards should be visible on initial load, with the rest revealed by scrolling.

## Plan

### 1. Make the hero section exactly viewport height (HeroSection.tsx)

Set the hero section to `h-screen` so it acts as a fixed viewport container. The headline sits in the upper portion, and the carousel starts near the bottom -- but the carousel content itself overflows past the section, creating the "peek" effect.

### 2. Make carousel cards much wider (HeroCarousel.tsx)

Increase the card widths significantly so each card is larger and more cinematic:
- Mobile: `w-[90vw]` (nearly full width)
- Tablet: `w-[50vw]` (2 cards visible)
- Desktop: `w-[45vw]` (just over 2 cards visible)

With 16/9 aspect ratio at `45vw` width, each card will be roughly `25vw` tall -- that's about 25% of the viewport height. Starting from ~60% down the viewport, the cards will naturally extend well below the fold, showing only the top portion.

### 3. Ensure no clipping on the section (HeroSection.tsx)

The section must NOT have `overflow-hidden` so the carousel visually bleeds past the viewport edge. It currently doesn't have it, which is correct.

### 4. Move progress dots to overlay position (HeroCarousel.tsx)

Since the bottom of the cards will be cut off by the viewport, the dots need to overlay on the visible portion of the carousel rather than sitting below it. Move them to the top or middle of the carousel area.

## Technical Details

### File: `src/components/HeroSection.tsx`
- Add `h-screen` to the section so headline + top of carousel = exactly one viewport
- This naturally makes the large carousel cards overflow below

### File: `src/components/HeroCarousel.tsx`
- Change slide widths from `w-[85vw] sm:w-[45vw] md:w-[33.33vw] lg:w-[33.33vw]` to `w-[90vw] sm:w-[50vw] md:w-[45vw] lg:w-[45vw]`
- Keep `aspect-[16/9]` for landscape orientation
- Move progress dots from `bottom-6` to `top-4` so they're visible above the fold
- Reduce top margin to `mt-6 md:mt-8` so the carousel starts closer to the CTA

The math: at `45vw` wide with 16/9 ratio, each card is ~25vh tall. The headline area takes ~55-60% of the viewport. That leaves ~40-45% for the carousel peek -- meaning roughly half the card height is visible and the rest is below the fold, exactly matching the reference.

