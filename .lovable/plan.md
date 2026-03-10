

## Convert Live Programs to Single-Card-at-a-Time View

### What Changes
Replace the vertically stacked 5-card layout with a **tab-style single-card display**. The pill filters ("Make Films", "Edit Videos", etc.) become the primary navigation -- clicking one shows only that program's card. This eliminates all vertical scrolling through programs.

### Layout

```text
┌─────────────────────────────────────────────┐
│  LevelUp LIVE  (pill label)                 │
│  Stop Watching. Start Making.               │
│  Subheadline text                           │
│                                             │
│  ┌─────┬─────┬─────┬─────┬─────┐           │
│  │Stats│Stats│Stats│Stats│Stats│           │
│  └─────┴─────┴─────┴─────┴─────┘           │
│                                             │
│  I want to...                               │
│  [Make Films] [Edit Videos] [Creator] ...   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  ┌────────────┬─────────────────┐    │   │
│  │  │  IMAGE     │  TAG             │    │   │
│  │  │  (40%)     │  HEADLINE        │    │   │
│  │  │            │  One-liner       │    │   │
│  │  │            │  Stats pills     │    │   │
│  │  │            │  ✓ Bullet 1      │    │   │
│  │  │            │  ✓ Bullet 2      │    │   │
│  │  │            │  ✓ Bullet 3      │    │   │
│  │  │            │  [CTA Button]    │    │   │
│  │  └────────────┴─────────────────┘    │   │
│  │         • • • • •  (dot indicators)  │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ── Testimonial Marquee ──                  │
│  Bottom CTA                                 │
└─────────────────────────────────────────────┘
```

### File: `src/components/LiveProgramsSection.tsx`

**Key changes:**
- **Pills become tabs**: First pill ("Make Films" / BFP) is active by default. Clicking a pill sets `activeProgram` state instead of scrolling.
- **Show one card**: Instead of mapping all `showcasePrograms`, render only `showcasePrograms[activeIndex]`. Use `AnimatePresence` + `motion.div` from framer-motion for a smooth crossfade/slide transition when switching.
- **Dot indicators**: Add a row of 5 small dots below the card showing which program is active. Dots are clickable.
- **Arrow navigation**: Add left/right arrow buttons on the card edges (hidden on mobile, visible on desktop) to cycle through programs.
- **Swipe on mobile**: Use touch event handlers (`onTouchStart`/`onTouchEnd`) for swipe-to-navigate between cards.
- **Auto-advance** (optional): No auto-play -- user controls navigation. Keeps it intentional.
- **Remove `scrollIntoView` logic** and `cardRefs` -- no longer needed since only one card is visible.

**Animation**: When switching programs, the outgoing card fades/slides out left, incoming card fades/slides in from right (or vice versa depending on direction). Use framer-motion `AnimatePresence` with `mode="wait"` and `key={activeProgram.id}`.

### No changes to `src/data/programs.ts`
Data structure remains the same.

### Technical Notes
- Section height becomes fixed/consistent (one card height) instead of growing with 5 stacked cards
- Keyboard accessible: arrow keys cycle programs when pills are focused
- All existing content (intro, stats, marquee, bottom CTA) stays unchanged
- JSON-LD schema still includes all 5 programs for SEO

