

## Plan: Expand Background Review Scroll in RatingScene

**What changes:**

1. **`src/components/impact/RatingScene.tsx`** — Expand the `reviews` array from 4 to ~16 diverse, authentic-sounding reviews. Add a second scrolling column that moves in the opposite direction (upward vs downward) to create a richer, parallax-like wallpaper effect. Both columns sit behind the rating counter at low opacity.

2. **`src/index.css`** — Add a reverse scroll keyframe (`impact-review-scroll-reverse`) so the second column scrolls in the opposite direction. Slightly adjust timing so the two columns feel asynchronous (e.g., 18s vs 22s).

**Structure of the two-column scroll:**
```text
┌─────────────────────────────────────┐
│  col-1 (scrolls up, 18s)           │
│    "review..."   "review..."        │
│       col-2 (scrolls down, 22s)     │
│    "review..."   "review..."        │
│                                     │
│         ★ ★ ★ ★ ★                  │
│          4.86/5                      │
│   average rating across 9,000+      │
│                                     │
│    "review..."   "review..."        │
└─────────────────────────────────────┘
```

- Reviews will be varied in length and tone (emotional, specific, punchy)
- Duplicated arrays for seamless infinite loop (standard technique already in use)
- Existing opacity (`opacity-[0.07]`) and pointer-events stay unchanged so the foreground counter remains prominent

