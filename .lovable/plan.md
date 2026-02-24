

# Replace Expert Mentors Main Player Image

## What Changes
One image swap in the Expert Mentors ("Why LevelUp") card. The main player image currently shows `masterclass-1.jpg` (Karthik Subbaraj on a warm-toned film set). It will be replaced with the new uploaded image (Karthik Subbaraj seated in a theater with purple seats).

All overlays (viewfinder corners, play button, gradient bar, mentor name, progress bar) and functionality remain identical.

## Technical Steps

### 1. Copy the new image into the project
- Copy `user-uploads://image-67.png` to `src/assets/masterclass-hero-new.png`

### 2. Update `src/components/why-levelup/ExpertMembershipCard.tsx`
- Change the `masterclass1` import to point to the new asset file
- No other code changes needed -- all overlays, text, and layout stay the same

| File | Change |
|------|--------|
| `src/assets/masterclass-hero-new.png` | New asset (copied from upload) |
| `ExpertMembershipCard.tsx` | Swap `masterclass1` import to new image |

