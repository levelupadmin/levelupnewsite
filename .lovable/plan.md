

## Update FAQ Section Background Gradient

### What will change

The existing bottom gradient overlay in the FAQ section will be replaced with a fuller vertical gradient that incorporates the site's orange/amber tones, matching the reference image. The gradient will span the entire section height, going from the dark background at the top to a warm orange-brown at the bottom.

### Technical details

**File: `src/components/FAQSection.tsx`**

- Update the existing gradient overlay div to cover a larger portion of the section (from ~50% to ~70-80%)
- Adjust the gradient colors to include a more visible warm orange tone, using multi-stop gradients:
  - `transparent` at top
  - `hsl(24 20% 8%)` mid-way (subtle warm tint)
  - `hsl(20 30% 7%)` near bottom (deeper orange-brown)
  - `hsl(18 35% 6%)` at bottom (rich warm dark)
- All FAQ cards, text, layout, and functionality remain completely unchanged

