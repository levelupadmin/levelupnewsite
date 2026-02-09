

# Hero Background Overhaul and Smoother Gradient Transition

## Summary
Three changes: (1) Replace the hero background layers with proper grain texture and random white star dots (no grid lines), (2) Remove the thick separator line in CredibilityCues, (3) Extend and smooth the gradient transition below the numbers into the next section.

## Changes

### 1. HeroSection.tsx -- Replace background layers

**Remove:** The grid lines layer (lines 10-16) -- completely remove it.

**Replace star dots layer (lines 17-25):** Instead of a repeating radial-gradient pattern (which creates uniform dots), use multiple layered `radial-gradient` backgrounds with different sizes, positions, and opacities to create randomly scattered white star dots. This involves stacking ~8-10 radial-gradient layers each with different `backgroundSize` and `backgroundPosition` values so dots appear scattered and random rather than on a grid. Dots will be small (1-2px), white, at varying opacities (15-40%).

**Keep grain layer (lines 26-33):** Keep the current grain with `opacity-[0.35]` and `mix-blend-soft-light` -- this is already configured well.

**Keep** the warm glow and vignette layers as-is.

### 2. CredibilityCues.tsx -- Remove separator and extend gradient

**Remove the separator line** (lines 76-82): Delete the animated `motion.div` with `h-px bg-white/20` that creates the thick straight line above the numbers.

**Extend the gradient below the stats**: Increase bottom padding significantly from `py-20 md:py-28` to `pt-20 pb-40 md:pt-28 md:pb-52` so the gradient has much more room to transition smoothly below the numbers into the off-white of the next section.

**Adjust gradient stops** for a smoother, more gradual transition:
- 0%: `hsl(220 12% 7%)` (charcoal, matches hero)
- 20%: `hsl(220 10% 12%)` (dark gray -- where stats sit)
- 45%: `hsl(25 8% 35%)` (warm mid-tone)
- 65%: `hsl(30 12% 55%)` (warm tan)
- 80%: `hsl(35 15% 78%)` (light warm)
- 100%: `hsl(40 20% 96%)` (off-white, matches WhyLevelUp)

This creates a longer, smoother gradient below the numbers matching the reference images.

## Technical Details

**Files modified:**
- `src/components/HeroSection.tsx`:
  - Delete grid lines div (lines 10-16)
  - Replace star dots div with multiple stacked radial-gradients using varied sizes/positions for random placement
  - Keep grain, glow, and vignette layers unchanged

- `src/components/CredibilityCues.tsx`:
  - Delete the `motion.div` separator (lines 76-82)
  - Change padding from `py-20 md:py-28` to `pt-20 pb-40 md:pt-28 md:pb-52`
  - Update gradient stops to 6 stops for smoother transition with more room below stats
