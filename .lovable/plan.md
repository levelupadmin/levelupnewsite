

# Expert Mentors Card: Creative Visual Redesign

## Problem
The current illustration is a flat group photo (`all-masters.png`) with small floating thumbnails at the bottom. It looks generic, like a stock photo placement, and doesn't convey the premium, cinematic feel of the brand.

## Solution: Staggered Mentor Mosaic
Replace the group photo with a **dynamic mosaic/collage** of individual mentor portraits using the existing `masterclass-*.jpg` assets. The layout creates visual depth through:

- **Varying sizes** (some larger "featured" portraits, some smaller)
- **Slight overlaps** between images for a layered editorial feel
- **Warm amber border accents** on select portraits
- **A cinematic gradient fade** at the bottom blending into the card background
- **Subtle rotation** on some thumbnails for organic energy

The result looks like a curated casting wall or film-industry mood board -- much more fitting for a creative education brand.

## Layout (Collapsed State)
A 3x2-ish asymmetric grid of 5-6 mentor photos:
- Top row: 2 larger portraits (slightly overlapping)
- Bottom row: 3 smaller portraits offset to the right
- Warm gradient overlay fading into the card's dark background at the bottom
- A small "40+ mentors" label tucked at the bottom-right

## Layout (Expanded State)
Same mosaic but given more horizontal space in the left column -- photos can breathe more with slightly larger sizing.

---

## Technical Details

### File: `src/components/why-levelup/ExpertMembershipCard.tsx`

Complete rewrite of the component:

- **Imports**: Use `masterclass-1.jpg` through `masterclass-6.jpg` as individual mentor portraits (these are headshot-style images of real mentors)
- **Layout**: CSS Grid with `grid-template-columns` and `grid-template-rows` to create an asymmetric mosaic
- **Each image cell**: `rounded-lg`, `overflow-hidden`, `border border-primary/20`, with `object-cover object-top`
- **Feature image** (top-left): Spans 2 rows, larger, with a `border-primary/40` accent
- **Gradient overlay**: `absolute inset-0` with `linear-gradient(to top, card-bg 0%, transparent 40%)` to blend the bottom into the card
- **"40+ mentors" label**: Positioned `absolute bottom-2 right-3` in `text-[10px] uppercase tracking-wide text-foreground/50`
- **Subtle shadow/glow**: Each image gets a faint `shadow-md` for depth separation

No changes to `WhyLevelUp.tsx` or other card components -- only the illustration component changes.

