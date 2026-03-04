

## Fix navbar links to point to correct destinations

### Problem
Several navbar links point to incorrect or non-existent targets:

1. **Masterclasses top-level link** (in `navLabels` fallback) points to `https://www.leveluplearning.in/#masterclasses` instead of the on-page `#masterclasses` section
2. **LevelUp Live dropdown items** (BFP, VE, UI/UX, SW) link to `#live-bfp`, `#live-ve`, `#live-uiux`, `#live-sw` — these anchor IDs don't exist anywhere on the page. The section only has `id="live-programs"`
3. **Forge dropdown items** all link to `#forge` which is correct but all three point to the same anchor (acceptable since there's one Forge section)

### Changes

**1. `src/components/Navbar.tsx` (line 13)**
Change the Masterclasses fallback href from `https://www.leveluplearning.in/#masterclasses` to `#masterclasses` so it scrolls to the on-page section.

**2. `src/components/navbarData.ts` (lines 93-116)**
Change all four LevelUp Live item hrefs from `#live-bfp` / `#live-ve` / `#live-uiux` / `#live-sw` to their actual external CTA links from `programs.ts`:
- BFP → `https://www.leveluplearning.live/bfp-2`
- VE → `https://www.leveluplearning.live/ve`
- UI/UX → `https://tally.so/r/wd7eqN`
- SW → `https://tally.so/r/mOd4ek`

This matches the pattern used by Masterclass items (which already link to their external pages).

