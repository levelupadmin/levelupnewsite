

## Use Uploaded Image in Pricing CTA Section

### Change

In `src/pages/MasterclassDetail.tsx` (line 544), replace the instructor card image source from `data.portraitImage` to a new dedicated asset.

1. **Copy uploaded image** → `src/assets/gvr-hero-bg.png` (already exists, so use a new name like `src/assets/gvr-pricing.png`)
2. **Import** the new asset in `MasterclassDetail.tsx`
3. **Replace** `data.portraitImage` on line 544 with the new import

### Files Modified
- `src/assets/gvr-pricing.png` (new — copied from upload)
- `src/pages/MasterclassDetail.tsx` (import + line 544 image src)

