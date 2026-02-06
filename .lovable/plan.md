

# Add Footer Section to LevelUp Learning Homepage

## Composition Reference

The reference image shows a multi-column footer with:
- A branded left column with a bold CTA or visual element
- Multiple link columns organized by category with small category headers
- Social media icons row
- Bottom bar with legal links and copyright

We will adapt this composition for LevelUp Learning's cinematic, editorial brand.

## What Will Be Built

### Footer Structure (4 areas)

**1. Top Footer -- Multi-Column Navigation**

A wide, generous footer grid with:

- **Left column (brand pillar):** The LevelUp wordmark (serif + sans, matching the Navbar), a short brand tagline ("A creative education ecosystem for serious creators"), and a subtle email CTA ("hello@leveluplearning.com")
- **"Learn" column:** Links grouped under a muted category label -- Masterclasses, LevelUp Live, The Forge, StarDa
- **"Company" column:** About, Careers, Press, Blog
- **"Support" column:** FAQs, Contact Us, Terms, Privacy Policy

Category labels styled in the `text-primary` amber accent, small caps. Links in `text-muted-foreground` with hover to `text-foreground`.

**2. Social Icons Row**

A horizontal row of social media icons (Instagram, YouTube, X/Twitter, LinkedIn) using Lucide icons, spaced cleanly below the columns. Minimal circular outline style matching the reference.

**3. Bottom Bar**

A thin top border separating the legal strip:
- Left: Copyright text ("2026 LevelUp Learning. All rights reserved.")
- Right: Inline legal links (Terms, Privacy Policy, Cookies)

**4. Large Brand Watermark**

A dramatic oversized "LevelUp" wordmark rendered in `font-serif-display` at a very large size with extremely low opacity, sitting behind the bottom of the footer -- mirroring the large brand name treatment visible in the reference image. This creates visual depth and a confident brand statement.

### Visual Style
- Dark background matching `bg-background` (same as the rest of the site)
- Generous vertical padding (`py-16 md:py-20`)
- Consistent `max-w-6xl` container width
- Thin top border or subtle gradient separator
- No ambient glow -- the footer is grounded and quiet
- Framer Motion fade-in entrance on scroll

### Responsive Behavior
- Desktop (lg): 4-column grid (brand + 3 link columns)
- Tablet (md): 2x2 grid
- Mobile: Single column stack with brand on top, link groups stacked below
- Large watermark hidden on mobile, visible on tablet and up

---

## Technical Details

### New File
- `src/components/Footer.tsx` -- The complete footer component

### Modified File
- `src/pages/Index.tsx` -- Import and render Footer as the last element

### Implementation Approach
- Uses Lucide React icons for social media (Instagram, Youtube, Twitter, Linkedin)
- Framer Motion for scroll-triggered entrance animation
- Category headers use `text-primary font-sans-body text-xs uppercase tracking-widest`
- Links use `font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors`
- Brand wordmark in left column matches Navbar pattern (`font-serif-display` + `font-sans-body`)
- Large watermark uses `font-serif-display text-[8rem] md:text-[12rem] lg:text-[16rem] opacity-[0.03]` with `overflow-hidden` on the section
- Bottom bar separated by `border-t border-border`
- All placeholder links use `href="#"` ready for real routes

### Section Order After Change

```text
Navbar
Hero
  Credibility Cues
Why LevelUp
Masterclasses
LevelUp Live
The Forge
Student Logos (marquee)
Testimonials
FAQ
Footer  <-- NEW (last element)
```

