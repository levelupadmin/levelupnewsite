

## Problem

The current carousel doesn't match the reference screenshot. Here are the key differences:

**Current implementation:**
- Landscape-oriented cards (16:10 aspect ratio)
- Left-aligned offset scrolling with varying padding
- Cards are relatively small and don't dominate the viewport
- Rounded corners give a softer, less cinematic feel
- Large gap between headline and carousel

**Reference screenshot:**
- Tall, portrait-oriented cards filling the viewport width
- 4 cards visible simultaneously, evenly distributed edge-to-edge
- Consistent narrow gaps between cards
- Cards are large and immersive, dominating the lower half of the screen
- Minimal or no rounded corners -- more cinematic and editorial
- Text overlays at the bottom of each card (title + subtitle)

---

## Plan

### 1. Change card aspect ratio from landscape to portrait

Switch from `aspect-[16/10]` (landscape) to `aspect-[3/4]` (tall portrait), matching the vertical card orientation in the reference.

### 2. Redistribute cards to fill the full viewport width

Instead of the current approach where cards have varying widths per breakpoint (`85vw / 60vw / 45vw / 35vw`) with left-offset padding, change to a uniform layout where each card takes roughly 25% of the viewport width on desktop. This means:
- Mobile: 1 card visible (~85vw)
- Tablet: 2-3 cards visible
- Desktop: 4 cards visible, each roughly `25vw` wide

### 3. Make spacing consistent and edge-to-edge

Remove the asymmetric `first:pl` offset padding. Use uniform, narrow gaps between all cards (around 8-12px). The first and last cards should bleed close to or right up to the viewport edges, matching the reference's full-bleed composition.

### 4. Remove or reduce rounded corners

Change from `rounded-lg md:rounded-xl` to minimal rounding (`rounded-sm` or none) for a more cinematic, editorial feel matching the reference.

### 5. Reduce gap between headline and carousel

Tighten the vertical spacing between the headline area and the carousel so the cards feel more integrated into the hero section rather than a separate element below. Reduce the `mt-16 md:mt-20 lg:mt-24` to smaller values.

### 6. Keep existing features

All existing functionality stays -- autoplay, progress dots, hover effects (play button, scale), text overlays with mentor name and class title, film grain overlay, and bottom gradient.

---

## Technical Details

All changes will be in `src/components/HeroCarousel.tsx`:

- Update the slide container class from `w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw]` to `w-[80vw] sm:w-[45vw] md:w-[33.33vw] lg:w-[25vw]`
- Replace asymmetric padding (`pl-3 md:pl-5 first:pl-4 md:first:pl-10 lg:first:pl-20`) with uniform padding (`px-1 md:px-1.5`)
- Change image aspect ratio from `aspect-[16/10]` to `aspect-[3/4]`
- Reduce border radius from `rounded-lg md:rounded-xl` to `rounded-sm`
- Reduce top margin from `mt-16 md:mt-20 lg:mt-24` to `mt-8 md:mt-12 lg:mt-14`
- Update Embla config `align` from `"start"` to `"center"` for better visual centering of the active slides

