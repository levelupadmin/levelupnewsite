

# Portfolio-Driven Learning Card: Creative Overhaul

## Problem
The current 3D perspective card stack is barely visible — only one small image ("Scene Edit") shows up in the illustration area. The `rotateY` + `translateZ` transforms within a small container make cards overlap almost entirely, and the perspective effect is imperceptible. The card looks empty and lifeless compared to its siblings.

## Solution: Cinematic Portfolio Wall with Animated Elements
Transform the card into a rich, multi-element composition that feels like a creative workspace — a "portfolio wall" with layered visual elements that sell the idea of building real work.

### Visual Design

**Layer 1 — Stacked Project Thumbnails (improved)**
- Three project images arranged as a visible, overlapping cascade (not 3D rotateY — use simpler 2D rotations + slight offsets that actually show all three cards clearly)
- Each card slightly offset (-12px, 0, +12px horizontal) and rotated (-3deg, 0, +3deg) so all three are distinctly visible
- Floating animation retained but simplified to pure translateY

**Layer 2 — Decorative Context Elements**
- A small "play" triangle icon (SVG) overlaid on one thumbnail to suggest video content
- Tiny floating "tags" around the stack — small pill badges like "4K", "Color Graded", "Final Cut" that slowly drift with CSS animation, reinforcing the portfolio/output theme
- A subtle film-strip or timeline bar element at the bottom of the illustration area (thin horizontal line with small tick marks) to evoke editing software

**Layer 3 — Progress/Completion Indicator**
- A small circular progress ring (SVG) in the corner showing "3/3 Projects" — reinforcing the idea of completing portfolio pieces
- Animated: the ring fills from 0 to full on a loop (slow, ~4s)

### Why This Works
- Multiple visual layers create richness and depth without needing true 3D
- The decorative elements (tags, play icon, timeline) tell a story about what students actually produce
- The progress ring adds motion and reinforces the "build real things" message
- All three thumbnails are clearly visible, not hidden behind each other

## Technical Details

### File: `src/components/why-levelup/LiveProjectsCard.tsx` (full rewrite)

**Thumbnails:**
- Use `forge-1.jpg`, `forge-2.jpg`, `forge-3.jpg`
- Position with simple absolute positioning, 2D `rotate()` transforms, staggered left offsets
- Each card ~55% width of container, 16:10 aspect ratio
- Keep the floating animation keyframes (float-card-1/2/3) but update them to use simple translateY only (no rotateY/translateZ)
- Labels remain: "Short Film", "Showreel", "Scene Edit"

**Floating Tags:**
- 3-4 small pill elements (`text-[8px]`, `px-2 py-0.5`, `rounded-full`, `border border-primary/20`, `bg-white/5`) with labels like "4K", "Color Graded", "Final Cut"
- Positioned absolutely around the card stack
- Each gets a slow CSS float animation (reuse existing float-card keyframes with different delays)

**Play Icon:**
- Small SVG triangle (12x12px) overlaid on the front-most thumbnail, semi-transparent white
- Static, no animation needed

**Timeline Bar:**
- Thin horizontal line at the bottom of the illustration area
- `h-[2px] bg-primary/20` with 4-5 small tick marks (`w-[2px] h-2 bg-primary/30`)
- A small amber dot that slowly slides along the bar using CSS animation (represents playhead)

**Progress Ring:**
- SVG circle, ~32px diameter, positioned top-right area of the illustration
- Stroke-dasharray animation: fills from 0% to 100% over 4s, loops infinitely
- `stroke: hsl(var(--primary))` with `stroke-width: 2`
- "3/3" text centered inside the ring, `text-[8px]`

### File: `tailwind.config.ts`

**Update float-card keyframes** to remove rotateY/translateZ (those are invisible in this layout) and use simple translateY:
- `float-card-1`: `translateY(0) -> translateY(-4px) -> translateY(0)` at 3s
- `float-card-2`: `translateY(0) -> translateY(-3px) -> translateY(0)` at 3.5s  
- `float-card-3`: `translateY(0) -> translateY(-4px) -> translateY(0)` at 4s

**Add new keyframes:**
- `slide-playhead`: horizontal translate from 0% to 100% over 6s, ease-in-out, infinite alternate
- `progress-fill`: stroke-dashoffset animation from full to 0, 4s, ease-out, infinite

### No other files change.
