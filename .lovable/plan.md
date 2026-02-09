

# Replace Forge Text Labels with Official Logo

## What Changes

The two text-based labels on lines 81-82 of `ForgeSection.tsx` -- the "Forge" heading and "by LevelUp" subtext -- will be replaced with the uploaded Forge logo image. This is the official brand logo showing "the Forge by LevelUp Learning" with the distinctive amber/gold wave graphic.

## Steps

1. **Copy the uploaded logo** into `src/assets/forge-logo.png` so it can be imported as an ES module in the React component.

2. **Update `ForgeSection.tsx`**:
   - Add an import at the top: `import forgeLogo from "@/assets/forge-logo.png"`
   - Replace lines 81-82 (the two `<span>` elements for "Forge" and "by LevelUp") with a single `<img>` tag displaying the logo
   - The logo will be sized appropriately (roughly `h-16 md:h-20 lg:h-24`) and have `alt="The Forge by LevelUp Learning"`
   - Since the logo has a black background in the uploaded file, it will blend naturally with the dark Forge section background
   - The logo sits inside the existing `<h2>` tag, above the "Where you *become*" headline text

## Visual Result

Before:
```
  FORGE              (small uppercase text)
  by LevelUp         (smaller muted text)
  Where you become   (large serif headline)
```

After:
```
  [The Forge logo]   (official brand logo image)
  Where you become   (large serif headline)
```

## Files Changed

| File | Change |
|------|--------|
| `src/assets/forge-logo.png` | New file -- copied from user upload |
| `src/components/ForgeSection.tsx` | Import logo, replace two text spans with `<img>` tag |

