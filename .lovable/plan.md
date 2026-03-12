

## Option A: Spacing and Scale Refinements

### Changes to `src/pages/MasterclassDetail.tsx` (lines 436–509)

1. **Increase section padding** — `py-16 md:py-24` → `py-24 md:py-32`
2. **Push corner labels to edges** — Add `px-4 md:px-12` to the top/bottom grid rows so labels sit at the outer edges of the section
3. **Enlarge concentric rings** — Change ring sizes from `[320, 480, 640, 800, 960]` to `[400, 600, 800, 1000, 1200]` to fill more background
4. **Increase icon size** — `w-6 h-6` → `w-7 h-7` on all 4 icons
5. **Increase text size** — `text-sm` → `text-base` on all 4 feature labels
6. **More spacing around device image** — `my-6 md:my-10` → `my-10 md:my-16`

### Files Modified
- `src/pages/MasterclassDetail.tsx` (section 9, ~lines 437–501)

