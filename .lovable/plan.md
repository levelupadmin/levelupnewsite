

# Portfolio-Driven Learning Card: 3D Perspective Showcase

## Current Problem
The card currently shows flat stacked images with minor rotations -- it looks like a basic collage. There's no depth, no motion, and no "wow" factor compared to the other cards.

## Solution: CSS 3D Perspective Fan with Hover Animation
Transform the card container into a **3D perspective stage** where three project cards fan out in Z-space, creating real depth. Add a continuous **slow idle animation** (gentle floating/breathing) so the card feels alive even without interaction.

### Visual Concept
- The card container gets `perspective: 800px` to enable true 3D transforms
- Three project thumbnails are stacked and fanned using `rotateY` and `translateZ` -- the back card tilts left, the middle faces forward, and the front card tilts right
- Each card has a subtle **shadow that grows with depth** for realistic layering
- A continuous CSS animation makes the stack gently "breathe" -- the cards slowly drift up/down by 2-3px on offset timings, creating a living, floating feel
- The front card gets a warm amber glow/border to draw the eye
- Labels remain on each card for context

### Layout Detail
```text
       [Back Card]        rotateY(12deg) translateZ(-40px)
     [Middle Card]        rotateY(0deg)  translateZ(0px)
   [Front Card]           rotateY(-8deg) translateZ(30px)
```

The result looks like a **3D card spread** -- as if someone fanned out portfolio pieces on a desk, viewed at a slight angle.

## Technical Details

### File: `src/components/why-levelup/LiveProjectsCard.tsx` (full rewrite)

**Approach: Pure CSS 3D + Tailwind keyframe animation (no Framer Motion)**
Per the project's animation standards, the Why LevelUp cards use CSS transitions (not Framer Motion) for their expand/collapse. This card will use CSS-only 3D and animations to stay consistent and avoid mixing animation systems.

**Implementation:**
1. **Container**: `perspective: 800px`, `perspective-origin: center`, `transform-style: preserve-3d`
2. **Three cards** absolutely positioned at center, each with:
   - `rotateY()` + `translateZ()` for 3D fanning
   - `rounded-xl`, `overflow-hidden`, `shadow-xl`
   - Individual CSS animation using a new `float-card` keyframe (gentle Y translate oscillation, 3-4s duration, offset delays per card)
3. **New Tailwind keyframes** in `tailwind.config.ts`:
   - `float-card-1`: `translateY(0) -> translateY(-3px) -> translateY(0)` at 3s
   - `float-card-2`: same pattern, 3.5s, slight delay
   - `float-card-3`: same pattern, 4s, more delay
4. **Gradient overlay** at the bottom fading into card background
5. **Labels** on each card with the dark gradient bar

### File: `tailwind.config.ts`
Add three `float-card` keyframe variants and their corresponding animation utilities for the idle floating effect.

### No other files change.
