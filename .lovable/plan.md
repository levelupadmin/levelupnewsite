

# Add "Our Students Are From" Logo Carousel Section

## Overview

A new trust-building section placed at the bottom of the page (after The Forge) featuring a headline and a continuously scrolling marquee of brand/institute logos. Since no logo files are available yet, we'll use styled text placeholders that look like logos.

## Design

The section will have:

1. **A centered headline** -- "Our students are from" in the existing editorial style (serif display font, muted tone)
2. **An infinite-scrolling marquee** of brand/institution names displayed as styled text logos, scrolling left continuously
3. **Fade edges** on both sides to create a seamless, cinematic look (matching the pattern used in the Masterclass scroll row)

The marquee will use a pure CSS `@keyframes` animation for smooth, performant infinite scrolling -- no JavaScript timers or libraries needed. The logos will be duplicated in the DOM to create a seamless loop.

### Placeholder Brands/Institutes (text-styled)

A representative mix of film schools, studios, creative companies, and tech brands:
- FTII
- NID
- Whistling Woods
- YRF
- Excel Entertainment
- TVF
- Google
- Amazon Prime
- Viacom18
- Dharma
- Red Chillies
- Adobe

### Visual Style
- Dark background, consistent with the rest of the page
- Logo text in muted foreground color, large and tracked-out for a clean editorial feel
- A thin separator line above, matching the subtle dividers used elsewhere
- Fade-in animation on scroll using `framer-motion` (consistent with all other sections)
- Smooth, slow horizontal scroll speed for a calm, premium feel

## Technical Details

### New Files
- `src/components/StudentLogosSection.tsx` -- the new marquee component

### Modified Files
- `src/pages/Index.tsx` -- import and render the new section after `ForgeSection`
- `src/index.css` -- add the `@keyframes scroll-left` animation for the marquee

### Implementation Approach
- Use a flex container with two identical sets of logo items side by side
- Apply a CSS animation (`translate-x` from `0` to `-50%`) on the wrapper to create seamless infinite scrolling
- Add `bg-gradient-to-r` / `bg-gradient-to-l` fade overlays on the left and right edges using `pointer-events-none` divs
- Each "logo" is rendered as uppercase, tracked-out text in `font-sans-body` with `text-muted-foreground` styling
- Logos separated by subtle dot or pipe dividers
- The animation speed will be slow (around 30-40 seconds per full cycle) for a calm, non-distracting feel
- `framer-motion` wraps the section for a fade-in entrance on scroll, consistent with all other sections
