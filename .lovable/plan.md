

# Auto-Scroll 3rd Card Into Full View on Expand

## Problem
When the 3rd card ("Community") is expanded, it's partially cut off and requires manual scrolling. Because it's the last card in the row, `scrollIntoView({ inline: "center" })` can't center it properly -- there isn't enough scroll room to the right.

## Solution
When any card (especially the 3rd) is expanded, scroll the container so the expanded card aligns to the **start** of the viewport instead of center. This pushes the first two cards off-screen to the left, making the expanded card fully visible.

## Technical Steps

### `src/components/WhyLevelUp.tsx`

**1. Change `scrollIntoView` alignment (lines 64-69)**
- Replace `inline: "center"` with `inline: "start"` so the expanded card snaps to the left edge of the scroll container
- Also change `block: "nearest"` to `block: "nearest"` (keep as-is) to avoid vertical jump

**2. Increase scroll delay slightly (line 64)**
- Change delay from `100ms` to `150ms` to allow the width transition to start before scrolling, producing a smoother result

| Line | Current | New |
|------|---------|-----|
| 64 | `setTimeout(() => {` (100ms) | `setTimeout(() => {` (150ms) |
| 66 | `inline: "center",` | `inline: "start",` |

These two small changes ensure the 3rd card (and any expanded card) is fully visible by scrolling preceding cards out of view.

