

## Site Launch Showcase Video — "The New LevelUp"

A 25-second social media video (1080x1920 vertical for Instagram/Reels, or 1920x1080 for YouTube — see question below) that shows off the actual site through screen-captured screenshots composited into cinematic motion sequences. The goal: make people want to visit the site.

### Creative Direction

- **Aesthetic**: Cinematic Minimal — matching the site's dark-warm palette
- **Palette**: Background `#141110` (hsl 22 14% 6%), accent `#F2720C` (hsl 24 95% 53%), warm gold `#D4A853`, cream text `#EDEDED`
- **Fonts**: Syne (display, matching site) + DM Sans (body)
- **Motifs**: Orange accent line sweeps, subtle film grain, parallax scroll simulation
- **Vibe**: Premium, cinematic, "this isn't your average edtech site"
- **Emotional arc**: Intrigue → awe (scroll reveal) → energy (features) → pride (brand close)

### Scene Breakdown (25s @ 30fps = 750 frames)

**Scene 1 — Hook (0-3s, 90 frames)**
Text: "We rebuilt everything." on dark background with orange accent line drawing across. Quick, punchy, minimal.

**Scene 2 — Hero Reveal (3-8s, 150 frames)**
Screenshot of the hero section scales up from a phone/laptop mockup frame. The rotating word animation is highlighted with a subtle glow callout. Slow parallax drift upward simulating a scroll.

**Scene 3 — Scroll Journey (8-15s, 210 frames)**
A continuous simulated scroll through 4-5 key site screenshots (credibility cues, Why LevelUp cards, masterclass section, community section) — each entering from bottom with parallax depth. Quick cuts between sections with wipe transitions. Text callouts like "Interactive cards", "Cinematic design", "Built for creators" appear and fade.

**Scene 4 — Masterclass Page (15-19s, 120 frames)**
Screenshot of a masterclass detail page (Venket Ram or Anthony) slides in. Brief zoom into the hero image showing the layered design. Text: "Every page, crafted."

**Scene 5 — Close (19-25s, 180 frames)**
LevelUp logo centers with tagline "Where India's next great creators are made" + URL `leveluplearning.in`. Orange radial glow pulse. Film grain persists.

### Implementation

1. **Capture screenshots**: Use `browser--screenshot` at key scroll positions of the live site to get ~6-8 high-quality PNGs of different sections
2. **Set up Remotion project** in `remotion/` directory with Syne + DM Sans fonts
3. **Build 5 scene components** using the screenshots as `staticFile()` assets, with `interpolate()`-driven parallax, scale, and opacity animations
4. **Use `TransitionSeries`** with wipe/fade transitions between scenes
5. **Add persistent layers**: subtle film grain overlay, ambient orange vignette
6. **Render to MP4** via programmatic render script

### Technical Details

- Resolution: 1920x1080 (landscape, good for Twitter/LinkedIn/YouTube)
- 30fps, ~25 seconds, H.264 codec
- All screenshots placed in `remotion/public/images/`
- No audio (muted render) — user can add music in post
- No `backdropFilter` (sandbox constraint)

### Aspect Ratio Note

For maximum social media impact, I'll produce the 1920x1080 landscape version. If you also want a 1080x1920 vertical version for Instagram Reels/Stories, I can render a second pass after.

