
# Enhance Portfolio-Driven Learning Card

## Overview
Enrich the LiveProjectsCard illustration with creator/influencer reel elements and cinematography-related visuals, building on the existing stacked thumbnails + timeline aesthetic.

## New Elements to Add

### 1. Phone Reel Mockup (Creator/Influencer Element)
- Add a small phone-shaped frame (9:16 aspect ratio) on the right side of the card, overlapping the stacked thumbnails slightly
- Style it with a rounded rect border, subtle glow, and a "reel" label at the bottom
- Use one of the existing forge images inside it, cropped to portrait
- Add a small heart icon + view count ("12.4K") overlay to sell the "creator reel" look
- Float-animate it with `animate-float-card-2`

### 2. Cinematography UI Elements
- **Viewfinder crosshair**: A subtle SVG crosshair/frame overlay in the center of the front thumbnail card, giving a "through the lens" feel
- **Aperture/f-stop badge**: A floating tag showing "f/1.8" alongside the existing "4K", "Color Graded", "Final Cut" tags
- **Film strip accent**: A thin vertical film-strip pattern (perforated edge) on the left edge of the card, very subtle (low opacity)

### 3. Updated Floating Tags
Replace/augment the existing tags to blend portfolio and cinematography themes:
- Keep "4K" and "Color Graded"
- Replace "Final Cut" with "Director's Cut"
- Add "f/1.8" as a new cinematography tag
- Add "Reel Ready" as a creator/portfolio tag

## Technical Details

### File: `src/components/why-levelup/LiveProjectsCard.tsx`

**Tags update** (lines 13-17):
- Update the tags array to include the new labels: "4K", "Color Graded", "Director's Cut", "f/1.8", "Reel Ready"
- Reposition them to accommodate the new phone mockup on the right

**Phone reel mockup** (new JSX block):
- Add after the stacked thumbnails div
- Positioned `absolute`, right side (~65% left, 10% top)
- A div styled as a phone frame (w-[60px], rounded-xl, border, aspect-[9/16])
- Contains a cropped forge image, heart icon, and view count
- Uses `animate-float-card-3` for gentle bobbing

**Viewfinder crosshair** (new SVG on the front card):
- Add inside the `i === 2` conditional block alongside the existing play icon
- Thin corner brackets in each corner of the card (like a camera viewfinder)
- Low opacity (~0.3) so it doesn't overpower

**Film strip accent** (new div):
- Thin vertical strip on the far left of the card
- Small repeated rectangles (perforations) using a simple pattern
- Very low opacity (0.15-0.2)

### File: `tailwind.config.ts`
- No changes needed; existing float and playhead animations are sufficient.

### No other files change.
