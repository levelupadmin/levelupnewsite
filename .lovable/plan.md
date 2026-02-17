

# Portfolio-Driven Learning Card: Visual Redesign

## Problem
The current illustration is a single flat SVG clapperboard icon centered in the card. It looks generic and lifeless — completely mismatched with the cinematic, photographic quality of the other cards (Expert Mentors mosaic, Community avatars).

## Solution: Stacked Portfolio Showcase
Replace the SVG with a **fanned stack of real project thumbnails** using existing photographic assets (`forge-1.jpg`, `forge-2.jpg`, `forge-3.jpg`). The layout creates the feeling of a creative portfolio spread out on a table — layered cards with slight rotations, each representing a different type of output (film, edit, script).

### Visual Concept
- **3 stacked "project cards"** fanned out with slight rotations (-4deg, 0deg, 4deg), each using a real photo from the forge/hero assets
- Each mini-card has a subtle **label overlay** at the bottom (e.g., "Short Film", "Showreel", "Scene Edit") to reinforce the portfolio theme
- A warm **amber accent border** on the front-most card
- A cinematic **gradient fade** at the bottom to blend into the card background
- The stack is slightly offset to feel organic, not rigid

### Why This Works
- Uses real imagery instead of abstract icons — matches the Expert Mentors mosaic quality
- The "stacked projects" metaphor directly communicates "portfolio outcomes"
- The labels reinforce what students actually build (films, reels, edits)

## Technical Details

### File: `src/components/why-levelup/LiveProjectsCard.tsx`

Complete rewrite:

- **Imports**: `forge-1.jpg`, `forge-2.jpg`, `forge-3.jpg` as portfolio project thumbnails
- **Layout**: `relative` container with 3 absolutely positioned image cards, each with:
  - `rounded-lg overflow-hidden border border-primary/20 shadow-lg`
  - Slight rotation via `transform: rotate()`
  - Staggered `z-index` so the front card overlaps
  - A small label bar at the bottom of each card (`"Short Film"`, `"Showreel"`, `"Scene Edit"`) using `text-[9px] uppercase tracking-wider` on a dark semi-transparent background
- **Front card accent**: `border-primary/40` for emphasis
- **Gradient overlay**: Bottom fade matching the card's dark background (`hsl(30 40% 12%)`)
- **Sizing**: Cards scale to fill the illustration area (~70% width each, overlapping)

No changes to `WhyLevelUp.tsx` — only the illustration component changes.

