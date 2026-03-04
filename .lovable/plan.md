

## Wall of Love — Structural & Visual Elevation

The current page is functional but reads like a standard reviews listing. The goal is to make it feel like a curated editorial experience — a magazine-quality showcase that builds trust and emotional connection before the user even starts scrolling through cards.

### 1. Hero Overhaul: Animated Gradient Mesh + Marquee

Replace the flat dot-grid background with a soft animated gradient mesh (warm amber, peach, cream blobs that slowly drift using CSS `@keyframes`). This creates an organic, premium feel similar to Apple's marketing pages.

Below the hero heading, add a **horizontal auto-scrolling marquee strip** of short pull-quotes (15-20 word excerpts from top reviews). Two rows scrolling in opposite directions, slightly faded at the edges. This creates immediate social proof and visual energy before the grid.

### 2. Animated Stats Banner

A horizontal strip between hero and filter bar with 4 animated counters:
- **500+** Reviews
- **4.9** Average Rating  
- **10+** Programs
- **15+** States

Uses the existing `AnimatedCounter` component. Counters animate on scroll-into-view. Clean layout with subtle dividers between each stat.

### 3. Featured Reviews Section

Before the main grid, showcase **3 hand-picked or highest-rated reviews** in a larger, editorial card format:
- Larger text with a big opening quotation mark
- Full review text visible (no truncation)
- Slightly tinted background per card matching program color
- Horizontal layout on desktop (3 columns), stacked on mobile

These are randomly selected 5-star reviews with longer text (>300 chars) to ensure quality content.

### 4. Staggered Waterfall Card Entrance

Replace `FadeInSection` wrapping each card with framer-motion `m.div` that uses `whileInView` with staggered delays based on column position. Cards slide up and fade in with a waterfall cascade effect — left column first, then middle, then right.

### 5. Hover Spotlight Effect

When a user hovers over a review card:
- The hovered card lifts (`translateY(-4px)`) and gains a subtle warm glow shadow
- Sibling cards dim to `opacity: 0.5` with a CSS transition
- Achieved via a parent container with `group/grid` and `group-hover/grid` utilities, or via a lightweight React state approach

### 6. Card Design Refinements

- Add a small decorative `"` quote icon at the top-right of each card (very faint, 4% opacity)
- Review text gets a subtle left border in muted primary color (blockquote style)
- Slightly more padding and breathing room
- Program pill gets a colored dot indicator matching the left border color

### Files to Edit

| File | Change |
|------|--------|
| `src/index.css` | Add gradient mesh keyframes animation, marquee animation |
| `src/pages/Reviews.tsx` | Add gradient mesh hero bg, marquee strip, stats banner, featured reviews section, waterfall entrance, hover spotlight, card refinements |

### Approach Notes

- The marquee uses pure CSS `@keyframes` for performance (no JS)
- Stats banner reuses existing `AnimatedCounter` component
- Featured reviews are auto-selected from loaded data (5-star, longest text)
- Hover spotlight uses CSS `has()` selector or a simple parent hover state
- All additions are scoped within the existing `theme-reviews` wrapper

