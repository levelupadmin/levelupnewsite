

## Plan: Use uploaded image as desktop-only hero background

### What changes

1. **Copy uploaded image** to `src/assets/anthony-hero-desktop.png`

2. **`src/data/masterclassPages.ts`** — Add a new field `heroDesktopBg` to the Anthony entry, importing the new image. Add the field to the `MasterclassPageData` interface as optional.

3. **`src/pages/MasterclassDetail.tsx`** (lines 174-182) — Update the hero section to:
   - On **desktop** (`md:` and up): Show only the new combined image (which already has the name + person). Hide the separate `heroNameOverlay` and `heroBgImage`.
   - On **mobile** (`below md`): Keep everything exactly as-is (name overlay + person image).

```tsx
{/* Mobile: existing layout */}
<div className="absolute inset-0 z-0 md:hidden">
  {data.heroNameOverlay && (
    <img src={data.heroNameOverlay} ... />
  )}
  <img src={data.heroBgImage} ... />
  <div className="absolute inset-0 bg-gradient-to-t ..." />
</div>

{/* Desktop: single combined image */}
<div className="absolute inset-0 z-0 hidden md:block">
  <img src={data.heroDesktopBg || data.heroBgImage} 
    className="w-full h-full object-cover object-center" />
  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />
</div>
```

This keeps mobile completely untouched and uses the uploaded image (with name + person baked in) for desktop only.

