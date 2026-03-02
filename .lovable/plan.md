

## LiveProjectsCard Redesign: "From Class to Career"

The core problem: the current card looks like a SaaS portfolio app (URL bar, notification badges, "Accept" buttons). It should instead tell the story: **"You learned at LevelUp → you made this work → opportunities found you."**

### New Concept

Replace the app-like header and notification UI with a **student journey narrative** — projects clearly tagged with their LevelUp origin (program name, week number), followed by organic real-world outcomes (DMs, gig inquiries, peer love) that feel like natural consequences of great work, not platform features.

### Visual Structure

```text
┌──────────────────────────────────┐
│  🎬  My Work                    │  ← Simple label, no URL/app chrome
│      ───────────────────────     │
├──────────────────────────────────┤
│  ┌────────┐ ┌────────┐ ┌──────┐ │
│  │  img1  │ │  img2  │ │ img3 │ │  ← 3 portfolio pieces
│  │        │ │        │ │      │ │
│  │ "Debut │ │"Brand  │ │"Music│ │
│  │ Short" │ │Showreel│ │Video"│ │
│  │BFP Wk8 │ │VE Final│ │Forge │ │  ← Tagged with program origin
│  └────────┘ └────────┘ └──────┘ │
├──────────────────────────────────┤
│  ── What happened next ───────  │  ← Section divider (not "Incoming")
│                                  │
│  [avatar] Priya · Pixel Studios │  ← Someone reached out naturally
│  "Saw your BFP short — can we   │    (references the specific project)
│   talk about a shoot?"           │
│                                  │
│  [💼] Freelance enquiry          │  ← Organic gig, not "Gig Alert"
│  Wedding Film · ₹45K            │    (no "Accept" button — just proof)
│                                  │
│  [🔥24 ❤️18] from your cohort   │  ← Peer reactions, not "Community"
│  +14 creators responded          │
├──────────────────────────────────┤
│  ▲ 3 projects · 1 paid gig      │  ← Simple outcome summary
│    Built during LevelUp programs │  ← Origin attribution
└──────────────────────────────────┘
```

### Key Changes from Current

1. **Remove SaaS chrome**: No URL bar (`yourname.lu/work`), no notification badge counter, no "Accept" button with ripple, no "Gig Alert" label
2. **Tag projects with their LevelUp origin**: Each thumbnail shows which program/week it came from (e.g., "BFP Week 8", "VE Academy Final", "Forge Project")
3. **Reframe notifications as organic outcomes**: "What happened next" instead of "Incoming" — someone saw your work and reached out, not an app notification
4. **Client DM references the specific project**: "Saw your BFP short" ties the opportunity directly to the learning
5. **Gig inquiry is passive proof, not an action**: No "Accept" button — just evidence that work leads to paid opportunities
6. **Community reactions come from "your cohort"**: Ties it back to the LevelUp learning experience
7. **Bottom bar**: "Built during LevelUp programs" instead of earnings stats — reinforces the learning→output narrative

### Animation Sequence (~16s loop, same timing)

- **0–4s**: Thumbnails scale in with program tags fading up beneath each
- **4–8s**: First outcome slides in — client DM referencing the student's project, typing dots
- **8–12s**: Freelance enquiry fades in (passive, no CTA), then cohort reactions animate
- **12–16s**: Bottom summary counts up ("3 projects · 1 paid gig"), then resets

### Files Changed

1. **`src/components/why-levelup/LiveProjectsCard.tsx`** — rewrite with new "From Class to Career" concept
2. **`src/index.css`** — update the portfolio keyframes (same animation names, adjusted content timing)

