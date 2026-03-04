

## Wall of Love — Light Mode Visual Overhaul

The About page already uses a `theme-warm` class that flips CSS variables to a warm white palette. We'll create a similar but distinct `theme-reviews` light theme for the Wall of Love, then redesign the page with premium visual touches.

### 1. New Light Theme: `theme-reviews`

Add a new scoped theme in `src/index.css` (similar to `.theme-warm` but with a cooler, crisper feel):

- Background: warm off-white (`hsl(30 20% 97%)`)
- Cards: pure white with subtle warm shadows
- Text: near-black headlines, warm gray body text
- Primary accent stays orange — it pops beautifully on white
- Borders: very light warm gray
- Muted foreground slightly darker for readability on white

Apply via `<div className="theme-reviews">` wrapper around the page content (same pattern as About page's `theme-warm`).

### 2. Visual Enhancements to Reviews.tsx

**Hero Section**
- Large decorative quote marks (typographic `"`) behind the heading as a faded watermark element
- Animated gradient text on "Wall of Love" using the amber gradient
- Subtitle gets slightly tighter, more editorial feel

**Filter Bar**
- Rounded pill buttons instead of squared-off chips
- Active pill: solid orange with a subtle shadow glow
- Inactive pills: light gray background with smooth hover transitions
- Sticky bar gets a clean white/frosted glass look

**Review Cards — Premium Redesign**
- White cards with rounded-xl corners and subtle warm shadow (`shadow-sm` + hover elevation)
- Thin left border accent in a program-specific color
- Avatar initials get softer pastel backgrounds (adjusted for light mode)
- Star ratings use filled amber on white — high contrast
- Program tags: small rounded pills with light tinted backgrounds
- Hover: gentle lift + shadow increase (no harsh glow)
- Blockquote text gets a faint left border accent

**Grid Layout**
- Keep masonry 2-col on desktop, 1-col on mobile
- Slightly wider gap between cards for breathing room
- 3-column layout on xl screens for more visual density

**CTA Section**
- Gradient background panel (warm orange to amber) with white text
- Rounded corners, stands out as a distinct block at the bottom

**Ambient Details**
- Subtle dot pattern or grid overlay on the hero background (CSS only)
- Soft radial gradient blush behind the hero heading

### 3. Navbar/Footer Handling

The Navbar and Footer are shared components using CSS variable-driven colors. Wrapping the entire page (including Navbar/Footer) in `theme-reviews` will automatically flip them to light mode — same approach as the About page. The Navbar already handles this gracefully.

### Files to Edit

| File | Change |
|------|--------|
| `src/index.css` | Add `.theme-reviews` scoped CSS variables |
| `src/pages/Reviews.tsx` | Wrap in `theme-reviews`, redesign cards/hero/filters/CTA with light-mode-appropriate classes and visual upgrades |

