

## Fix: Portfolio-Driven Learning Card (Card #2) Overflow and Spacing

The second card ("Portfolio-Driven Learning" with `LiveProjectsCard`) is overflowing in its expanded state. The illustration bleeds past the card boundary because the `2fr_3fr` grid gives the right column too much space relative to the container, and the illustration wrapper lacks overflow constraints.

### Changes in `src/components/WhyLevelUp.tsx`

**Only targeting features[1] behavior — no changes to the other two cards.**

1. **Add `overflow-hidden` to the illustration wrapper** (line 200) — the `<div className="flex-1 flex items-center justify-center min-h-0 pb-4">` that wraps `<Illustration />` in the expanded left column needs `overflow-hidden` so `LiveProjectsCard`'s internal content clips properly.

2. **Constrain the expanded grid proportions** — Change `grid-cols-[2fr_3fr]` (line 194) to `grid-cols-[2fr_3fr]` → `grid-cols-2` (equal columns) so the illustration and text each get 50% width, preventing the text column from pushing content out of bounds.

3. **Standardize expanded padding** — The compressed state uses `p-7 md:p-10` while expanded uses `p-6 md:p-8`. Align the expanded state to `p-6 md:p-8` consistently (already the case, so just confirm no drift).

4. **Add `overflow-hidden` to the card's outer flex container** (line 128-141) — ensure `overflow-hidden` is on the card wrapper div so nothing escapes the rounded corners.

### Files

| File | Change |
|------|--------|
| `src/components/WhyLevelUp.tsx` | Add `overflow-hidden` to illustration wrapper, change expanded grid to equal columns, ensure card wrapper clips overflow |

