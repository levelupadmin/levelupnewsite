

## Slow Down Community Marquee and Enlarge Images

Two changes in `src/components/CommunitySection.tsx`:

### 1. Slower scroll durations (line 28-30)
Roughly double the animation durations:
- Row 1: `25s` → `50s`
- Row 2: `30s` → `60s`
- Row 3: `20s` → `45s`

### 2. Larger image tiles (line 86)
Increase the image container sizes:
- Mobile: `w-[220px] h-[120px]` → `w-[280px] h-[160px]`
- Desktop: `md:w-[280px] md:h-[160px]` → `md:w-[380px] md:h-[220px]`

Both changes are on single lines in the same file.

