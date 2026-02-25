

## Restructure Forge Section Layout to Match Reference

The reference image shows a different layout from the current implementation. Here are the key differences:

### Current layout (lines 178-211)
- Vertical stack of rows, each row = `Stat | Icon | Feature` side-by-side
- Stats and features are interleaved in the same rows

### Target layout (from reference image)
1. **Feature points row** — 3 columns across, each with: AnvilHammerIcon on top, headline below, description below that. All center-aligned.
2. **Stats row** — 3 columns across below the features, each with: large bold number, small label underneath. Two-line stacked format (reverting the earlier single-line change).

### Changes in `src/components/ForgeSection.tsx`

**Replace lines 178-211** (the combined stat/icon/feature block) with two separate blocks:

**Block 1 — Feature points (3-column grid):**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto mt-8 md:mt-12">
  {featurePoints.map((point, i) => (
    <div key={i} className="text-center">
      <AnvilHammerIcon className="w-6 h-6 text-primary mx-auto mb-3" />
      <h3 className="font-serif-display text-base md:text-lg font-medium text-hero-headline leading-snug">
        {point.headline}
      </h3>
      <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs mx-auto">
        {point.description}
      </p>
    </div>
  ))}
</div>
```

**Block 2 — Stats (3-column grid):**
```tsx
<div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-10 md:mt-14">
  {stats.map((stat) => (
    <div key={stat.label} className="text-center">
      <p className="font-serif-display text-3xl md:text-5xl font-bold text-hero-headline">
        {stat.value}
      </p>
      <p className="font-sans-body text-xs md:text-sm text-muted-foreground mt-1 tracking-wide">
        {stat.label}
      </p>
    </div>
  ))}
</div>
```

No other changes — the logo, headline, description, carousel, and dots all remain as-is. The circular icon divider borders are removed; the anvil icons now sit directly above each feature headline without a border wrapper.

