

## Fix: Remove fade from hero name text, match reference image

### Problem
The hero has a gradient overlay fading the name text, and the name opacity is reduced to 70-80%. The reference image shows the name at full visibility with no fade effect.

### Changes in `src/pages/MasterclassDetail.tsx`

**Line 178** — Name overlay: Set full opacity (`opacity-100`) on all breakpoints.

**Line 181** — Remove or reduce the gradient overlay so it doesn't wash out the name text. Change from `from-background via-background/30 to-transparent` to only a subtle bottom fade: `from-background via-transparent to-transparent` so the bottom blends but the name text area stays clean.

```tsx
// Line 178: Full opacity name
<img src={data.heroNameOverlay} alt="" 
  className="absolute inset-x-0 top-16 sm:top-24 md:top-32 lg:top-40 bottom-0 w-full h-auto object-contain z-0" 
  aria-hidden="true" />

// Line 181: Only bottom fade, not covering the name area
<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />
```

This matches the reference: bold, fully visible name text behind the person with only a subtle bottom gradient for content transition.

