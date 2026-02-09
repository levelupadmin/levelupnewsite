

# Redesign: Student Logos Section (TripleTen-Inspired)

## What Changes

The current `StudentLogosSection` -- an auto-scrolling text marquee with a simple "Our students are from" headline -- will be completely replaced with a static, editorial-style credibility section inspired by the TripleTen screenshot. The new design is bolder, more informative, and eliminates the continuous animation in favor of a composed, high-impact layout.

## New Layout Structure

### Top: Bold Impact Headline
A large, centered serif headline with strategic bold emphasis -- adapted for LevelUp's creative education context:

> "The creative industry is competitive. **Your growth doesn't have to wait.**"

### Middle: Two Large Stat Callouts
Two prominent statistics displayed side-by-side (centered), using animated counters (reusing the existing `AnimatedCounter` pattern from `CredibilityCues`):

| Stat | Value | Description |
|------|-------|-------------|
| Left | **57,600+** | learners have enrolled across masterclasses, live programs, and residencies |
| Right | **11** | editions of The Forge across 7 cities |

### CTA Link
A centered underline-style link below the stats:
> "See what our alumni are building" with an external-link icon -- uses the existing `cta-underline` utility class

### Bottom: Brand/Institute Grid
- Subheadline: **"Our students come from top studios, institutes, and platforms"**
- A responsive grid of brand names (3 columns on mobile, 6 on desktop) displayed as styled text
- Each brand name is rendered in uppercase with wide tracking, consistent with the existing aesthetic but laid out in a clean grid instead of a scrolling marquee
- Brands are grouped into visual rows with subtle opacity variation for depth

## Visual Layout

```text
+------------------------------------------------------+
|                                                        |
|     The creative industry is competitive.              |
|     Your growth doesn't have to wait.                  |
|                                                        |
|         57,600+                11                      |
|     learners enrolled    editions of The Forge         |
|                          across 7 cities               |
|                                                        |
|        See what our alumni are building [->]           |
|                                                        |
|   Our students come from top studios, institutes,      |
|               and platforms                            |
|                                                        |
|   FTII       NID        Whistling    YRF       Excel   |
|                         Woods                  Ent.    |
|   TVF        Google     Amazon       Viacom18  Dharma  |
|                         Prime                          |
|   Red        Adobe                                     |
|   Chillies                                             |
+------------------------------------------------------+
```

## Technical Details

### File Modified
- **`src/components/StudentLogosSection.tsx`** -- Complete rewrite of this single component

### No New Dependencies
Reuses `framer-motion` (already installed) for scroll-triggered fade-in and animated counters. Uses the existing `cta-underline` CSS utility and Tailwind design tokens.

### Key Implementation Details

**Animated Counters**: A simplified counter component (similar to the one in `CredibilityCues.tsx`) will animate the two stat values when they scroll into view, using `useInView` from Framer Motion.

**Responsive Grid for Brands**:
- Mobile: 3-column grid with centered text
- Tablet: 4-column grid
- Desktop: 6-column grid
- Each brand name uses the existing `font-sans-body uppercase tracking-[0.15em] text-muted-foreground` styling

**Scroll Animations**:
- Headline fades in first
- Stats animate in with a slight stagger (0.15s delay between left and right)
- CTA link fades in after stats
- Brand grid rows enter with staggered delays per row

**Accessibility**:
- Section `aria-label` updated to reflect the new content
- CTA link includes proper `aria-label` for the external link icon
- Stats use `tabular-nums` for aligned number rendering

### Styling Approach
- Background remains `bg-background` to match the surrounding sections
- Headline uses `font-serif-display` with the bold portion wrapped in a `<strong>` tag
- Stats use a large `text-4xl md:text-6xl` serif font for the values, matching the TripleTen reference's dramatic sizing
- Brand grid items have a subtle `hover:text-foreground` transition for interactivity
- A thin `h-px bg-border` separator sits above and below the section for visual separation

