

## Condense "Student Stories" and "Careers" into a "More" Dropdown

Currently, "Student Stories" and "Careers" are separate top-level nav links (indices 3 and 4) with no dropdown items. We'll merge them into a single "More" label with a minimal dropdown.

### Changes

**1. `src/components/navbarData.ts`**
- Remove the standalone "Student Stories" and "Careers" entries
- Add a new "More" entry with two simple items (no images):
  - Student Stories → `/student-stories`
  - Careers → `/careers`

**2. `src/components/Navbar.tsx`**
- Update `navLabels` array: replace the two entries with a single `{ label: "More", href: "#" }`
- For the "More" dropdown on desktop: detect when the active link has items but no images (or a flag like `compact: true`), and render a compact text-only dropdown list instead of the image card grid. This will be a simple vertical list with link labels, styled with the same accent line and frosted glass panel.
- On mobile: the existing accordion expand logic already handles items with sub-links — it will just show the two text links without image cards (since items won't have images).

**3. Desktop compact dropdown rendering (inside the expandable panel)**
- Add a condition: if `activeItems` exist but none have images (or the link has a `compact` flag), render a narrow text list instead of the 4-column card grid:
```text
┌──────────────────────────────┐
│  More                        │
│  ─────────────────────────── │
│  Student Stories              │
│  Careers                      │
└──────────────────────────────┘
```
- Style: `flex flex-col gap-1`, each item as a link with `text-sm text-muted-foreground hover:text-foreground` and left accent border on hover.

**4. Mobile compact rendering**
- When expanded, skip the image grid and render a simple list of text links with the category accent left-border styling.

### Files to Edit
1. `src/components/navbarData.ts` — restructure last two entries into "More"
2. `src/components/Navbar.tsx` — add compact dropdown variant, update `navLabels`

