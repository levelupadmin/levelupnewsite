

## Plan: Replace Anthony's Pricing Section Image

The pricing card currently falls back to `heroBgImage` since no `pricingImage` is set for Anthony. 

### Changes

1. **Copy** `user-uploads://image-126.png` to `src/assets/anthony-pricing.png`

2. **`src/data/masterclassPages.ts`**: Import the new image and add `pricingImage: anthonyPricing` to the Anthony Gonsalvez data entry (~line 283)

No other images or sections will be affected.

