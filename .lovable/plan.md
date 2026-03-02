

## Dynamic Thriving Animation for LiveProjectsCard

### Problem with Current Animation
The current 16s loop feels mechanical: everything appears sequentially, then all elements fade out at 96% and hard-reset. It reads as a scripted demo, not a living, thriving portfolio.

### New Approach: "Always Buzzing" Continuous Narrative

Instead of one reveal-then-reset cycle, the card should feel like a live feed where things keep happening. Elements **stay** after appearing and subtly breathe, while outcomes **rotate** through a stream of ongoing activity.

**Timeline redesign (still 16s loop, but with overlap and persistence):**

```text
0s────4s────8s────12s────16s/0s
│ Thumbs scale in, then FLOAT continuously (never disappear)
│ View counts tick up on each thumb (12→47→89→...)
│      │ DM #1 slides in, stays 6s, slides out
│      │      │ Gig enquiry slides in as DM exits
│      │      │      │ Cohort reactions pop, counts tick up
│      │      │      │ 2nd DM slides in (different person)
│                         │ Summary pulses with updated stats
│ ─── card border glow pulses subtly throughout ───
```

### Key Enhancements

1. **Thumbnails float after appearing** — gentle Y-axis bob (2-3px) so they feel alive, never disappear
2. **View counters on thumbnails** — each project shows a view count that ticks up (e.g., "127 views" incrementing), reinforcing that people are seeing this work
3. **Two rotating DMs instead of one** — a second person ("Arjun · TVF") reaches out about the screenplay, creating a sense of multiple opportunities, cycling alternately
4. **Reaction counters increment** — 🔥 24→31, ❤️ 18→26 over the loop, feeling like real-time engagement
5. **Gig enquiry amount updates** — subtle flash when a second enquiry replaces the first (Wedding Film ₹45K → Brand Video ₹60K)
6. **Card border glow pulse** — subtle ambient pulse on the card border synced to new events arriving
7. **Bottom summary counts up progressively** — "3 projects · 1 paid gig" → "3 projects · 2 paid gigs" as the second enquiry lands

### Files Changed

1. **`src/components/why-levelup/LiveProjectsCard.tsx`**
   - Add view count display on each thumbnail with `animate-pf-viewcount` class
   - Add second DM outcome (Arjun from TVF referencing screenplay)
   - Add second gig data that cycles with the first
   - Add pulsing border glow wrapper
   - Reaction emoji counts become dynamic (rendered via CSS content swap or dual-element opacity toggle)

2. **`src/index.css`**
   - Thumbnails: keep scale-in, add continuous `pf-float` bob after reveal (no fade-out at end)
   - View counts: `pf-viewcount` — numbers tick up via opacity-swapping spans
   - DM #1 and DM #2: alternate visibility windows (DM1: 25-55%, DM2: 60-90%)
   - Gig enquiry: two states cycling (first gig 50-70%, second gig 75-95%)
   - Reactions: `pf-reactions-tick` — scale pop at multiple points in the loop
   - Card border: `pf-border-glow` — subtle opacity pulse synced to new events
   - Bottom summary: stays visible from 40% onward, text swaps at 75%
   - Remove hard fade-out-to-zero on all elements — everything either persists or cross-fades with its replacement

