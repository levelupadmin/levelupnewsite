

## Restructure Wall of Love Page: Separate Sections + Medium-Style Student Stories

The user wants two visually distinct sections on this page:
1. **Wall of Love** — the reviews/testimonials (hero, marquee, stats, featured reviews, masonry grid)
2. **Student Stories** — repositioned as a separate, Medium/blog-style editorial section with its own visual identity

### Changes

**1. Visual Separation Between Sections** (`src/pages/Reviews.tsx`)
- Add a clear visual break between the Wall of Love reviews section and the Student Stories section
- Give Student Stories its own full-width background treatment (e.g., slightly different background tone or a subtle divider) to make it feel like a distinct destination
- Add a distinct editorial header for Student Stories — something like "Stories" or "The Journal" with a tagline like "Long-form stories worth reading" in a more blog/editorial style

**2. Medium-Style Student Stories Layout** (`src/pages/Reviews.tsx` — `StudentStoriesSection`)
- Redesign the section to feel like a Medium-style blog listing:
  - Clean, generous whitespace with a centered narrow column (max-w-3xl)
  - Each story renders as a **horizontal card** (image-less, text-forward): title on the left, metadata on the right — resembling Medium article previews
  - Show: title (large serif), excerpt (2-3 lines), author name, program pill, reading time, and a subtle separator between entries
  - The hero/featured story at the top gets extra prominence: larger title, longer excerpt
- Remove the current 3-column grid layout in favor of a **single-column vertical list** (the Medium pattern)
- Keep the animated filter pills but style them more subtly (underline-based tabs instead of filled pills) to match the editorial feel

**3. Wall of Love Header Fix** (`src/pages/Reviews.tsx`)
- Ensure "Wall of Love" heading is prominent and clearly the page title
- Student Stories heading should use a different visual treatment (e.g., different weight, a "publication" feel with a thin rule above and below)

### Layout Flow
```text
NAVBAR
──────────────────────────────────

  "Wall of Love"  (hero, gradient text)
   subtitle + marquee + stats

  ── Featured Reviews ──
  [Editorial review cards]

  ── Sticky Filter Bar ──
  [Masonry review grid]

══════════════════════════════════
  VISUAL BREAK (bg change + divider)
══════════════════════════════════

  ─── thin rule ───
  "Student Stories"  (editorial serif, different style)
  "Long-form journeys worth reading"
  
  [ All ] [ Filmmaking ] [ Screenwriting ] ...
           (underline-style tabs)

  ┌─────────────────────────────┐
  │ FEATURED STORY              │
  │ Large serif title           │
  │ 3-line excerpt...           │
  │ Author · Program · 5 min   │
  └─────────────────────────────┘
  ─── separator ───
  ┌─────────────────────────────┐
  │ Story title (serif)         │
  │ 2-line excerpt...           │
  │ Author · Program · 3 min   │
  └─────────────────────────────┘
  ─── separator ───
  ... more stories ...

  CTA Section
  FOOTER
```

### Files Modified
- `src/pages/Reviews.tsx` — restructure `StudentStoriesSection` to Medium-style vertical list, add visual separation, update headers
- `src/components/stories/StoryCard.tsx` — may add an alternate "list" variant for the vertical layout (or inline the new design directly in the section)

