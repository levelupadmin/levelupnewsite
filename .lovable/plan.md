

## Standardise Navbar Dropdown Card Sizes

**Problem**: Masterclasses (7 items) renders in a 4-column grid, while LevelUp Live (4 items) and The Forge (3 items) render in a 3-column grid. This makes the cards different widths across sections.

### Change in `src/components/Navbar.tsx`

**Line 89** — Remove the conditional grid logic and always use 4 columns:

```
// Before
const gridCols = activeItems.length > 4 ? "grid-cols-4" : "grid-cols-3";

// After
const gridCols = "grid-cols-4";
```

This gives every dropdown card the same width regardless of section. LevelUp Live (4 items) fills the row perfectly. The Forge (3 items) will occupy 3 of 4 columns, leaving one empty — consistent with Masterclasses' last row which also has 3 items in 4 columns.

Single line change. Desktop only — mobile already uses a uniform 2-column grid.

