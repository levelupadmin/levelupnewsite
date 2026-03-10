

## Problem

The rotating words use `text-gradient-amber` which applies a `background-clip: text` gradient. This technique can appear muted, especially on dark backgrounds with text shadows. The gradient colors (`hsl(24 95% 53%)` to `hsl(30 90% 60%)` to `hsl(20 85% 48%)`) are moderate oranges that don't pop enough.

## Solution

Two changes to make the rotating words vibrant:

### 1. Brighten the gradient specifically for the hero rotating words

Instead of modifying the global `--gradient-amber-gold` (used across the site), add a dedicated brighter style on the `<m.span>`. Replace `text-gradient-amber` with an inline style using a more vivid, higher-lightness gradient:

- Bump lightness: `hsl(24 100% 58%)` → `hsl(32 100% 65%)` → `hsl(22 100% 55%)`
- This makes the orange significantly brighter and more saturated

### 2. Remove text-shadow interference

The hero headline has `text-shadow-hero` class on the `<h1>`. The `text-shadow` property can darken gradient-clipped text. Ensure the rotating word span has `textShadow: 'none'` in its inline style to prevent any inherited shadow from muting it.

**Files changed:** `src/components/HeroSection.tsx` only (lines 99-106) — replace `text-gradient-amber` class with inline gradient styles for a brighter, more vivid orange that pops.

