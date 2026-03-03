

## Plan: Replace Thread Weave with Constellation Network Graph

### What we're building
A canvas-based network visualization where ~20 floating nodes (representing people) drift gently and form animated connection lines between pairs as the counter climbs. Cursor proximity causes nearby nodes to attract toward the pointer and glow brighter.

### Files to create
**`src/components/impact/CollabNetwork.tsx`** — New canvas component replacing ThreadWeave
- ~20 nodes with random positions, gentle drift (sine-based), and slight size variation
- As `progress` (0→1) increases, edges animate between node pairs — line draws from one node to the other with a brief pulse
- By progress=1, a rich constellation of ~30 connected edges visible
- Cursor magnetic interaction: nodes within radius drift toward cursor, connection lines near cursor glow brighter
- Subtle radial cursor halo (reuse pattern from ThreadWeave)
- Nodes rendered as small circles with initials or plain dots in brand colors
- Intersection glow at nodes with active connections

### Files to modify
**`src/components/impact/CollaborationsScene.tsx`**
- Replace `<ThreadWeave>` import and usage with `<CollabNetwork>`
- Pass same `progress` and `isVisible` props
- Keep counter, ticker, and floating collab tags unchanged

### Files to delete
**`src/components/impact/ThreadWeave.tsx`** — No longer needed

### Technical approach
- Same canvas + requestAnimationFrame pattern as ThreadWeave for 60fps performance
- Same mouse tracking with smooth interpolation
- Same DPR-aware rendering
- Nodes stored as array of `{ x, y, driftX, driftY, radius, color, label }` — regenerated on resize
- Edges stored as pairs of node indices — revealed progressively based on counter progress
- Edge drawing: quadratic curve between nodes (slight arc) with gradient stroke matching node colors

