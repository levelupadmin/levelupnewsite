
# Cinematic Gradient Hero Background

## What changes
Replace the current starfield particle image (`hero-bg.png`) with a CSS-only cinematic gradient background. This creates a warm, theatrical atmosphere — like a darkened theater before the curtain rises — using deep charcoal tones and a faint amber light leak at the top center.

## Why this is better
- The starfield feels generic and disconnected from the filmmaking/creative brand
- A CSS gradient loads instantly (no image to fetch), improving LCP performance
- Warm amber tones tie directly into the brand's primary orange accent
- The "light leak" effect evokes cinema without being literal

## Visual description
- Base: deep charcoal-to-black vertical gradient
- Top center: a soft, wide amber/orange radial glow (very low opacity, ~4-6%) simulating a warm overhead light leak
- The bottom fade overlay stays as-is for the smooth transition into content below

## Technical details

### File: `src/components/HeroSection.tsx`

1. **Remove** the `heroBg` image import (line 5)
2. **Replace** the `<img>` tag (lines 26-33) with a `<div>` using layered CSS gradients:
   - A radial amber glow: `radial-gradient(ellipse 80% 50% at 50% 0%, hsl(24 95% 53% / 0.05) 0%, transparent 70%)`
   - A vertical base gradient: `linear-gradient(to bottom, hsl(0 0% 6%) 0%, hsl(0 0% 4%) 40%, hsl(0 0% 3%) 100%)`
3. No new dependencies or images required — pure CSS

### Optional cleanup
- The `hero-bg.png` asset can be deleted later if no longer needed elsewhere

### Performance benefit
- Removes a large image from the critical rendering path
- No fetch required — the gradient renders immediately with the first paint
