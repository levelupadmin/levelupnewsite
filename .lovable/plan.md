

## Mobile Navbar Cards: Always-Visible Labels + Tap Feedback

**Problem**: On mobile, hover effects (title reveal, glow, lift) don't work. Currently mobile cards are thumbnail-only with no text — users have to guess what each card is.

**Solution**: Always show the title and subtitle on mobile cards (no hover needed), and add tap feedback to replace the hover micro-animations.

---

### Changes (all in `src/components/Navbar.tsx`)

**1. Always-visible title + subtitle overlay on mobile cards (lines 443-454)**

Replace the current image-only mobile cards with a version that permanently shows a gradient overlay at the bottom with the item's title and subtitle. This uses the category accent color for the title — same style as the desktop hover reveal, but always visible.

**2. Active-state tap feedback**

The mobile cards already have `active:bg-white/10`. Enhance with a slight `active:scale-[0.97]` transform and a subtle accent-colored left border on tap, giving the same tactile feel as the desktop `whileTap`.

**3. Accent dot indicator per card**

Add a small accent-colored dot or thin accent bar on the left edge of each mobile card to visually tie them to their category, matching the desktop accent theming.

---

### Technical detail

- The overlay will use `absolute inset-x-0 bottom-0` with `bg-gradient-to-t from-black/70 to-transparent` and show `item.title` + `item.subtitle`
- Title styled with `style={{ color: linkAccent }}` matching desktop behavior
- Tap transform via Tailwind `active:scale-[0.97] transition-transform`
- No new components or files needed — contained to the mobile card rendering block (~lines 422-455)

