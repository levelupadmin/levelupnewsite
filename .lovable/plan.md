

# Fix Hero Section Background Visibility

## Problem
The background texture layers were applied correctly but with extremely low opacity values, making them invisible on screen:
- Grid lines at 3% opacity -- invisible
- Star dots at 8% opacity -- barely visible
- Grain at 5% opacity -- invisible
- Warm glow at 5% opacity -- invisible

## Solution
Increase opacity values to make the textures actually visible while keeping the matte, cinematic feel.

## Changes (single file: `src/components/HeroSection.tsx`)

1. **Faint grid lines**: Increase opacity from `0.03` to `0.12` (12%) so the grid is subtly visible
2. **Scattered star dots**: Increase opacity from `0.08` to `0.20` (20%) and bump dot size from `0.6px` to `1px` for visibility
3. **Grain/noise texture**: Increase opacity from `0.05` to `0.10` (10%) for visible matte texture
4. **Warm center glow**: Increase opacity from `0.05` to `0.12` (12%) for subtle depth
5. **Vignette**: Keep as-is since it's already at full opacity with transparent center

No other files are modified. All content (headline, subtext, CTA, carousel) remains unchanged.
