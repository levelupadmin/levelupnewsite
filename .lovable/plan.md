

## Problem

The 4 DM notifications in the "What happened next" section rotate on a 12-second CSS animation cycle with gaps where **no DM is visible**:

- **0%–12%** (0s–1.44s): empty — nothing shown yet
- **28%–32%** (3.36s–3.84s): 0.48s gap between DM #1 exit and DM #2 enter
- **48%–52%** (5.76s–6.24s): 0.48s gap
- **68%–72%** (8.16s–8.64s): 0.48s gap  
- **88%–100%** (10.56s–12s): 1.44s gap before cycle restarts

The **wrap-around gap** (88%→100%→0%→12%) totals ~2.88s of empty space — this is when users see the "stuck" empty card.

## Fix

Adjust all 4 DM keyframe timings to provide **continuous coverage** with slight cross-fade overlaps:

| DM | Enter (fade in) | Visible | Exit (fade out) |
|----|----------------|---------|-----------------|
| #1 | 0%–3% | 3%–22% | 22%–25% |
| #2 | 23%–28% | 28%–47% | 47%–50% |
| #3 | 48%–53% | 53%–72% | 72%–75% |
| #4 | 73%–78% | 78%–97% | 97%–100%→wraps to 0% |

This eliminates all dead time. Each DM gets ~3s of visibility (25% of 12s) with 2% overlap during transitions.

The corresponding `pf-type-*` and `pf-typing-1` keyframes also need adjustment to align with the new windows.

## File Changes

**`src/index.css`** — Update 8 keyframe blocks (`pf-notif-1`, `pf-notif-1b`, `pf-notif-1c`, `pf-notif-1d` and their matching `pf-type-*` / `pf-typing-1` animations) with the tightened timing percentages.

