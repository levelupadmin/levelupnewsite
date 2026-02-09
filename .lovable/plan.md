

# Use Uploaded Image as Hero Background

## Approach
Replace all the synthetic CSS/SVG grain and texture layers with the uploaded image as a full-cover background. This is the simplest and most accurate way to match the look — use the actual image directly.

## Steps

1. **Copy the uploaded image** to `src/assets/hero-bg.png`

2. **Simplify `src/components/HeroSection.tsx`**:
   - Remove all synthetic texture layers (grid, star dots, 3 grain layers, bloom, warm haze)
   - Keep the vignette layer (darkens edges, useful for text contrast)
   - Add the uploaded image as a background using CSS `background-image` with `background-size: cover` and `background-position: center top`
   - Import the image as an ES6 module from `@/assets/hero-bg.png`
   - Keep the bottom fade overlay for smooth section transition
   - Keep all content (headline, subtitle, CTA, carousel) exactly as-is

## Technical Details

The section element will get the background image applied directly:

```tsx
import heroBg from "@/assets/hero-bg.png";

// On the section element:
style={{
  backgroundImage: `url(${heroBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
}}
```

All 8 synthetic overlay divs (grid, dots, 3x grain, bloom, haze, vignette) will be removed. Only the bottom fade gradient overlay will remain to ensure a smooth transition to the next section.

