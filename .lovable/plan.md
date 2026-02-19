

## Reposition Circles and Stats to Match GoFundMe Reference

### What Changes
Reposition the 6 circular images into tighter, cascading diagonal groups that hug the central text. Move stat badges to anchor the four corners. Add slight rotations for organic feel. Move labels inside/overlapping the bottom of each circle.

### Layout Details

**Left circles** -- cascading diagonal from upper-right to lower-left:
- Top: shifted right (closer to text), positioned higher, rotated ~3deg
- Middle: centered, slightly overlapping top circle vertically, rotated ~-2deg  
- Bottom: shifted further left, lowest, rotated ~4deg
- Tighter vertical gap (`gap-2` or negative margins) so circles feel clustered

**Right circles** -- mirrored diagonal from upper-left to lower-right:
- Top: shifted left (closer to text), positioned higher, rotated ~-3deg
- Middle: centered, rotated ~2deg
- Bottom: shifted further right, lowest, rotated ~-4deg

**Stats repositioned** to four corners:
- Members: `top-[8%] left-[4%]` (above top-left circle)
- Projects: `top-[8%] right-[4%]` (above top-right circle)
- Mentors: `bottom-[8%] left-[4%]` (below bottom-left circle)
- Masterclasses: `bottom-[8%] right-[4%]` (below bottom-right circle)
- Slightly smaller text (`text-sm` for numbers, `text-[8px]` for labels)

**Labels** -- moved from outside to overlapping the bottom of each circle:
- Positioned absolutely at the bottom of the circle container
- Semi-transparent dark background (`bg-black/60 backdrop-blur-sm`)
- Sits inside the circle's bottom edge

**Spacing tightened**:
- Reduce center column padding from `md:px-16` to `md:px-8`
- Circles use `gap-2` instead of `gap-6`
- Circles overlap into the text column space using negative margins or `translateX`

**Rotation** added via inline `transform: rotate()` on each circle (alternating 2-5deg).

**Float animation** updated to include rotation in the keyframe so it doesn't reset.

### Technical Details

**File: `src/components/CommunitySection.tsx`**

1. Update `leftCircles` and `rightCircles` data arrays to include `rotation` values (e.g., 3, -2, 4 and -3, 2, -4 degrees)

2. Update `CircleImage` component:
   - Add `rotation` prop, apply via `style={{ transform: rotate(Xdeg) }}`
   - Move label inside the circle container as an absolutely-positioned overlay at the bottom with `bg-black/60 backdrop-blur-sm`
   - Change outer container from `flex-col items-center gap-3` to `relative` positioning

3. Update `stats` positions to corner-anchoring values

4. Update left/right column containers:
   - Change `gap-6` to `gap-1` or `-space-y-4` for tighter clustering
   - Add `translateX` offsets per circle to create the diagonal cascade (top circle pulled toward center, bottom circle pushed away)
   - Use `items-end` for left column, `items-start` for right column to create the diagonal

5. Reduce center column padding: `md:px-8` instead of `md:px-16`

6. Update float keyframe to preserve rotation: `transform: translateY(0) rotate(var(--rotate))` pattern, or apply rotation on wrapper and float on inner element

7. Stat badge sizing: reduce number to `text-sm`, label to `text-[8px]`, padding to `px-3 py-1.5`

No other files changed.

