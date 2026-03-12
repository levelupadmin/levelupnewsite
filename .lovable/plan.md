

## Make Corner Feature Icons Consistent & Bigger

The 4 corner labels in the "Watch on Any Device" section need consistency. Currently the bottom-left "Pay Once, Play Forever" uses a horizontal layout while the other three use vertical (icon above text). All icons are `w-7 h-7`.

### Changes in `src/pages/MasterclassDetail.tsx`

1. **All 4 icons**: Increase from `w-7 h-7` to `w-9 h-9` (lines 464, 468, 484, 488)
2. **Bottom-left label** (line 483): Change from `flex items-center gap-2` (horizontal) to `flex flex-col items-center md:items-start gap-1` (vertical, matching the others)
3. **Reduce gap** on all 4 labels from `gap-2` to `gap-1` so icons sit closer to text

### Files Modified
- `src/pages/MasterclassDetail.tsx` — lines 461–490 only

