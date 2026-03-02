

## Grain & Colour Tone Update

### Changes

**1. Increase film grain intensity** (`src/index.css`)
- Body `::after` grain overlay: bump opacity from `0.08` → `0.14`, increase `baseFrequency` from `0.85` → `0.75` for coarser texture, and enlarge tile size from `200px` → `256px`
- StarField grain: bump alpha from `32` → `52` (~20% opacity) in `src/components/StarField.tsx`, and increase overlay div opacity from `0.6` → `0.85`

**2. Warmer & richer base palette** (`src/index.css` `:root` variables)
- `--background`: `20 8% 5%` → `22 14% 6%` (more saturation, slight hue shift toward brown)
- `--card`: `20 6% 8%` → `22 12% 9%`
- `--secondary`: `20 5% 12%` → `22 10% 13%`
- `--muted`: `20 5% 12%` → `22 10% 13%`
- `--border`: `20 5% 14%` → `22 8% 15%`
- `--input`: same as border
- `--gradient-cinematic`: update to match new background values
- Vignette (`body::before`): shift to `hsl(22 14% 4% / 0.4)` to match

**3. Section background tokens** (`src/index.css`)
- `--bg-live-programs` and `--bg-forge`: update from `20 8% 5%` → `22 14% 6%` to match

### Files
1. `src/index.css` — palette variables, grain overlay, vignette
2. `src/components/StarField.tsx` — grain alpha and overlay opacity

