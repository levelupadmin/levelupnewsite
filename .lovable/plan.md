

# Convert Brand Grid to Dual-Row Scrolling Marquee

## What changes
Replace the static 3x4 / 6-column brand grid in `StudentLogosSection.tsx` with two horizontally scrolling rows that move in opposite directions and pause on hover -- matching the reference image style.

## Details

- Split the 12 brands into two rows of 6
- Each row is a CSS-animated infinite marquee (using `@keyframes` translateX loop)
- Row 1 scrolls left-to-right, Row 2 scrolls right-to-left
- Both rows pause on hover (`animation-play-state: paused`)
- Brands are duplicated (rendered twice) to create a seamless loop
- Remove the existing static grid markup
- Keep the headline ("Our students come from..."), separators, and all other content unchanged

## Technical approach

- Add two keyframes in `src/index.css`: `scroll-left` (translateX 0 to -50%) and `scroll-right` (translateX -50% to 0)
- Each row is `overflow: hidden` with a flex container inside that has the animation applied
- On hover of each row container, set `animation-play-state: paused`
- Speed: ~30s per loop for a slow, elegant scroll
- Brand items styled as uppercase tracking-wide text (same as current)

