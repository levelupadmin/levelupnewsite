

## Current State

The GeoReachScene uses a CC-licensed world map SVG (`world-map.svg`) as a base layer, overlaid with:
- Indian city dots with ping animations and labels
- International city dots with labels
- Dashed curved arcs connecting India to global cities and internal India-to-India arcs
- A radial glow behind India
- CSS styling in `index.css` that sets continents at 0.4 opacity, neighbors at 0.5, and India at 0.9 with orange fill

## Improvement Suggestions

Here are concrete ways to make the world map visualization more impactful:

### 1. Animated "traveling dot" along arcs
Currently the arcs are static dashed lines. Add a small glowing dot that travels along each arc from India to the destination city, creating a "data packet" or "signal" feel. This is a common pattern in network visualization that immediately communicates "connection" more powerfully than a static line.

**Implementation**: SVG `<circle>` elements with `<animateMotion>` following each arc's `<path>`, staggered timing, small radius (1.5-2px), primary color with a glow filter.

### 2. Gradient arcs instead of flat color
Replace the single-color dashed strokes with gradient strokes that fade from bright at India to dim at the destination. This reinforces the "emanating from India" narrative.

**Implementation**: SVG `<linearGradient>` definitions for each arc direction, applied as stroke paint.

### 3. Scroll-triggered reveal instead of mount-based
Currently all animations fire on mount (via CSS). Since the section uses `FadeInSection` with IntersectionObserver, the animations may have already completed before the user scrolls to it. Tie the arc draw-in and city ping animations to scroll visibility so users actually see them.

**Implementation**: Use `useScrollReveal` hook (already exists in `FadeInSection.tsx`) to conditionally add animation classes only when the section is in view.

### 4. Hover/tap interactivity on city markers
Add hover tooltips showing a brief stat for each city (e.g., "Mumbai - 2,400+ learners" or "Dubai - 180+ learners"). On mobile, these could appear on tap. This transforms the map from a passive decoration into an interactive data visualization.

**Implementation**: SVG `<title>` elements for basic tooltips, or a React state-driven popover positioned at the city's SVG coordinates.

### 5. Pulsing "heartbeat" at India center
Add a subtle, continuous radial pulse emanating from `INDIA_CENTER` — like a heartbeat or sonar ping — to draw the eye to the hub even before arc animations start.

**Implementation**: An SVG `<circle>` with a CSS keyframe that scales from r=3 to r=20 while fading opacity from 0.4 to 0, repeating infinitely with a 2-3s period.

### 6. City count labels on international dots
Currently international dots just show city names. Adding a small count (e.g., "London · 85") would make the data visualization more informative and justify the stats below.

### 7. Better mobile scaling
On mobile (375px), the SVG text labels at `fontSize={7}` in the original 784-unit-wide viewBox become nearly unreadable. Consider hiding city labels on mobile and only showing dots + arcs, or increasing font size with a media query / responsive check.

**Implementation**: Use the existing `useIsMobile()` hook to conditionally set larger font sizes or hide labels.

### Recommended Priority Order
1. **Scroll-triggered reveal** (fixes animations firing unseen — highest impact, moderate effort)
2. **Traveling dots on arcs** (most visually striking upgrade)
3. **Pulsing heartbeat at India center** (simple, high visual impact)
4. **Better mobile scaling** (accessibility fix)
5. **Hover interactivity** (engagement boost)
6. **Gradient arcs** (polish)
7. **City count labels** (informational)

### Files That Would Change
- `src/components/impact/GeoReachScene.tsx` — main component logic
- `src/index.css` — new keyframes (traveling dot, heartbeat pulse)
- No new dependencies needed

