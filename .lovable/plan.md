

## Plan: Add Portfolio Carousel to Anthony Gonsalvez Page

The portfolio headline already exists in the data (`"Learn from the Editor Behind these Films"`), but `showPortfolio` is set to `false`. The uploaded images are movie posters from films Anthony edited.

### Changes

1. **Save 7 poster images** as assets in `src/assets/portfolio/`:
   - `user-uploads://image-129.png` → `src/assets/portfolio/sarvam-thaala-mayam.png`
   - `user-uploads://image-130.png` → `src/assets/portfolio/i-shankar.png`
   - `user-uploads://image-131.png` → `src/assets/portfolio/kaakha-kaakha.png`
   - `user-uploads://image-132.png` → `src/assets/portfolio/sivaji-the-boss.png`
   - `user-uploads://image-133.png` → `src/assets/portfolio/vaaranam-aayiram.png`
   - `user-uploads://image-134.png` → `src/assets/portfolio/enthiran.png`
   - `user-uploads://image-135.png` → `src/assets/portfolio/yennai-arindhaal.png`
   - `user-uploads://image-136.png` → `src/assets/portfolio/stalin.png`

2. **`src/pages/MasterclassDetail.tsx`**: Import the 8 new poster images and create an `anthonyPortfolioImages` array. Update the portfolio logic to use Anthony-specific images when on his page (similar to how `defaultPortfolioImages` works for Venket Ram).

3. **`src/data/masterclassPages.ts`**: Set `showPortfolio: true` for the Anthony entry (line 325). The headline is already correct.

The carousel will reuse the existing infinite ticker implementation — no new components needed.

