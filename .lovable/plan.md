

## Community Section Redesign: GoFundMe-Style Circular Layout

### What Changes
Replace the orbital avatar system with 6 large circular category images arranged in two groups flanking the centered text content, inspired by the GoFundMe reference image. All existing text, colors, stats, and dark theme remain identical.

### Layout Structure

```text
   [Circle 1]                              [Circle 4]
        [Circle 2]    HEADLINE + CTA    [Circle 5]
   [Circle 3]                              [Circle 6]
```

- **Left column**: 3 circles with slight diagonal stagger (not perfectly aligned)
- **Center**: Eyebrow, headline, subheading, CTA button (unchanged text)
- **Right column**: 3 circles mirroring left with asymmetric offset
- **Stats**: 4 floating pill badges scattered around the composition (top-right, bottom-left, etc.)
- **Mobile**: Circles hidden, falls back to centered text + stat grid (similar to current mobile layout)

### Circle Details
- **Size**: ~200-220px diameter on desktop, with slight size variation per circle
- **Border**: 3-4px orange gradient ring (`border-primary`) with subtle glow
- **Images**: Reuse existing assets (`masterclass-1` through `masterclass-6`)
- **Labels**: Small dark badge positioned outside each circle bottom-left: "Learning Together", "Mentorship", "Collaboration", "Project Reviews", "Masterclasses", "Creative Community"
- **Animation**: Gentle float using existing Tailwind keyframes, staggered delays
- **Hover**: Subtle scale-up (1.05) + increased glow

### What Gets Removed
- All SVG ellipse ring paths
- All orbiting avatar items and stat pills
- `orbit-spin` animation system
- `ringItems`, `rings`, `getPosition`, and all orbital logic
- Tooltip badges on avatars
- Most icon imports (UserPlus, Star, Share2, Eye, Handshake, etc.)

### What Stays
- All text content verbatim
- `AnimatedCounter` for stats
- Orange accent color system
- Dark background
- Mobile stat grid
- Section structure and padding

### Technical Details

**File: `src/components/CommunitySection.tsx`** -- Full rewrite:

1. **Imports**: Keep `ArrowRight`, `AnimatedCounter`, and 6 masterclass images. Remove all other icon/avatar imports.

2. **Circle data array**: 6 entries with `src`, `label`, `size`, and positional offsets for the stagger effect.

3. **Desktop layout** (`hidden md:flex`): Three-column flex layout:
   - Left column: 3 circles stacked with `space-y-6` and alternating `ml`/`mr` offsets for asymmetry
   - Center column: Existing text block (eyebrow, headline, subheading, CTA)
   - Right column: Mirror of left with different offsets

4. **Stat badges**: 4 absolutely-positioned pill elements scattered around the section with `bg-card border border-border/50`, containing `AnimatedCounter` + label. Each positioned via percentage-based `top`/`left`/`right`/`bottom`.

5. **Mobile layout**: Circles hidden, text centered, stat grid below (same as current).

6. **Animations**: Each circle gets a gentle float animation with staggered `animation-delay`. Hover adds `scale-105` and `shadow-[0_0_20px_hsl(var(--primary)/0.3)]`.

7. **Circle component**: Rounded-full container with `ring-[3px] ring-primary/70` border, overflow-hidden for the image, and an absolutely-positioned label badge below.

No other files need changes.
