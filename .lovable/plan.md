

## Visual Layout Change: Stats + Features → Two-Column Split Layout

The uploaded sketch shows a different layout from what the user's text describes. The sketch shows:
- **Left column**: Stats stacked vertically (7 Cities, 11 Editions, 248 Shortfilms)
- **Center**: A vertical divider line with a small decorative element
- **Right column**: Feature points stacked vertically

However, the user's **text instructions** say:
- Feature cards in a horizontal 3-column grid **above** the stats
- Stats in a single horizontal row, evenly spaced, centered

The text and the image contradict each other. The image clearly shows a two-column split with a vertical divider. The text says horizontal rows. Since the image is the newer upload attached to this message, I will follow the **image layout** (two-column split with vertical divider) as the intended design.

### File: `src/components/ForgeSection.tsx`

**Replace lines 178-207** (the feature points grid + stats row) with a two-column layout:

1. **Outer container**: `flex` row with `max-w-3xl mx-auto`, items stretched vertically
2. **Left column** (~1/3 width): Stats stacked vertically with spacing, left-aligned within their column but centered overall. Each stat: large bold number + label below
3. **Center divider**: `w-px bg-muted-foreground/20 self-stretch mx-8` — a thin vertical line
4. **Right column** (~2/3 width): Three feature points stacked vertically with spacing, each showing icon + bold title + description, left-aligned
5. **Mobile**: Stack vertically — stats as a horizontal row, then features below (graceful fallback)

No changes to wording, colors, functionality, or any other section. The carousel below remains untouched.

