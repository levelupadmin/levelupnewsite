

# Redesign: "Why LevelUp" Section (TripleTen-Inspired)

## What Changes

The current "Why serious creators choose LevelUp" section (simple 3 dark cards with text) will be completely replaced with an interactive, expandable card layout inspired by TripleTen's design -- adapted to LevelUp's dark cinematic aesthetic.

## New Layout Structure

### Top: Asymmetric Headline Block
Instead of the current centered headline, the new layout uses a staggered/offset arrangement:
- **Left side**: Large serif headline -- "The most intentional way to learn **the craft.**" (bold on the last words, matching TripleTen's style)
- **Right side (offset lower)**: Supporting paragraph explaining LevelUp's philosophy

### Bottom: 3 Expandable Feature Cards
Three cards in a row, each with a distinct visual treatment. Each card:
- Shows a **headline** (with key words in bold) and an **expand icon** in the top-right corner
- Has unique background styling to differentiate it visually
- On click, **expands** to fill more width and reveals detailed content (description, bullet points, a quote or stat)
- Uses `framer-motion` `AnimatePresence` and `layout` animations for smooth expand/collapse transitions

### Card Details

| Card | Headline | Collapsed Style | Expanded Content |
|------|----------|----------------|-----------------|
| 1 | "Mentors who've **lived the craft**" | Dark background (matches site bg), subtle amber glow | Description of mentors, 3 bullet points (e.g., "Award-winning filmmakers", "Decades of industry experience", "Direct feedback on your work"), a mentor quote |
| 2 | "Practice that **feels real**" | Warm accent background (muted amber/gold tone, similar to TripleTen's peach card) | Description of hands-on approach, 3 bullet points (e.g., "Real sets and equipment", "Deadlines that matter", "Your work gets published"), a stat like "248 short films created" |
| 3 | "A community that **stays**" | Dark background with a subtle background image overlay (one of the existing forge/carousel images at very low opacity) | Description of the ecosystem, 3 bullet points (e.g., "Alumni network across cities", "Ongoing collaborations", "Career support beyond the program"), a stat like "7 cities, 11 editions" |

### Interaction Behavior
- Only one card can be expanded at a time (clicking another collapses the current one)
- On mobile: cards stack vertically, expand inline (full width)
- On desktop: the expanded card takes roughly 50-60% of the row width while the others shrink
- A close (X) button appears in the top-right of the expanded card (replacing the expand icon)
- Navigation arrows at the bottom-right to cycle through expanded cards (desktop only)

## Technical Approach

### Files Modified
- **`src/components/WhyLevelUp.tsx`** -- Complete rewrite of this single component

### No New Files or Dependencies
Everything uses existing tools: `framer-motion` (layout animations, AnimatePresence), Lucide icons (Maximize2, X, ChevronLeft, ChevronRight), and the existing Tailwind design tokens.

### Key Implementation Details

**State Management**:
- `expandedIndex: number | null` -- tracks which card is expanded (null = all collapsed)

**Layout Animation**:
- Uses `motion.div` with `layout` prop for smooth width/height transitions when a card expands
- `AnimatePresence` wraps the expanded content so it fades in/out cleanly

**Responsive Behavior**:
- Desktop (md+): 3-column grid where the expanded card spans wider via CSS grid `col-span` or flex-basis changes
- Mobile: Single column stack, cards expand to show content below the headline

**Styling Tokens** (all from existing palette):
- Card 1 dark bg: `bg-card` or `bg-[hsl(220_12%_9%)]`
- Card 2 warm bg: `bg-[hsl(30_30%_18%)]` with amber tint (adapted from TripleTen's peach to fit dark theme)
- Card 3 dark bg with image: uses an existing asset as a low-opacity background

**Accessibility**:
- `aria-label="Why choose LevelUp"` preserved on the section
- Each card uses `role="button"` and `aria-expanded` attributes
- Expand/collapse is keyboard-accessible (Enter/Space to toggle)
- Expanded content uses `aria-live="polite"` so screen readers announce it

**Animation Timing**:
- Cards enter with staggered scroll-triggered animations (matching existing site patterns)
- Expand/collapse transitions use `duration: 0.5s` with the site's standard easing `[0.25, 0.1, 0.25, 1]`

## Visual Summary

```text
Collapsed state:
+--------------------------------------------------+
|                                                    |
|  The most intentional way        We changed how    |
|  to learn the craft.             creators learn.   |
|                                  Build real skills  |
|                                  with mentors who   |
|                                  built careers.     |
|                                                    |
|  +---------------+ +---------------+ +-----------+ |
|  | Mentors who've| | Practice that | | A community| |
|  | lived the     | | feels real    | | that stays | |
|  | craft    [->] | |          [->] | |       [->] | |
|  |               | |               | |            | |
|  |               | |               | |            | |
|  | (dark)        | | (warm amber)  | | (dark+img) | |
|  +---------------+ +---------------+ +-----------+ |
+--------------------------------------------------+

Expanded state (card 2 open):
+--------------------------------------------------+
|  +------+ +-----------------------------+ +-----+ |
|  |Card 1| | Practice that feels real [X]| |Card3| |
|  |(small)| |                             | |(sm) | |
|  |      | | Description text...         | |     | |
|  |      | | * Real sets and equipment   | |     | |
|  |      | | * Deadlines that matter     | |     | |
|  |      | | * Your work gets published  | |     | |
|  |      | |                      248    | |     | |
|  |      | |                  short films | |     | |
|  +------+ +-----------------------------+ +-----+ |
|                                    [<-] [->]       |
+--------------------------------------------------+
```
