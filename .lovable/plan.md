

# Remove Name Tags from Masterclass Cards

## What changes
In `src/components/MasterclassSection.tsx`, remove the name overlay and bottom gradient from each masterclass card in the `MasterclassCard` component.

## Details
- Remove the bottom gradient div (`h-1/3 bg-gradient-to-t from-black/60`)
- Remove the name text div (`mc.name` paragraph at the bottom of each card)
- Keep everything else (parallax, hover effects, ring glow, image) as-is

