

## Merge Student Stories into Wall of Love (Single Page)

### What changes

Instead of two separate pages (`/reviews` and `/student-stories`), combine everything onto `/reviews`. The Student Stories section currently shows only 3 cards with a "Read all stories" link — we will replace that with the full filterable Student Stories grid directly on the page.

### Changes

**`src/pages/Reviews.tsx`** (lines 635-656)
- Replace the current 3-card teaser section with the full Student Stories content from `StudentStoriesIndex.tsx`:
  - Add program filter state for stories (separate from review filters)
  - Show all stories in a filterable grid with program filter pills
  - Remove the "Read all stories →" link (no longer needed)
  - Add a "Student Stories" heading styled consistently with "Featured Reviews"

**`src/App.tsx`**
- Remove the `/student-stories` route (the index page route only — keep `/student-stories/:slug` for individual articles)
- Remove the lazy import for `StudentStoriesIndex`

**`src/pages/StudentStoriesIndex.tsx`**
- Delete this file (content merged into Reviews)

### Layout order on `/reviews`
1. Hero + Marquee
2. Stats Banner
3. Featured Reviews
4. **Student Stories** (full grid with program filters) — expanded from the current 3-card teaser
5. Sticky Filter Bar (for reviews)
6. Reviews Masonry Grid
7. CTA Section

