
# Smooth Dark-to-Light Section Transition

## Problem
The hero section and the next sections (CredibilityCues, WhyLevelUp) have hard color boundaries. The reference images show a smooth, visible gradient that transitions from dark charcoal to warm off-white across sections.

## Changes

### 1. HeroSection.tsx -- Bottom fade overlay
Add a tall (200px) gradient overlay at the very bottom of the hero section that fades from transparent into the charcoal base color, softening the bottom edge.

### 2. CredibilityCues.tsx -- Gradient bridge section
This section becomes the visible transition zone between dark and light:
- Remove the flat `bg-background` class
- Apply a multi-stop vertical gradient as an inline style background:
  - Top: `hsl(220 12% 7%)` (matches hero charcoal)
  - 30%: `hsl(220 8% 15%)` (dark gray)
  - 55%: `hsl(30 10% 50%)` (warm mid-tone -- this is the visible transition)
  - 80%: `hsl(35 15% 80%)` (warm light gray)
  - 100%: `hsl(40 20% 96%)` (matches WhyLevelUp off-white)
- Increase padding to `py-20 md:py-28` to give the gradient more room to breathe and be noticeable
- Override stat value text to pure white (`text-white`) so they stay readable against the shifting background
- Override the closing paragraph text to a lighter shade for readability
- Override the separator line color to white with low opacity

### 3. WhyLevelUp.tsx -- No changes needed
The `section-light` class already sets background to `hsl(40 20% 96%)` which matches the bottom of the CredibilityCues gradient.

## Technical Details

**Files modified:**
- `src/components/HeroSection.tsx` -- Add a `div` with `absolute bottom-0 left-0 right-0 h-[200px]` and a `linear-gradient(to bottom, transparent, hsl(220 12% 7%))` to soften the hero bottom edge
- `src/components/CredibilityCues.tsx`:
  - Replace `className="relative bg-background py-12 md:py-16"` with `className="relative py-20 md:py-28"` plus an inline `style` for the gradient background
  - Change stat value text class from `text-cue-value` to `text-white` for contrast
  - Change stat label text class from `text-cue` to `text-white/60`
  - Change closing paragraph from `text-muted-foreground` to `text-white/40`
  - Change separator from `bg-border` to `bg-white/20`
