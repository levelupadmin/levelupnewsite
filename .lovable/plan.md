

# Add Soft Outline to Trusted By Section

## What Changes
Add a subtle, soft border/outline around the entire "Trusted by India's best" pre-footer CTA section to visually distinguish it from the surrounding background.

## Technical Details

### File: `src/components/TrustedCTASection.tsx`
- Add a wrapper `<div>` inside the section's `max-w-4xl` container (or apply directly to it) with a soft border using a low-opacity amber/white tone:
  - `border border-white/10 rounded-2xl` for a subtle glowing outline
  - Add `px-8 py-10 md:px-12 md:py-14` padding inside the outlined area
- This keeps the section's outer padding intact while giving the content area a defined, soft boundary.

### No other files change.

