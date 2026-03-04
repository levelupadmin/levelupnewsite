

## Replace masters group photo in Trusted CTA section

**Change**: Copy the uploaded image to `src/assets/` and update `TrustedCTASection.tsx` to use it instead of the current lovable-uploads image.

1. Copy `user-uploads://Masterclass_2.png` to `src/assets/all-masters-new.png`
2. In `src/components/TrustedCTASection.tsx`, update the `<img>` src from the lovable-uploads path to an imported asset reference

