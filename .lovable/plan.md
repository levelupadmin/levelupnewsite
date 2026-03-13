

## Fix: Name Overlay Overflowing on Desktop

The name overlay image currently uses `top-16 sm:top-20` which isn't enough offset on larger screens, causing the text to overlap Anthony's head on desktop.

### Change in `src/pages/MasterclassDetail.tsx` (line 178)

Update the name overlay positioning to push it further down on desktop breakpoints:

```tsx
<img src={data.heroNameOverlay} alt="" 
  className="absolute inset-x-0 top-16 sm:top-24 md:top-32 lg:top-40 bottom-0 w-full h-auto object-contain z-0 opacity-70 sm:opacity-80" 
  aria-hidden="true" />
```

- `top-16` — mobile (stays as-is, already looks good)
- `sm:top-24` — small tablets, slightly more offset
- `md:top-32` — medium screens, pushes name well below nav
- `lg:top-40` — large desktops, ensures name sits at chest/waist level behind Anthony, not on his head

This keeps the mobile layout unchanged while fixing the desktop overflow.

