

## Ideas to Improve Navbar Hover Experience

Based on the current implementation (glassmorphic pill navbar with thumbnail-only dropdown cards, framer-motion animations, accent-colored line and dot indicators), here are several directions to enhance the hover experience:

---

### 1. Card Hover: Title + Subtitle Reveal Overlay
Currently cards are thumbnail-only with no text. On hover, smoothly reveal the title and subtitle as a frosted overlay at the bottom of each card. This gives users context about what they're clicking without cluttering the default view.

- Fade-in a `backdrop-blur` overlay on the bottom third of the card
- Slide-up the title and subtitle text
- Use the category accent color for the title

### 2. Cursor-Following Glow on Cards
Add a radial gradient glow that follows the mouse position within each card. This creates a premium, interactive feel consistent with the site's existing glow motifs.

- Track `onMouseMove` on each card
- Render a radial gradient at the cursor position using CSS custom properties
- Subtle accent-colored glow (e.g., 8-12% opacity)

### 3. Staggered Scale + Lift on Active Card
Currently cards only scale the image on hover. Enhance with a slight card lift (translateY) and a soft shadow bloom, with neighboring cards subtly dimming.

- Active card: `scale(1.03)`, `translateY(-4px)`, accent-tinted shadow
- Sibling cards: slight opacity reduction (0.7) for focus effect

### 4. Animated Accent Underline on Nav Links
Replace or augment the current dot indicator with an animated underline that morphs width/position as you move between nav links (like a shared layout animation).

- Use framer-motion `layoutId` for a shared underline element
- Underline slides smoothly between links using the target link's accent color
- More visually dynamic than the current dot

### 5. Dropdown Entry: Staggered Card Fan-In
Enhance the current staggered fade-up with a slight rotation or spread effect — cards start slightly rotated/offset and settle into the grid, like a card fan.

- Initial state: `rotateZ(-2deg)`, `scale(0.95)`, offset
- Animate to: `rotateZ(0)`, `scale(1)`, grid position
- Very subtle (1-2 degrees) to stay premium

---

### Recommendation
Ideas **1** (title reveal on hover) and **4** (sliding underline) would have the highest impact with the least visual risk. They add information and polish without changing the minimal aesthetic. Idea **2** (cursor glow) is a nice-to-have for extra premium feel.

I can implement any combination of these — which ones interest you?

