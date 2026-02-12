

## Add Subtle Background Grid to the Credibility Stats Section

Add a CSS-based dot grid pattern behind the CredibilityCues section, similar to the subtle grid visible in the first reference image.

### Changes (single file: `src/components/CredibilityCues.tsx`)

**1. Add a CSS dot-grid overlay using a pseudo-element approach**
- Insert an absolutely positioned div behind the content with a `radial-gradient` repeating pattern to create a subtle dot grid
- Grid specs: small dots (~1px) spaced ~30px apart, using `white` at very low opacity (~0.04-0.06) to keep it subtle against the dark background
- The grid will cover the full section but fade out at the edges using a mask gradient for a smooth blend

### Technical Detail

The grid is created purely with CSS using `background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)` with `background-size: 30px 30px`. A CSS mask with radial-gradient fades the edges so the grid doesn't have hard cutoffs.
