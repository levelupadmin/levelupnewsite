
# Fix Navbar Hover: Remove Oval Glitch on Expand

## Problem
When hovering a nav link, the navbar's `borderRadius` animates from `9999` (pill) to `16` (rounded square) over 300ms via Framer Motion. During this transition, the shape passes through an intermediate "large oval" state that looks like a glitch.

## Solution
Make the `borderRadius` change near-instantly (30-50ms) so the shape snaps cleanly from pill to rounded square without a visible oval intermediate. The dropdown content still animates smoothly -- only the border-radius timing changes.

## Technical Details

### File: `src/components/Navbar.tsx`

**Line 119** -- Change the `borderRadius` transition duration from `0.3s` to `0.05s` (50ms), making it effectively instant:

```
// Before
borderRadius: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },

// After
borderRadius: { duration: 0.05, ease: "easeOut" },
```

This single change eliminates the oval intermediate state. The dropdown panel still opens with its own smooth height animation (300ms), so the overall experience remains fluid -- just without the shape glitch.
