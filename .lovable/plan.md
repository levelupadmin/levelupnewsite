
# Replace Forge Carousel with 3 Large Scroll Cards

## Overview
Replace the current Embla carousel in the Forge section with 3 large, static scroll cards — one each for Forge Filmmaking, Forge Writers, and Forge Creators. Each card features a background image, title, one line of subtext, and two buttons.

## Card Design
Each card will be a tall, full-width (within max-w-7xl) image card with:
- Background image (using existing forge banner assets)
- Bottom gradient overlay for text readability
- Title (e.g. "Forge Filmmaking")
- One-line subtitle (e.g. "12-day bootcamp. Make your own short film.")
- Two buttons: a primary CTA ("Apply Now") and a secondary/outline CTA ("Learn More")
- Rounded corners, vertical stacking with gap between cards
- Scroll-triggered entrance animation (fade + slide up)

## Card Data
1. **Forge Filmmaking** — image: `forge-filmmaking-banner.jpg`, subtitle: "12-day bootcamp. Make your own short film.", buttons: "Apply Now" + "Learn More"
2. **Forge Writers** — image: `forge-writing-banner.jpg`, subtitle: "Immersive retreat for writers and storytellers.", buttons: "Apply Now" + "Learn More"
3. **Forge Creators** — image: `forge-creators-banner.jpg`, subtitle: "Build, collaborate, and ship creative work.", buttons: "Apply Now" + "Learn More"

## Technical Changes

### `src/components/ForgeSection.tsx`
- Remove the `<ForgeCarousel />` import and usage
- Replace the carousel block with 3 vertically stacked cards
- Each card: `aspect-[16/9]` or similar tall ratio, background image via `<img>` + absolute overlay, title + subtitle + two buttons at the bottom-left
- Cards animate in on scroll with staggered Framer Motion
- Buttons use existing styling: primary filled button + outline/ghost secondary button

### `src/components/ForgeCarousel.tsx`
- No longer imported; can be left as-is or removed (will leave it since it's unused but harmless)

## Layout Spec
- Cards stacked vertically with `gap-6 md:gap-8`
- Each card: `rounded-lg overflow-hidden` with `aspect-[16/9]` for a large cinematic feel
- Image covers entire card, gradient overlay from bottom
- Text + buttons positioned `absolute bottom-0 left-0 p-6 md:p-10`
- Primary button: filled orange (bg-primary), secondary: outline/ghost style
