

## Craft.do-Style Floating Pill Navbar

Transform the current full-width navbar into a floating, pill-shaped navigation bar inspired by Craft.do's design -- a contained, centered bar that floats above the content with rounded corners and a polished, elevated look.

### What Changes

**From:** A full-width sticky navbar that spans edge-to-edge with a gradient background, transitioning to a blurred bar on scroll.

**To:** A floating, rounded-pill navbar centered at the top of the page with a semi-transparent glassmorphic background, subtle shadow, and compact layout -- adapted to the site's dark cinematic theme.

### Design Details

- **Shape**: Rounded-full pill container (not full-width), centered horizontally with auto margins and a max-width constraint
- **Spacing**: Small top margin (~`mt-4`) so it floats away from the browser edge
- **Background**: Dark glassmorphic surface (`bg-card/70 backdrop-blur-xl`) with a subtle border and shadow, consistent with the cinematic palette
- **Layout**: Logo left, nav links center, Sign In button right -- all inside the pill
- **Scroll behavior**: On scroll, the pill slightly tightens its padding and the shadow intensifies, but it remains a floating pill (no full-width takeover)
- **Mobile**: The pill shrinks to just logo + hamburger; the full-screen overlay menu stays the same

### Technical Details

**File: `src/components/Navbar.tsx`**

1. Add an outer wrapper `div` that is `fixed top-0 left-0 right-0 z-50` with flex centering and top padding
2. Move the pill styling to an inner container with:
   - `mx-auto max-w-4xl w-[95%]` for centered, contained width
   - `rounded-full` for the pill shape
   - `bg-card/60 backdrop-blur-xl border border-border/30` for dark glass effect
   - `shadow-lg` / `shadow-xl` for floating depth
   - `px-4 md:px-6 py-2 md:py-2.5` for compact internal padding
3. On scroll (`scrolled` state):
   - Reduce outer top padding slightly
   - Intensify the background opacity and shadow
   - Shrink logo slightly (keeping existing behavior)
4. Keep existing `data-cursor` attributes, mobile hamburger, and `AnimatePresence` mobile overlay unchanged
5. The nav links and Sign In button remain structurally the same but with tightened spacing to fit the pill form factor

