

# Redesign FAQ Section: Bento Card Grid Layout

## Current State
The FAQ section uses a single-column accordion layout where only one answer is visible at a time. Questions must be clicked to expand.

## What Changes
Replace the accordion-based FAQ with a **bento-style card grid** inspired by the reference image, where all questions and answers are always visible in a multi-column masonry-like layout.

### Design Details

**Layout:**
- Left-aligned "Frequently asked questions" headline (no centered separator)
- 3-column responsive grid (1 col on mobile, 2 on tablet, 3 on desktop)
- Cards naturally vary in height based on content length, creating an organic bento feel

**Card Style:**
- Rounded corners with a subtle border (`border-border`)
- Generous internal padding
- Bold question in serif display font
- Answer text in sans-serif body font, muted color
- No hover effects or interactivity -- pure reading cards

**Responsive Behavior:**
- Mobile: single column stack
- Tablet (sm): 2-column grid
- Desktop (lg): 3-column grid

**Retained Elements:**
- Same 8 FAQ items with identical copy
- Same `py-12 md:py-16` section padding
- Same ambient glow background
- Framer Motion scroll-triggered fade-in (staggered per card)
- "Still have questions? Reach out to us" CTA at the bottom

### What Gets Removed
- The Radix accordion component (no longer needed)
- The centered thin separator line
- The centered headline alignment (moves to left-aligned)

---

## Technical Details

### Modified File
- `src/components/FAQSection.tsx` -- Complete rewrite from accordion to card grid

### Implementation Approach
- Remove `Accordion` imports, replace with a CSS grid of static cards
- Use `columns-1 sm:columns-2 lg:columns-3 gap-4` CSS multi-column or a standard grid layout
- Each card is a `div` with `rounded-lg border border-border p-6` styling
- Staggered `framer-motion` entrance animations per card
- Headline uses `text-left` alignment instead of `text-center`
- Container expands from `max-w-3xl` to `max-w-6xl` to accommodate the wider grid

