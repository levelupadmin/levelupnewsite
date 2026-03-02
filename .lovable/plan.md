

## LiveProjectsCard Redesign: "Portfolio → Opportunities" Dashboard

### New Concept
Replace the current "assembly line" metaphor with a **creator's portfolio dashboard** that tells the story: "You built great work → now the world comes to you." The card simulates a portfolio view with incoming notifications — client DMs, job offers, gig requests — plus community reactions on shared work. This is aspirational and emotionally resonant.

### Visual Structure

```text
┌──────────────────────────────────┐
│  Portfolio  ·  yourname.lu/work  │  ← Header with portfolio URL
│  ● 3 new notifications           │
├──────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐           │  ← Portfolio grid (3 projects)
│  │img1│ │img2│ │img3│           │    with view counts overlaid
│  │▶2.1K││1.8K│ │4.7K│          │
│  └────┘ └────┘ └────┘           │
├──────────────────────────────────┤
│  ┌── Incoming ──────────────┐   │
│  │ 🟢 Priya (Production Co) │   │  ← Notification 1: Client DM
│  │ "Love your reel — are    │   │    slides in, typing animation
│  │  you free for a shoot?"  │   │
│  ├──────────────────────────┤   │
│  │ 📩 Gig Alert             │   │  ← Notification 2: Job offer
│  │ "Wedding film · ₹45K"   │   │    fades in after
│  ├──────────────────────────┤   │
│  │ 🎬 Community             │   │  ← Notification 3: Community
│  │ "Your edit is 🔥" +14    │   │    reactions pile up
│  └──────────────────────────┘   │
├──────────────────────────────────┤
│  This month: ₹1.2L earned      │  ← Bottom stats bar
│  ████████░░ 3 gigs completed    │
└──────────────────────────────────┘
```

### Animated Sequence (~16s loop, matching ExpertMembershipCard duration)

1. **0–4s (Portfolio showcase)**: Grid thumbnails scale in one by one with view counters counting up. Header shows "Portfolio · yourname.lu/work"
2. **4–8s (Client reaches out)**: A DM notification slides in from the right — avatar, name, company, and a typed-out message asking about availability. Green "online" dot pulses.
3. **8–12s (Gig offer lands)**: A second notification fades in — a structured gig card with title, budget (₹45K), and an "Accept" button that gets a click ripple effect.
4. **12–16s (Community love + earnings)**: Community reactions animate in (🔥 24, ❤️ 18, stacked avatars). Bottom bar shows earnings counter and "3 gigs completed" progress bar. Then resets.

### Key Elements (matching CommunityCard/ExpertMembershipCard complexity)

- **Portfolio header** with a fake URL (like the channel header in CommunityCard) and notification badge counter (1→2→3)
- **3-project grid** with view count overlays that animate up
- **Scrolling notification feed** with 3 distinct notification types:
  - Client DM (avatar + typed message + online indicator)
  - Gig alert card (structured: title, budget, accept button with ripple)
  - Community reactions (emoji badges + stacked reply avatars)
- **Earnings stats bar** at bottom with animated counter and progress
- **Pause on hover** via `group/portfolio` (existing pattern)
- **16s loop** to match ExpertMembershipCard's timing

### Technical Approach

- **Full rewrite of `LiveProjectsCard.tsx`** — new data arrays for notifications, new JSX structure
- **Replace all portfolio CSS keyframes in `index.css`** (lines 640–861) — new keyframes for the notification slide-in sequence, view counter, earnings counter, gig ripple effect
- Reuse existing assets: `forge-1.jpg` through `forge-4.jpg` for portfolio thumbnails, `testimonial-*.jpg` for notification avatars
- Same animation infrastructure: CSS keyframes + opacity/transform transitions, pause-on-hover via group selector
- No new dependencies

### Complexity Parity Check

| Feature | CommunityCard | ExpertMembershipCard | New LiveProjectsCard |
|---------|--------------|---------------------|---------------------|
| Loop duration | 28s scroll | 16s cursor cycle | 16s notification cycle |
| Data items | 10 messages | 4 screens, 3 programs, 3 briefs | 3 projects, 3 notifications, stats |
| Micro-details | Typing dots, online dots, stacked avatars, reactions, reply threads | Click ripples, progress bars, typing dots, tab highlights | Typing animation, online dot, view counters, gig ripple, emoji reactions, earnings counter |
| Narrative | "48hr challenge story" | "LMS walkthrough" | "Portfolio → clients find you" |
| Pause on hover | Yes | Yes | Yes |

### Files Changed

1. **`src/components/why-levelup/LiveProjectsCard.tsx`** — full rewrite with new concept
2. **`src/index.css`** (lines 640–861) — replace all portfolio keyframes with new notification-sequence animations

