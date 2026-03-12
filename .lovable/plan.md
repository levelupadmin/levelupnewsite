

## Add Janani Profile Image & Fix Testimonial Card Spacing

### Changes

1. **Copy uploaded image** — Save `2nd-new-circle-img.png` as `src/assets/testimonial-janani.png`

2. **Update data** (`src/data/masterclassPages.ts`)
   - Import `testimonialJanani` from the new asset
   - Add `image: testimonialJanani` to Janani's testimonial entry (line 156)

3. **Fix uniform spacing in testimonial cards** (`src/pages/MasterclassDetail.tsx`, lines 386-402)
   - Change the card layout so the bottom name/avatar row is always pushed to the bottom using `flex flex-col justify-between h-full` on each card
   - This ensures all 3 cards have the name row at the same vertical position regardless of quote length
   - All 3 cards will now show a circular avatar since all have images

### Files Modified
- `src/assets/testimonial-janani.png` (new)
- `src/data/masterclassPages.ts` (add import + image field)
- `src/pages/MasterclassDetail.tsx` (card layout for uniform bottom alignment)

