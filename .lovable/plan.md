

## Redesign Forge Section Layout per Sketch

The sketch shows a new layout for the top portion of the Forge section (above the carousel). Currently everything is centered in a single column. The new layout splits the stats and feature points into a side-by-side arrangement.

### New Layout Structure

```text
┌──────────────────────────────────────────────────┐
│              [The Forge logo]                    │
│  Where you become                                │  ← left-aligned, large
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Description paragraph (centered)         │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────┐   │   ┌──────────────────────┐     │
│  │  7       │   │   │ Pressure that ...    │     │
│  │  Cities  │   │   │ description          │     │
│  ├─────────┤   │   ├──────────────────────┤     │
│  │  11      │   │   │ Mentorship without.. │     │
│  │  Editions│   │   │ description          │     │
│  ├─────────┤   │   ├──────────────────────┤     │
│  │  248     │   │   │ Offline. Immersive.. │     │
│  │  Shortfilms│ │   │ description          │     │
│  └─────────┘   │   └──────────────────────┘     │
│                                                  │
│  [Carousel remains unchanged below]              │
└──────────────────────────────────────────────────┘
```

### File: `src/components/ForgeSection.tsx`

**Changes to the header area (lines 163-208):**

1. **Forge logo** — keep centered
2. **"Where you become" headline** — change to left-aligned, increase size to `text-3xl md:text-5xl`
3. **Description paragraph** — keep centered, add a subtle border around it (matching the sketch's bordered box look): `border border-muted-foreground/20 rounded-sm px-6 py-4`
4. **Replace the horizontal feature points + centered stats row** with a two-column grid layout:
   - **Left column**: Stats stacked vertically with spacing between each stat. Each stat shows the number large and label below
   - **Center divider**: A thin vertical line (`w-px bg-muted-foreground/20 self-stretch`) between the two columns
   - **Right column**: The 3 feature points stacked vertically with the AnvilHammerIcon

5. On mobile, stack everything vertically (stats row above features, no divider)

The carousel section (lines 210-295) remains completely unchanged.

