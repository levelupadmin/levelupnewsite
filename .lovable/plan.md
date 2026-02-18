

# Revamp Community Card Illustration

## Overview
Transform the current simple CommunityCard (6 avatars + 1 chat bubble) into a rich, dynamic, multi-layered illustration matching the complexity of the Portfolio-Driven Learning card -- with floating elements, animated accents, layered UI mockups, and multiple visual zones.

## Visual Design

The new card will feature:

1. **Stacked chat bubbles (3 layered, like the stacked thumbnails)** -- offset and slightly rotated, each with a different community message, using float animations. The front bubble is highlighted with a primary border glow.

2. **Floating avatar cluster** -- 6 avatars arranged in an organic arc/constellation pattern (not a flat row), each with float animations at different delays, connected by faint dotted lines to suggest a network graph.

3. **Live activity feed mockup** -- A small vertical panel on the right side (like the phone reel in card 2) showing 3-4 mini activity items: "Priya shared a reel", "Arjun reviewed your edit", "New prompt: 48hr challenge" -- with tiny colored dots (green for online) and timestamps.

4. **Floating tags** -- Community-themed tags scattered around the edges: "Feedback Loop", "Peer Review", "2K+ Members", "Daily Prompts", "Work-in-Progress" -- matching the same style as the portfolio card tags.

5. **Pulse ring / online indicator** -- A progress-ring-style SVG in the corner showing "142 online now" with a pulsing green dot, mirroring the progress ring from the portfolio card.

6. **Reaction bar at the bottom** -- A horizontal bar (like the timeline/playhead bar in card 2) showing emoji reactions sliding across: fire, clap, heart, camera -- with a subtle slide animation.

## Technical Details

### File: `src/components/why-levelup/CommunityCard.tsx` (full rewrite)

**Imports:**
- Keep all 6 testimonial image imports
- Add `MessageCircle` from lucide-react for chat icon accents

**Data arrays:**
- `chatBubbles`: 3 objects with message text, position offsets, rotation, and zIndex (mirroring `projects` array pattern from LiveProjectsCard)
- `floatClasses`: reuse `["animate-float-card-1", "animate-float-card-2", "animate-float-card-3"]`
- `tags`: 5 community-themed floating tags with top/left positions and animation delays
- `activityItems`: 3-4 mini activity feed entries with name, action, and time

**Layout structure (mirroring LiveProjectsCard):**
- Outer `div` with `relative w-full h-full flex items-center justify-center p-4 overflow-hidden`
- Network lines accent on left edge (replacing film strip) -- faint dotted vertical connector lines
- Central stacked chat bubbles zone (replacing stacked thumbnails)
- Activity feed panel on right (replacing phone reel mockup)
- Floating tags scattered around edges
- Pulse ring with "142 online" in top-right corner (replacing progress ring)
- Reaction bar at bottom (replacing timeline/playhead)

**Avatars:**
- Positioned as an arc/scatter above the chat bubbles, each with float animations and slight rotation
- Connected by a faint SVG path (network graph feel)

### File: `tailwind.config.ts`
- No changes needed -- reuses existing float-card-1/2/3, slide-playhead, and progress-fill animations.

