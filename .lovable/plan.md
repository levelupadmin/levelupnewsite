

# Fix "Why LevelUp" Section for Mobile

## The Problem

The "Why LevelUp" section with its three expandable cards currently looks cramped and unpolished on mobile. The cards are small, the expanded content feels squeezed, and the overall experience doesn't match the editorial quality of the rest of the site.

## Reference: TripleTen Mobile Pattern

From the screenshots you shared, TripleTen uses a very different approach on mobile:

- **Collapsed cards** are tall, full-width blocks with a bold headline, supporting description, and a "Learn more" CTA button at the bottom -- they feel like standalone content panels, not just expandable triggers
- **Expanded cards** take over nearly the full screen as an overlay/modal -- large headline at the top with a close (X) button, then a scrollable content area with description, bullet items (styled as bordered list cards), and a stat+quote section at the bottom
- The overall feel is spacious, with generous padding and clear visual hierarchy

## Proposed Solution

Redesign the mobile experience of the "Why LevelUp" section to follow a similar pattern, while keeping the desktop expandable card behavior as-is.

### Mobile Collapsed State (New Design)

Each card becomes a full-width, taller panel:

- **Height**: Minimum ~280px to feel substantial (up from ~220px)
- **Background**: Keep the existing card backgrounds with their gradient overlays
- **Content**: Show the headline, the description text (currently hidden when collapsed), and a "Learn more" button at the bottom
- **Remove**: The small expand icon in the corner -- replace with a clear "Learn more" text button with an arrow

### Mobile Expanded State (Full-Screen Overlay)

When tapped on mobile, the card expands into a full-screen overlay:

- **Overlay style**: Fixed position, full viewport, same card background color, with a close (X) button in the top-right corner
- **Scrollable content**: If the content exceeds the viewport, it scrolls naturally within the overlay
- **Content layout from top to bottom**:
  1. Headline (large serif, same as collapsed)
  2. Description paragraph
  3. Bullet items styled as bordered list cards (like TripleTen's "Theory - 15 min" cards) -- each bullet gets its own bordered row
  4. Stat highlight section at the bottom: large serif number on the left with a supporting label

### Desktop Behavior (Unchanged)

The desktop expandable card row with flex basis animation stays exactly the same.

## Technical Details

### File Modified
- **`src/components/WhyLevelUp.tsx`** -- mobile-specific restructuring

### Key Changes

**1. Collapsed mobile cards** (lines 183-320 area):
- Increase `minHeight` from 220 to 280 on mobile collapsed
- Show `card.description` text even in collapsed state (mobile only)
- Replace the `Maximize2` icon with a styled "Learn more" text button with arrow icon
- Add more bottom padding so the "Learn more" button has breathing room

**2. Expanded mobile cards** -- switch from inline expand to full-screen overlay:
- When `isExpanded && isMobile`, render a `motion.div` with `fixed inset-0 z-50` (full-screen overlay)
- Background matches the card's `cardBgClasses[i]` so it feels like the card grew to fill the screen
- Close button (X) in top-right corner: `absolute top-6 right-6`, same circular border style
- Content inside the overlay:
  - Top section: headline + description with generous padding (`px-6 pt-16 pb-8`)
  - Bullet items: Each rendered as a bordered card row (`border border-border/30 rounded-sm p-4`) stacked vertically with small gaps, instead of plain dot-prefixed list items
  - Bottom section: Stat highlight with the large number and label, with a top border separator
- Overlay scrolls via `overflow-y-auto` if content exceeds the viewport
- Entry animation: `initial={{ opacity: 0, y: 40 }}` to `animate={{ opacity: 1, y: 0 }}`
- Backdrop: Optional subtle dark overlay behind (since the card bg is already dark, this may not be needed)

**3. Body scroll lock** (when overlay is open on mobile):
- Add `useEffect` that sets `document.body.style.overflow = 'hidden'` when a card is expanded on mobile
- Resets on close

### Card Content for Bullet Rows

Each bullet will be styled like a content card row (inspired by TripleTen's "Theory - 15 min" cards):

```
+----------------------------------------+
| Award-winning filmmakers and editors   |
+----------------------------------------+
| Decades of industry experience         |
+----------------------------------------+
| Direct, honest feedback on your work   |
+----------------------------------------+
```

Each row: `border border-border/30 rounded-sm px-4 py-3.5`, with `font-sans-body text-sm text-foreground/80`.

### Stat + Highlight Section

At the bottom of the overlay, a section with:
- Large serif stat value (e.g., "40+") on the left
- Label text ("industry mentors") beneath or beside it
- Separated from bullets by a `border-t border-border/30` with `pt-6 mt-6`

### Animation Details

- **Overlay enter**: `opacity: 0, y: 40` to `opacity: 1, y: 0` over 0.4s
- **Overlay exit**: `opacity: 0, y: 20` over 0.3s
- **Bullet rows stagger**: Each row animates in with a 0.08s stagger delay (same as current)
- **Desktop behavior**: Completely unchanged -- the `isMobile` check gates all overlay logic

### No New Dependencies
All changes use existing Framer Motion and Tailwind utilities.

