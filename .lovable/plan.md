

## Wall of Love — From Generic SaaS to Cinematic Editorial

The core problem: the reviews page looks like a white-label testimonial widget, completely disconnected from the dark, cinematic brand identity of the rest of the site. There are also two bugs to fix (empty grid, truncated featured reviews).

### Critical Bug Fix: Empty Reviews Grid

The masonry grid shows filter counts but renders no cards. The `columns` CSS layout combined with framer-motion `m.div` wrappers is likely causing a rendering issue. Will investigate and fix the grid rendering.

### Design Direction: Dark Cinematic Theme

Switch the reviews page from the light `.theme-reviews` to the site's native dark theme — matching the homepage's black/amber/orange palette. This immediately eliminates the "SaaS app" feeling and creates brand continuity.

### Changes

**1. Remove `.theme-reviews` light theme**
- Delete the `theme-reviews` wrapper so the page uses the site's native dark palette (dark bg, white text, orange accents)
- Review cards become dark glass-morphic cards (`bg-card` in dark mode = `hsl(22 12% 9%)`) with subtle borders
- Marquee pills, filter tags, stats — all naturally inherit the dark palette

**2. Featured Reviews: Vertical Stack with Full Text**
- Change from `grid-cols-3` horizontal to single-column vertical stack
- Remove text truncation — show the complete review
- Make them larger, more editorial — generous padding, prominent quote marks, full-width layout
- Add a subtle left accent border per program (reuse existing `PROGRAM_BORDER_COLORS`)

**3. Hero: Dark Background with Cinematic Depth**
- Remove the gradient mesh blobs (designed for light bg)
- Add the site's ambient vignette and film grain naturally (they were being hidden by `.theme-reviews`)
- Keep the marquee but restyle pills for dark mode

**4. Review Cards: Cinematic Glass Style**
- Dark card backgrounds with subtle warm border glow on hover
- Remove the blockquote left-border (too clinical) — use a more editorial opening quote mark
- Warmer, more readable text colors against dark backgrounds

**5. Fix Grid Rendering Bug**
- Debug why the masonry grid is empty despite data being loaded
- Likely a CSS `columns` + framer-motion interaction issue

### Files to Edit

| File | Change |
|------|--------|
| `src/pages/Reviews.tsx` | Remove `theme-reviews` wrapper, restructure featured reviews to vertical stack with full text, fix grid bug, restyle cards for dark theme |
| `src/index.css` | Remove/adapt `.theme-reviews` overrides, update gradient mesh for dark, adjust marquee pill styles |

