

## LiveProjectsCard Redesign — Portfolio Builder Simulator

### Problem
The current card is a static collage of floating thumbnails with minimal interactivity. Compared to the CommunityCard (auto-scrolling chat with reactions/replies/typing) and ExpertMembershipCard (animated cursor cycling 4 screens with ripples), it feels flat and underwhelming.

### Concept: "Portfolio Assembly Line"
A miniature portfolio workspace that auto-builds itself — projects appear one-by-one, get "reviewed" with feedback badges, and slot into a portfolio grid. The whole thing loops infinitely and pauses on hover, matching the other two cards.

### Visual Structure

```text
┌─────────────────────────────────┐
│  ┌──────────────────────────┐   │
│  │  PORTFOLIO  ·  3 projects │   │
│  ├──────────────────────────┤   │
│  │ ┌────┐ ┌────┐ ┌────┐    │   │
│  │ │img1│ │img2│ │img3│    │   │  ← Portfolio grid slots
│  │ │ ✓  │ │ ✓  │ │ ◯  │    │   │    fill in sequentially
│  │ └────┘ └────┘ └────┘    │   │
│  │                          │   │
│  │  ┌── Active Project ──┐  │   │
│  │  │  [video preview]   │  │   │  ← Current project being
│  │  │  ▶ Short Film      │  │   │    worked on (cycles)
│  │  │  ████░░░ 72%       │  │   │
│  │  └────────────────────┘  │   │
│  │                          │   │
│  │  Feedback:               │   │
│  │  "Great pacing" ★★★★☆   │   │  ← Mentor feedback appears
│  │  ┌─avatar─┐ Ravi Sir    │   │    with typing animation
│  └──────────────────────────┘   │
│                                 │
│  V1 ████████░░░░  A1 ████░░░░  │  ← Timeline bar (enhanced)
└─────────────────────────────────┘
```

### Animated Sequence (CSS keyframes, ~12s loop)

1. **0–3s**: First project (Short Film) — thumbnail scales in, progress bar fills to 100%, checkmark appears, slots into portfolio grid position 1
2. **3–6s**: Second project (Showreel) — same sequence, mentor feedback bubble types in with avatar + star rating, slots into grid position 2
3. **6–9s**: Third project (Creator Reel) — phone-format reel preview, engagement stats count up (12.4K views), slots into grid position 3
4. **9–12s**: Portfolio "complete" state — all 3 slots glow, "Portfolio Ready" badge animates in, then resets

### Key Elements

- **Portfolio header bar** with project count that increments (like the channel header in CommunityCard)
- **3-slot grid** at top that fills sequentially with completed project thumbnails + checkmarks
- **Active project panel** — the current project being worked on, with video thumbnail, title, and animated progress bar
- **Mentor feedback section** — a message bubble with avatar, typed-out feedback text, and star rating (mirrors CommunityCard's message style)
- **Enhanced timeline** — multi-track with colored segments for video/audio/SFX, animated playhead
- **Pause on hover** via `group-hover/portfolio:[animation-play-state:paused]` (matches CommunityCard pattern)
- **Ambient glow** matching the other cards

### Technical Approach

- **Single file change**: `src/components/why-levelup/LiveProjectsCard.tsx` — full rewrite
- **CSS keyframes in `tailwind.config.ts`**: Add `portfolio-step-1` through `portfolio-step-4` keyframes for the sequential build animation, plus `feedback-type` for the typing effect
- **Existing assets**: Reuse `forge-1.jpg` through `forge-4.jpg` and testimonial avatars for mentor feedback
- **No new dependencies** — pure CSS animations + existing Tailwind utilities

### Complexity Parity

| Feature | CommunityCard | ExpertMembershipCard | New LiveProjectsCard |
|---------|--------------|---------------------|---------------------|
| Auto-animation | Scrolling chat | Cursor cycling 4 screens | Sequential project build |
| Pause on hover | Yes | Yes (group) | Yes |
| Data richness | 10 messages, reactions, replies | 4 screens, tabs, programs | 3 projects, feedback, ratings |
| Micro-details | Typing dots, online indicators, stacked avatars | Click ripples, progress bars, typing dots | Star ratings, progress fill, checkmarks, view counts |
| Narrative | 48hr challenge story | LMS walkthrough | "Build → Review → Portfolio" journey |

