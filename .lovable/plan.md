

## Fix: Move name overlay up on desktop only

The name text currently uses `lg:top-40` which pushes it too far down on desktop, landing on Anthony's face.

### Change in `src/pages/MasterclassDetail.tsx` (line 178)

Reduce the `lg` top offset while keeping mobile/tablet values unchanged:

```tsx
// From:
className="absolute inset-x-0 top-16 sm:top-24 md:top-32 lg:top-40 bottom-0 w-full h-auto object-contain z-0"

// To:
className="absolute inset-x-0 top-16 sm:top-24 md:top-20 lg:top-16 bottom-0 w-full h-auto object-contain z-0"
```

- `top-16` (mobile) — unchanged, already looks good
- `sm:top-24` (small tablets) — unchanged
- `md:top-20` — reduced from `top-32` to move name higher on medium screens
- `lg:top-16` — reduced from `top-40` to move name well above his face on desktop

