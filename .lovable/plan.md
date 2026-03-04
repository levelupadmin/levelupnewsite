

## Making the Student Stories Section Visually Stunning

Currently, the Student Stories section is a plain grid of text-only cards with minimal visual hierarchy. Here's how to elevate it:

### Changes

**1. Featured Story Hero Card** (`src/pages/Reviews.tsx` — `StudentStoriesSection`)
- Make the first story in the filtered list render as a **large hero card** spanning full width, with a gradient overlay, larger typography, and a prominent pull-quote from the first section body.
- Remaining stories render in the existing 2/3-column grid below.

**2. Upgraded StoryCard Design** (`src/components/stories/StoryCard.tsx`)
- Add a **program-colored top accent bar** (4px gradient strip at the top of each card) using program-specific colors.
- Add a subtle **hover glow effect** matching the program color (consistent with the site's interactive glow motif).
- Add a **decorative quote icon** (faint, positioned top-right) to reinforce the editorial feel.
- Increase card padding and add a subtle inner shadow for depth.
- Add a **rating display** (star icons) since stories have ratings but don't currently show them on cards.

**3. Section Header Enhancement** (`src/pages/Reviews.tsx` — `StudentStoriesSection`)
- Replace the plain "Student Stories" label with a more editorial-style header: larger serif font with a subtitle line.
- Add a thin decorative `AccentLine` divider above the section for visual separation.

**4. Animated Filter Pills** (`src/pages/Reviews.tsx` — `StudentStoriesSection`)
- Wrap the filter pill transitions with `AnimatePresence` + `layoutId` so the active pill indicator slides smoothly between options instead of snapping.

### Layout Flow
```text
──── AccentLine divider ────
   "Student Stories" (serif, larger)
   "Long-form journeys from our community"
   [ All ] [ Filmmaking ] [ Screenwriting ] ...

┌─────────────────────────────────────────┐
│  HERO CARD (first story, full width)    │
│  Gradient bg · Large title · Pull-quote │
│  Author · Program badge · Arrow →       │
└─────────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ Card 2   │ │ Card 3   │ │ Card 4   │
│ accent   │ │ accent   │ │ accent   │
│ bar+glow │ │ bar+glow │ │ bar+glow │
└──────────┘ └──────────┘ └──────────┘
```

### Files Modified
- `src/components/stories/StoryCard.tsx` — accent bar, hover glow, quote icon, rating stars
- `src/pages/Reviews.tsx` — `StudentStoriesSection` gets hero card layout, enhanced header, animated pills

