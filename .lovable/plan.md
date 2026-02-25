

## Change Stats to Single-Line Format

The user wants each stat (e.g., "7 Cities") displayed as a single line with the number and label on the same line, all at the same font weight — rather than the current two-line layout with a large bold number above a smaller label.

### File: `src/components/ForgeSection.tsx`

**Lines 185-192** (repeated 3 times via the map) — Replace the two separate `<p>` tags (number + label stacked) with a single `<p>` showing `{stat.value} {stat.label}` in one line, uniform weight.

Current:
```tsx
<p className="font-serif-display text-3xl md:text-4xl font-bold ...">7</p>
<p className="font-sans-body text-xs text-muted-foreground ...">Cities</p>
```

Change to:
```tsx
<p className="font-serif-display text-base md:text-lg font-medium text-hero-headline">
  {stat.value} {stat.label}
</p>
```

Single line, single weight (`font-medium`), matching the feature point title size. No other changes.

