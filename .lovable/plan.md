

# Recreate Mindly Template Branding and Theme

Based on the screenshot, the Mindly template uses a distinct visual identity that differs from the current cinematic amber aesthetic. Here's what will change:

## Visual Changes Summary

### Color Palette Overhaul
- **Background**: Shift from warm charcoal (220 15% 6%) to pure black (0 0% 4%) for a starker, more modern feel
- **Accent color**: Move from warm amber (38 75% 55%) to bright saturated orange (24 95% 53%) -- punchier and more energetic
- **Foreground text**: Slightly cooler white tones
- **Cards/surfaces**: Near-black with subtle borders instead of warm charcoal
- **Muted text**: Cooler gray tones to complement the pure black base

### Typography
- **Headlines**: Switch from Playfair Display (serif) to a clean sans-serif throughout -- the Mindly template uses sans-serif for everything
- **Body**: Keep Inter but adjust weights and tracking for the cleaner aesthetic
- **Gradient text**: Orange-to-warm-orange gradient instead of amber-to-gold

### Section Theming
- Remove the per-section background color shifts (Live Programs teal, Forge ember). Unify all dark sections on the same pure black base
- Keep subtle section differentiation through content and spacing rather than background color changes

### Interaction Effects
- **CTAs**: Update sweep/glow effects to use the new orange instead of amber
- **Borders/dividers**: Slightly more visible borders for a cleaner, more structured feel
- **Ambient glows**: Update radial glows from amber to orange tones

### Specific Component Updates
- **Navbar**: Update accent dot, hover states, and Sign In button to orange
- **Hero**: Update gradient text, glow, and CTA styling
- **Credibility Cues**: Orange accent on values
- **All sections**: Orange badges, labels, and accent elements
- **Footer**: Orange category headers, updated glow line

## Technical Details

### Files to modify:

1. **`src/index.css`** -- Core CSS variable overhaul:
   - Update all HSL custom properties (--primary, --background, --card, --accent, etc.)
   - Update gradient definitions (--gradient-cinematic, --gradient-amber-glow, --gradient-amber-gold)
   - Update shadow and text-shadow tokens
   - Remove section-specific background variables (--bg-live-programs, --bg-forge) or unify them
   - Update CTA sweep/glow colors from amber to orange

2. **`tailwind.config.ts`** -- Typography update:
   - Change `fontFamily.serif` to a clean sans-serif (e.g., keep Inter for everything, or add a geometric sans like the template uses)

3. **`src/index.css`** (base layer) -- Remove serif heading rule:
   - Update the `h1-h6` font-family from Playfair Display to the sans-serif stack

4. **`src/components/HeroSection.tsx`** -- Update hero styling references if any inline color values exist

5. **`src/components/Navbar.tsx`** -- Update `DEFAULT_ACCENT` from amber HSL to orange HSL

6. **`src/components/LiveProgramsSection.tsx`** and **`src/components/ForgeSection.tsx`** -- Remove or unify section-specific background colors to match the single dark base

7. **`index.html`** -- Update Google Fonts link if switching away from Playfair Display

### What stays the same:
- All layout structure and component architecture
- Animation patterns (Framer Motion, scroll triggers, parallax)
- Responsive behavior and mobile overlays
- Content and copy
- Logo and brand identity assets

