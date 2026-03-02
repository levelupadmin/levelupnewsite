

## Speed Up & Extend LiveProjectsCard Narrative

### Problem
The full animation cycle is **16 seconds** — too slow. User also wants more narrative beats to keep it interesting longer.

### Plan

**1. Cut cycle duration from 16s → 9s** (`src/index.css`)
- Change every `16s` reference in the portfolio animation block (lines 664–862) to `9s`
- Recalculate all percentage keyframes to maintain the same relative sequence but compressed into 9s
- Float bob durations stay independent (3s/3.4s/3.8s) — those are fine

**2. Add a 3rd DM message** (`src/components/why-levelup/LiveProjectsCard.tsx`)
- Add a new DM from e.g. "Rohan Mehta · Dharma Productions" saying "Love the showreel — got a project for you"
- This creates a 3-DM rotation: Priya → Arjun → Rohan, each getting ~20% of the cycle

**3. Revised timeline (9s cycle)**

```text
 0%─────────────────────────────────────100%
 |  Thumbs  |                              |  (scale in 0-12%)
 |  Views tags appear staggered            |  (5-15%)
 |          | DM1 Priya    |               |  (18-38%)
 |                | Freelance gig appears  |  (35%+, persists)
 |                    | DM2 Arjun  |       |  (42-62%)
 |                         | DM3 Rohan |   |  (65-85%)
 |                              | Cohort   |  (70%+, persists)
 |                                | Summary|  (75%+)
 |  View counters cycle through 3 values   |
 |  Border glow pulses 3x                  |
```

**4. New keyframe percentages** — all in `src/index.css`:
- Thumbnails: same % (scale in at 2/6/10%), just over 9s instead of 16s
- DM #1: 18–38% (was 24–56%)
- DM #2: 42–62% (was 58–92%)
- DM #3 (new): 65–85%
- Freelance: appears at 35% (was 46%)
- Cohort: appears at 70% (was 70%)
- Gig A/B cycle: 35–55% / 58–90%
- Reactions: pop at 72%
- Summary: visible from 32%, text swap at 65%

### Files
1. `src/index.css` — all `pf-*` keyframes: change `16s` → `9s`, recalculate percentages, add DM3 keyframes
2. `src/components/why-levelup/LiveProjectsCard.tsx` — add 3rd DM block with new animate classes

