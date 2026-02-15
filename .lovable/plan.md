

# Improve Logo Visibility on Dark Background

## Problem
Some logos (e.g., NID, TVF, Google) use dark colors that blend into the pure black background, making them hard to see.

## Solution
Apply a CSS `brightness` and `invert` filter to make all logos appear as white/light versions, ensuring consistent visibility on the dark background.

### File: `src/components/StudentLogosSection.tsx`
- Add `brightness(0) invert(1)` CSS filter to all logo images, converting them to white silhouettes
- Keep the existing `hover:opacity-80` transition so hover still feels interactive
- Add `opacity-70` base opacity with `hover:opacity-100` for a subtle hover brightening effect

This is a common pattern for displaying mixed-color brand logos on dark backgrounds -- converting them all to white ensures uniform visibility without needing to source white versions of each logo.

