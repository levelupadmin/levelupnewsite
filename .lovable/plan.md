

## Plan: Inline "More" Dropdown

Currently, hovering "More" expands the full-width panel inside the navbar pill (same as Masterclasses/Live). Instead, "More" should show a small floating dropdown anchored directly below the "More" label — independent of the expandable panel.

### Changes — `src/components/Navbar.tsx` only

1. **Exclude "More" from the expandable panel**: Change the `expanded` condition (line 86) to also exclude compact links, so hovering "More" no longer triggers the full-width panel.

2. **Add a small positioned dropdown** next to the "More" nav link on desktop: Wrap the "More" link in a `relative` container. When `activeIndex` points to a compact link, render a small `absolute` dropdown below it with:
   - Frosted glass background matching the navbar aesthetic (`bg-black/70 backdrop-blur-md border border-white/10 rounded-lg shadow-xl`)
   - Two text links: "Student Stories" and "Careers"
   - Subtle fade+slide-down animation via framer-motion
   - `onMouseLeave` on the dropdown container closes it

3. **Styling**: The dropdown will be ~160px wide, positioned `top-full right-0`, with `py-1 px-1` padding and each item styled as `px-3 py-2 text-sm hover:bg-white/8 rounded-md`.

### Files to Edit
- `src/components/Navbar.tsx`

