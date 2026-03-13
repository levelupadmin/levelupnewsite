

## Align Careers Page with Site Design System

The current Careers page uses a standalone color scheme (navy `#1C2333`, gold `#D4AF5A`) and fonts (DM Sans, Space Mono, Syne) that don't match the rest of the site. The site uses:

- **Background**: warm brown/charcoal `hsl(22 14% 6%)` with film grain overlay
- **Accent**: orange `hsl(24 95% 53%)` (not gold)
- **Fonts**: Sora (body), Bebas Neue (display headlines) — no DM Sans/Space Mono/Syne
- **Components**: Navbar, Footer shared across pages

### Changes to `src/pages/Careers.tsx`

**Replace the standalone nav** with the shared `<Navbar />` component and wrap content with the shared `<Footer />` — consistent with Index, About, and other pages.

**Replace color palette**:
- `#1C2333` (navy) → `bg-background` (hsl 22 14% 6%)
- `#131929` (dark navy) → `bg-card` (hsl 22 12% 9%)
- `#D4AF5A` (gold) → `text-primary` / `bg-primary` (orange hsl 24 95% 53%)
- White/opacity text → `text-foreground`, `text-muted-foreground`

**Replace inline font styles**:
- `DM Sans` body → remove (Sora is default via Tailwind `font-sans`)
- `Space Mono` labels → `font-sans` with tracking (Sora with wide tracking)
- `Syne` card titles → `font-sans font-semibold`
- `Bebas Neue` headlines → `font-display` (already mapped in Tailwind)

**Add film grain overlay** and ambient glow consistent with other sections.

**Replace inline `style={}` props** with Tailwind classes wherever possible (`bg-background`, `text-primary`, `border-primary/20`, etc.).

**Marquee**: keep the gold/orange accent background using `bg-primary`, text as `text-primary-foreground`.

**Role cards**: border uses `border-primary/15`, hover fill uses `bg-primary`, hover text uses `text-primary-foreground`.

**Footer CTA button**: use `bg-primary text-primary-foreground` with hover outline style.

### Files to Edit

1. **`src/pages/Careers.tsx`** — Full rewrite to use site design system (Navbar, Footer, Tailwind theme tokens, font-display/font-sans classes, film grain overlay)

