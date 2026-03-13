

## Plan: Make Hero Background Image Show Full Name on Mobile

**Problem**: On mobile (390px), the hero background image at `object-cover object-top` crops the image so Anthony's full name isn't visible — the image is zoomed in too much.

**Fix** in `src/pages/MasterclassDetail.tsx` (line 177):

Change the hero background `<img>` to use `object-contain` on mobile and `object-cover` on larger screens, so the full image (including the name) is visible on small viewports:

```tsx
// Before:
<img src={data.heroBgImage} alt="" className="w-full h-full object-cover object-top" />

// After:
<img src={data.heroBgImage} alt="" className="w-full h-full object-contain sm:object-cover object-top" />
```

This switches to `object-contain` on mobile so the entire image fits within the hero area (showing the full name), while keeping `object-cover` on sm+ screens for the cinematic fill effect. The dark background color will fill any letterbox areas naturally.

