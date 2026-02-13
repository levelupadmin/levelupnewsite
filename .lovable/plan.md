
## Add Warm Gradient Background to FAQ Section

The reference image shows a warm, dark-to-amber gradient at the bottom of the FAQ section, creating a cinematic feel consistent with the site's aesthetic.

### What will change

- A warm gradient overlay will be added to the bottom of the FAQ section, transitioning from transparent at the top to a dark warm brown/amber tone at the bottom
- This will be implemented purely with CSS (no images needed) using a pseudo-element or an absolutely positioned div with a gradient

### Technical details

**File: `src/components/FAQSection.tsx`**
- Add an absolute-positioned gradient div at the bottom of the section
- The gradient will go from `transparent` to a warm dark brown (e.g., `hsl(24, 15%, 8%)` / `hsl(20, 20%, 6%)`) to match the site's orange accent palette
- The gradient will cover roughly the bottom 40-50% of the section, creating the same warm fade effect seen in the reference
- Cards will remain above the gradient via relative positioning
