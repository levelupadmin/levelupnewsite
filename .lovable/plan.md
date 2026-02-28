

## Animated Cursor Flow on ExpertMembershipCard

### Concept
Add a fake animated cursor (CSS-only, using `@keyframes`) that moves through the LMS card in a continuous loop, simulating a user navigating between recorded chapters, the live feedback badge, and resource tags. The cursor will click on chapter items (highlighting them), hover over the live badge, and move to discipline tags — creating a sense of active, thriving usage.

### Changes to `src/components/why-levelup/ExpertMembershipCard.tsx`

1. **Add an animated cursor element** — a small SVG pointer icon absolutely positioned inside the card, animated via CSS keyframes to travel between key UI hotspots in a ~10s loop:
   - Start at chapter "Visual Language" → moves to click "Director's Cut" (chapter highlights on arrival)
   - Cursor moves to the "Live Feedback" badge (badge pulses/glows on hover)
   - Cursor sweeps down to the "Filmmaking" discipline tag
   - Cursor returns to the video player area (play button glows)
   - Loop restarts seamlessly

2. **Add highlight states that sync with cursor position** — chapters, badges, and tags get temporary glow/highlight classes timed to match the cursor's position via CSS animation delays. This is done purely with CSS keyframes on opacity/border-color of each element, synchronized to the cursor's movement timeline.

3. **Progress bar animates** — the video progress bar width animates forward slightly each cycle to reinforce the "active session" feel.

### Changes to `src/index.css`

Add keyframes:
- `@keyframes cursor-flow` — translates the cursor through ~6 waypoints over 10s
- `@keyframes highlight-pulse` — brief border/shadow glow synced to cursor arrival at each element

### Technical approach
- Pure CSS animations (no JS timers or state) for performance
- Cursor element: small inline SVG of a macOS-style pointer, ~12px
- Uses `position: absolute` with `top`/`left` animated via keyframes with percentage-based positions
- Each chapter row gets a delayed `highlight-pulse` animation to glow when the cursor "arrives"

### Files to edit
- `src/components/why-levelup/ExpertMembershipCard.tsx` — add cursor SVG element, sync highlight classes
- `src/index.css` — add `@keyframes cursor-flow` and `@keyframes highlight-pulse`

