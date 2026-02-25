

## Convert Community Section to Auto-Scrolling Horizontal Carousel

### Approach
Replace the bento grid with a horizontally scrolling strip of image cards that auto-scrolls continuously using a CSS animation. The animation pauses on hover, creating an infinite marquee effect. The images are duplicated to create a seamless loop.

### Changes

**File: `src/components/CommunitySection.tsx`**

1. **Remove bento grid** — replace the `grid` layout with a horizontal overflow container
2. **Create a marquee strip** — render the 6 unique community images as cards in a horizontal row, then duplicate them for seamless looping
3. **CSS animation** — use a `@keyframes` translateX animation on the inner strip that scrolls from `0` to `-50%` (since content is duplicated). Apply `animation-play-state: paused` on hover
4. **Card styling** — each card is a fixed-width rounded image (e.g. `w-[280px] h-[200px]` on desktop, `w-[220px] h-[160px]` on mobile) with the existing hover overlay effect
5. **Remove FadeInSection wrappers** from individual cards (not needed for scrolling items), keep it on the header
6. **Remove grid-specific `className`** from `gridItems` data (col-span/row-span no longer relevant) — simplify to just the 6 unique images

### Technical Detail
- The marquee uses inline `style` for the `@keyframes` animation via a CSS `animation` property: `scroll 30s linear infinite`
- The inner container has `onMouseEnter` → set `animationPlayState: 'paused'` and `onMouseLeave` → set `animationPlayState: 'running'` via React state
- Images are duplicated (`[...items, ...items]`) so the loop is seamless
- Edge fade masks using `mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent)` on the outer container

