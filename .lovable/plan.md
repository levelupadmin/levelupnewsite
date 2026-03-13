

## Plan: Add Portfolio Ticker to DRK Kiran Page

### Assets
Copy 7 uploaded movie poster images to `src/assets/portfolio/`:
- `image-141.png` → `doctor-poster.png`
- `image-142.png` → `beast-poster.png`
- `image-143.png` → `jailer-poster.png`
- `image-144.png` → `naanum-rowdy-dhaan-poster.png`
- `image-145.png` → `3-poster.png`
- `image-146.png` → `thaanaa-serndha-koottam-poster.png`
- `image-147.png` → `aranmanai-poster.png`

### Data Change (`src/data/masterclassPages.ts`)
1. Import all 7 poster images
2. In the `drk-kiran` entry:
   - Set `showPortfolio: true`
   - Set `portfolioImages` to the array of imported poster assets
   - `portfolioHeadline` is already set to "Learn from the Art Director Behind these Films"

No other files need changes — the `MasterclassDetail.tsx` template already renders the infinite ticker section when `showPortfolio` is true.

