

## Problem Analysis

The LiveProjectsCard has **all 3 DMs stacked vertically** in a flex column layout. Each DM div takes up layout space even when its CSS animation sets `opacity: 0`. This means the card tries to fit:
- Header bar
- 3 thumbnail grid
- "What happened next" label
- DM #1 (Priya) — always in flow
- DM #2 (Arjun) — always in flow
- DM #3 (Rohan) — always in flow
- Freelance enquiry row
- Cohort reactions row
- Bottom summary bar

That's far too much content for the ~528px card height. Since only one DM is visible at a time (via the 9s animation cycle), they should **share the same space**.

## Fix

**Wrap all 3 DMs in a single relative container and position them absolutely** so they overlap. Only the currently-animated DM will be visible; the others are hidden but don't consume layout height.

### Changes to `src/components/why-levelup/LiveProjectsCard.tsx` (lines 70–161):

Replace the 3 sequential DM `<div>`s with:

```tsx
{/* DM rotation — all 3 share the same space */}
<div className="relative" style={{ minHeight: 42 }}>
  {/* DM #1: Priya */}
  <div className="absolute inset-x-0 top-0 rounded-lg px-2 py-1.5 animate-pf-notif-1" ...>
    {/* existing content */}
  </div>
  {/* DM #2: Arjun */}
  <div className="absolute inset-x-0 top-0 rounded-lg px-2 py-1.5 animate-pf-notif-1b" ...>
    {/* existing content */}
  </div>
  {/* DM #3: Rohan */}
  <div className="absolute inset-x-0 top-0 rounded-lg px-2 py-1.5 animate-pf-notif-1c" ...>
    {/* existing content */}
  </div>
</div>
```

The `minHeight: 42` (in px) reserves enough space for one DM's height without triple-stacking. The exact value may need tuning (roughly the height of one DM block at the current font sizes).

### No CSS animation changes needed
The existing keyframes (`pf-notif-1`, `pf-notif-1b`, `pf-notif-1c`) already handle opacity and transform — they just need to be in overlapping position to work correctly.

### Files changed
- `src/components/why-levelup/LiveProjectsCard.tsx` — wrap DMs in a relative container with absolute children

