

## Craft.do-Style Expanded Navbar Panel

Redesign the expanded dropdown panel inside the navbar to match the Craft.do reference layout. The interaction model (per-link hover, pill expands downward) stays the same -- only the content layout and card styling inside the expanded panel changes.

### What Changes

**1. Card layout switches to Craft-style tiles**

Instead of image-heavy course cards with thumbnails, each item becomes a rounded rectangular tile with:
- A subtle semi-transparent background (`bg-white/5` or similar)
- Generous rounded corners (`rounded-xl`)
- The course/item title in bold
- A short description below in muted text
- Hover state that slightly brightens the background

**2. Grid layout becomes a 2+1 column structure**

Inspired by the Craft reference:
- **Left 2 columns**: Larger feature cards (2 columns, 2 rows) — each with title and description
- **Right column**: Narrower, stacked smaller link items (title-only or title + icon)
- This gives a visual hierarchy where the main offerings are prominent, and secondary links are accessible but compact

For categories like Masterclasses with 3 course items, the layout would be:
```text
+------------------------------+------------------+
|  Karthik Subbaraj            |  View All        |
|  Storytelling & directing    |  Masterclasses   |
+------------------------------+                  |
|  Anthony Gonsalvez           |  Browse by       |
|  Film editing                |  Genre           |
+------------------------------+------------------+
|  Lokesh Kanagaraj            |
|  Art of filmmaking           |
+------------------------------+
```

**3. Data structure update**

Add a `sideLinks` array to each nav category for the right-column items:
- Masterclasses: "View All Masterclasses", "Browse by Genre"
- The Forge: "Apply Now", "See Schedule"
- Live Programs: "Upcoming Sessions", "Past Programs"

**4. Image thumbnails become optional/subtle**

Rather than large 16:10 thumbnail images dominating each card, the cards prioritize text. A small thumbnail or icon can optionally appear inside the card, but the visual weight shifts to typography — matching Craft's clean, text-forward style.

### What Stays the Same

- Per-link hover expansion mechanics (activeIndex, onMouseEnter/onMouseLeave)
- Pill morph animation (rounded-full to rounded-2xl, height transition)
- Glassmorphism styling (backdrop-blur, semi-transparent background)
- Scroll-based compaction (scrolled state)
- Mobile full-screen overlay menu
- Staggered entrance animations for card items
- AnimatePresence for expand/collapse

### Technical Details

**File: `src/components/Navbar.tsx`**

- Update the `NavItem` interface to make `image` optional and add an optional `icon` field
- Add a `sideLinks` array (label + href) to the `NavLink` interface for the right column
- Replace the current 3-column equal grid (`grid-cols-3`) with a `grid` layout using `grid-cols-[2fr_1fr]` (main area + sidebar)
- Main area uses `grid-cols-2` for the larger feature cards
- Sidebar stacks link items vertically with smaller, compact styling
- Card styling changes from image-first to text-first:
  - Remove the `aspect-[16/10]` image container
  - Add `rounded-xl bg-white/[0.04] hover:bg-white/[0.08]` for the subtle tile look
  - Title uses `font-serif-display text-sm font-medium`
  - Description uses `font-sans-body text-xs text-muted-foreground`
  - Padding increases to `px-4 py-3.5` for breathing room
- Category description text above the grid is removed (redundant with card descriptions)
- Each side link is a simple `a` tag with title text, styled as a compact row with hover highlight
