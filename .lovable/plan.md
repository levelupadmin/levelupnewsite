
# Restructure Forge Section to Match Reference Layout

## Overview
Rebuild the Forge section to match the reference image structure: a top split layout with "The Forge" heading (text, not logo image) on the left with description and stats, feature points with circle-plus icons on the right, then an "EXPLORE VERTICALS" label followed by large horizontal scroll cards with full card details (tag, location, title, description, and two buttons).

## Structure (top to bottom)

### 1. Top Split Layout (already similar, minor tweaks)
- **Left column**: Remove the logo image, replace with plain text "The" (in primary/gold color, smaller) and "Forge" (large bold white) as two lines. Keep "Where you *become*" heading, description paragraph, and stats row (7 Cities, 11 Editions, 248 Shortfilms).
- **Right column**: Replace Lucide icons (Flame, Users, MapPin) with a simple circle-plus icon (use `PlusCircle` from lucide-react or a custom styled circle) to match the reference's minimal circle-plus bullet style. Keep the same 3 feature points.

### 2. "EXPLORE VERTICALS" Label
- Add a small uppercase tracking-wide label: "EXPLORE VERTICALS" between the top section and the cards, matching the reference.

### 3. Bottom Cards — Horizontal Embla Carousel
- Replace the current accordion-style carousel with large, wide cards in a horizontal Embla carousel.
- Each card is a large image card (roughly aspect-[16/10] or similar) with:
  - Background image covering the full card
  - A "Next Cohort -- Dec 2025" badge/pill in the top-right area
  - Bottom-left overlay text: uppercase tag line (e.g., "10-DAY WORKSHOP"), location dots (e.g., "Delhi . Bangalore"), large title (e.g., "Forge Editing"), 2-3 line description, and two buttons ("Apply Now -->" primary filled, "Learn More" outline)
  - Bottom gradient overlay for readability
- Cards peek from the right edge (the active card takes ~65% width, the next card peeks in at ~30%)
- Progress dots below the carousel (small dots + one active wider bar, matching current style)

### Card Data
1. **Forge Filmmaking** -- image: forge-filmmaking-banner.jpg, tag: "10-DAY WORKSHOP", location: "Delhi . Bangalore", subtitle: "Shape raw footage into compelling stories. Learn rhythm, pacing, and the art of emotional beats from working editors.", next cohort: "Dec 2025"
2. **Forge Writers** -- image: forge-writing-banner.jpg, tag: "12-DAY RETREAT", location: "Goa", subtitle: "Immersive retreat for writers and storytellers. Develop your voice and craft your narrative.", next cohort: "Jan 2026"
3. **Forge Creators** -- image: forge-creators-banner.jpg, tag: "10-DAY BOOTCAMP", location: "Mumbai . Delhi", subtitle: "Build, collaborate, and ship creative work with fellow creators.", next cohort: "Feb 2026"

## Technical Changes

### `src/components/ForgeSection.tsx`
- Remove `forgeLogo` import, use plain text for "The" and "Forge"
- Replace icon components with `PlusCircle` from lucide-react for feature point bullets
- Remove `<ForgeCarousel />` import
- Add "EXPLORE VERTICALS" label
- Inline the new carousel directly (or create a new component)
- Build horizontal Embla carousel with large image cards containing: cohort badge, tag, location, title, description, two buttons
- Each card has rounded corners, gradient overlay, and text positioned absolute at bottom-left
- Buttons: "Apply Now -->" as filled primary button, "Learn More" as outline/border button
- Remove the bottom "Request an Invite" CTA link (replaced by per-card CTAs)

### `src/components/ForgeCarousel.tsx`
- No longer imported (can remain unused)

## Styling Details
- Cards: `rounded-lg overflow-hidden`, large aspect ratio
- Gradient: `bg-gradient-to-t from-black/80 via-black/30 to-transparent`
- Cohort badge: small pill with dark bg and white text, positioned top-right
- Tag line: uppercase, small, primary/orange color, tracking-wide
- Location: small muted text with dot separator
- Title: large serif-display font
- Buttons: primary filled rounded + outline rounded, side by side
