

## Site-Wide Background Texture & Tone Shift

### Current state
The entire site uses `--background: 0 0% 4%` — a near-pure black (`hsl(0,0%,4%)`). Every section inherits this flat, textureless black. Cards use `0 0% 7%`. There is no grain, noise, or gradient to add depth.

### Proposed changes

**1. Warm the base tone**
Shift the background from neutral black to a very dark warm charcoal with a hint of the brand's amber undertone:
- `--background`: `0 0% 4%` → `20 8% 5%` (almost-black with a warm brown tint)
- `--card`: `0 0% 7%` → `20 6% 8%` (cards stay distinct but harmonise)
- `--secondary` / `--muted`: subtle warm shift to match
- `--border`: warm shift from `0 0% 15%` → `20 5% 14%`

This keeps the site dark and cinematic but removes the "LCD off" coldness. The amber accent will feel more at home.

**2. Subtle full-page film grain overlay**
Add a CSS noise texture on `body::after` — a fixed, full-viewport pseudo-element with a tiny repeating SVG noise pattern at ~3% opacity. This adds the organic, analogue feel of film stock without impacting readability or performance.

**3. Soft ambient gradient on body**
A very subtle radial gradient vignette (darker at edges, slightly lighter at center) applied via `body::before` to give depth — like light falling on a surface rather than a flat digital screen.

### Files to edit
1. **`src/index.css`** — update CSS custom properties for warm tones; add `body::before` (vignette) and `body::after` (grain overlay)
2. **`tailwind.config.ts`** — no changes needed (colors derive from CSS vars)

### Technical details

```text
Before:  hsl(0, 0%, 4%)   ← neutral/cold black
After:   hsl(20, 8%, 5%)   ← warm charcoal with amber undertone

Grain: SVG-based noise in data URI, position: fixed, 
       opacity: 0.03, pointer-events: none, z-index: 0
       mix-blend-mode: overlay

Vignette: radial-gradient(ellipse at 50% 30%, 
          transparent 40%, hsl(20 8% 3% / 0.4) 100%)
```

The About page's `.theme-warm` overrides remain untouched — it already has its own light palette.

