

## Plan: Fix Anthony Hero to Match Reference Composite

The two-layer setup is already in place but the styling needs adjustment to match the 3rd reference image (`ANTHONY--p-1080-2.png`) where the name text is large behind the person.

### Current issues
- Name overlay is at 40-50% opacity — too faint. In the reference it's prominent.
- Person image uses `object-contain` on mobile — should use `object-cover` to fill the area like the reference.
- Name overlay uses `object-contain object-center` — should be positioned at top/center to sit behind the person's head area, matching the reference composition.

### Changes in `src/pages/MasterclassDetail.tsx` (lines 176-181)

Update the hero rendering:

1. **Name overlay**: Increase opacity to ~70-80%, use `object-contain` with `object-top` positioning so the text sits in the upper portion behind the person (matching reference).
2. **Person image**: Use `object-cover object-center` on all breakpoints so the person fills the frame like the reference. Remove the mobile `object-contain` which makes the image too small.
3. **Z-index layering**: Ensure name is behind (z-0) and person is in front (z-[1]) so the person visually overlaps the text, matching the composite look.

```tsx
// Name overlay — large, behind person
<img src={data.heroNameOverlay} alt="" 
  className="absolute inset-0 w-full h-full object-contain object-top z-0 opacity-70 sm:opacity-80" />

// Person — in front, covers the area
<img src={data.heroBgImage} alt="" 
  className="w-full h-full object-cover object-center z-[1]" />

// Gradient — on top
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent z-[2]" />
```

This creates the exact composite from the reference: bold name text visible behind the person.

