

## Replace Why LevelUp Cards with New Design

### Overview
Replace the current expandable bento-style cards in the Why LevelUp section with the new component design that uses glowing shape images, a cleaner expand/collapse pattern, and updated data structure.

### What Changes

**1. Add 3 new image assets**
The new design references three glow shape images that need to exist in `src/assets/`:
- `shape-mentors-glow.png`
- `shape-practice-unique.png`
- `shape-community-unique.png`

These will need to be uploaded by you. Without them, the cards will show broken images. If you don't have them yet, placeholder images can be used temporarily.

**2. Rewrite `src/components/WhyLevelUp.tsx`**
- Replace the current card data (`cards` array) with the new `features` array that includes `expandedDescription`, updated bullets, optional `stat`/`statLabel`, and an `image` field for each card
- Remove the old background image system (`why-bg-1/2/3.png`, `cardBgImages`, `cardBgClasses`, `cardTopGradients`, `cardGlows`)
- Remove the `MobileOverlay` component and desktop navigation arrows
- Implement the new card layout:
  - **Collapsed state**: Title with expand icon at top, centered glow image in the middle (hidden when any card is expanded), truncated description at bottom
  - **Expanded state**: Title with close (X) button, expanded description, bullet list with checkmark dots, and optional stat at bottom
- Keep the same section heading ("The most intentional way to learn the craft") and subtitle
- Cards use a dark glass-like background (`bg-[#0a0a0a]` with border) instead of photographic backgrounds
- Layout remains a 3-column row on desktop, vertical stack on mobile

### Technical Details

- The existing `useIsMobile` hook, `motion`/`AnimatePresence` from framer-motion, and `X`/`Maximize2` from lucide-react are retained
- The mobile overlay with drag-to-close is removed in favor of the simpler inline expand/collapse on all screen sizes
- The container width stays at `max-w-7xl` to match the current section
- Card minimum height changes from 460px to ~420px with the new simpler layout

