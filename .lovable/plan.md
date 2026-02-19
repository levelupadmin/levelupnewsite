

## Replace Community Section with Bento Photo Grid Layout

### What Changes
Complete replacement of the current GoFundMe-style circular layout with a bento/masonry photo grid matching the reference image. The section shifts from a centered, symmetrical composition to a left-aligned editorial layout with a dense photo mosaic below.

### New Layout Structure

**Header area (top)**:
- Left-aligned eyebrow: "DIVE INTO OUR COMMUNITY" (orange, uppercase, letter-spaced)
- Left-aligned headline: "Learn Online, Connect Offline" (large, bold, white)
- Left-aligned subtitle: "Engage with other learners, alumni, and mentors and attend community sessions to learn from each other in our curated community."
- Right-aligned: Left/right arrow navigation buttons (white square buttons with arrow icons)

**Photo grid (below header)**:
A 3-row bento/masonry grid with ~11 photos in varying sizes. The grid uses CSS Grid with defined row/column spans to create the asymmetric mosaic effect from the reference:

```text
Row 1:  [tall-1]  [short-2]        [tall-3 center]     [medium-4]  [short-5]
Row 2:  [tall-1]  [medium-6]       [tall-3 center]     [medium-4]  [short-7]
Row 3:  [short-8]       [tall-6 continues]  [short-9]  [short-10]  [tall-11]
```

Photos have rounded-lg corners, small gaps between them, and dark background showing through.

### Images Used
Will reuse existing project assets (masterclass-1 through 6, forge-1 through 4, and carousel images) to fill the ~11 grid slots. All images use `object-cover` for consistent cropping.

### What Gets Removed
- All circular image components and data arrays
- FloatingCircleImage component
- AnimatedCounter stats (floating badges and mobile grid)
- community-float animation
- Orange ring borders, rotations, labels on circles
- CTA "Join the community" button

### What Stays
- Dark background (`bg-background`)
- Orange accent color for eyebrow text
- Section padding patterns
- Responsive behavior (grid simplifies on mobile)

### Technical Details

**File: `src/components/CommunitySection.tsx`** -- Full rewrite

1. **Imports**: Replace icon imports with `ArrowLeft`, `ArrowRight` from lucide-react. Import ~11 images from assets (masterclass-1 through 6, forge-1 through 4, carousel-1).

2. **Grid data**: Array of image objects with `src`, `alt`, and grid positioning classes (`col-span`, `row-span` values).

3. **Header**: Flex container with left-aligned text block and right-aligned arrow buttons. Buttons are white-bordered squares with hover effects.

4. **Photo grid**: CSS Grid with `grid-cols-5` on desktop, defined `row-span-2` for taller images. Each cell is a rounded-lg overflow-hidden container with `object-cover` image. Gap of `gap-3` or `gap-4`.

5. **Mobile**: Grid collapses to `grid-cols-2` with fewer images shown (hide some on small screens).

6. **Arrow buttons**: Styled as square outline buttons (white border, transparent bg). Currently decorative (no carousel functionality) -- can be wired up later if needed.

7. **Hover effect**: Subtle scale or brightness change on individual photos.

No other files changed. The `AnimatedCounter` import is removed as stats are no longer displayed.

