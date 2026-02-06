

## Understanding the Reference

The Wise.com reference screenshot shows a key layout pattern: the hero content (headline, subtitle, CTA) sits in the upper portion of the viewport, and below it a large visual block begins but is **deliberately cut off at the bottom of the viewport**. The user has to scroll down to see the full image. This creates a "peek" effect that invites scrolling.

Currently, the carousel is fully contained within the hero section and the section has `min-h-screen`, but the carousel cards are relatively small. The goal is to make the carousel images large enough that they extend **beyond the bottom of the viewport**, so the initial view only shows the top portion of the carousel cards.

---

## Plan

### 1. Remove overflow-hidden from the hero section

The `HeroSection` currently has `overflow-hidden` on the outer `<section>`. This clips the carousel at the section boundary. We need to allow the carousel to visually extend beyond the viewport fold.

### 2. Position the carousel so it starts mid-viewport and extends below

Instead of the carousel fitting neatly within the hero, it should start roughly 60-70% down the viewport and its cards should be tall enough that only the top half is visible on initial load. The user scrolls to reveal the rest.

To achieve this:
- Keep the headline area vertically centered in the upper portion of the screen
- Let the carousel sit at the bottom, with its content naturally overflowing below the viewport

### 3. Make carousel cards much larger

Increase the card size so each card is tall and immersive. On desktop, show about 3 cards with each taking roughly 33% of the viewport width. The images should use a taller aspect ratio (around 4:3 or even closer to square) so they extend well below the fold.

### 4. Remove progress dots (or move them below the fold)

Since the bottom of the carousel is cut off by the viewport, progress dots sitting below the carousel would be hidden on initial load. Move them to overlay on the carousel itself or remove them to keep the composition clean.

### 5. Adjust hero section height

Change from `min-h-screen` to allow natural height flow. The headline area should take up the top ~55-60% of the viewport, and the carousel begins immediately after, bleeding past the viewport edge.

---

## Technical Details

### File: `src/components/HeroSection.tsx`

- Remove `overflow-hidden` from the outer `<section>` so the carousel can extend beyond
- Change `min-h-screen` to just `h-screen` or use a flex layout that positions the headline in the upper portion and lets the carousel flow naturally below
- The section should not constrain the carousel height

### File: `src/components/HeroCarousel.tsx`

- Increase card widths: mobile `w-[85vw]`, tablet `w-[45vw]`, desktop `w-[33.33vw]`
- Change aspect ratio from `aspect-[16/9]` to `aspect-[3/4]` (tall portrait) so the cards are tall enough to bleed below the viewport
- Move progress dots from below the carousel to an overlay position inside the carousel (e.g., absolutely positioned at the bottom-center of the carousel container)
- Remove the bottom margin/padding that keeps everything contained

The key insight: the combination of the headline taking up the top half of the viewport + tall portrait cards starting below the headline = cards naturally extend past the viewport bottom, creating the "half visible, scroll to see more" effect from the reference.

