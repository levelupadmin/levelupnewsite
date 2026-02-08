

## Craft.do-Style Sliding Hover Highlight on Navbar Links

Add the signature Craft.do hover interaction to the navbar: a soft, rounded background capsule that appears behind whichever nav link you hover, and **smoothly slides between links** as you move your mouse across them. When your mouse leaves the nav area entirely, the highlight fades out.

### How It Looks

- **No hover**: Just the plain text links (current look)
- **Hover a link**: A subtle, semi-transparent pill/capsule background fades in behind that link
- **Move to another link**: The pill **slides horizontally** to the new link, morphing its width to fit -- this is the magic that makes it feel premium
- **Leave the nav area**: The pill fades out smoothly

### Technical Approach

**File: `src/components/Navbar.tsx`**

1. **Track hovered link index** -- Add a `hoveredIndex` state (`number | null`) to know which link the cursor is over

2. **Use Framer Motion's `layoutId`** -- Render a `motion.div` with a shared `layoutId="nav-highlight"` inside whichever link is hovered. Framer Motion automatically animates the position and size of this element as it "moves" between links -- this creates the sliding effect with zero manual position calculations

3. **Highlight styling** -- The sliding pill uses:
   - `bg-white/10` (subtle light wash on dark background)
   - `rounded-full` to match the pill navbar aesthetic
   - `absolute inset-0` positioning within each link (links need `relative` and some padding)
   - Fade in/out via `AnimatePresence` with `initial={{ opacity: 0 }}` and `exit={{ opacity: 0 }}`

4. **Link padding adjustment** -- Each nav link gets `px-3 py-1.5 relative` so the highlight pill has room to breathe around the text

5. **Mouse event handlers**:
   - `onMouseEnter` on each link sets `hoveredIndex` to that link's index
   - `onMouseLeave` on the links container (not individual links) sets `hoveredIndex` to `null`
   - This prevents flickering when moving between links

6. **No changes needed** to the custom cursor -- the `data-cursor="arrow"` attributes stay, and both systems work independently

### Visual Summary

```text
Before hover:
  [ Masterclasses   The Forge   StarDa   About ]

Hovering "The Forge":
  [ Masterclasses  [The Forge]  StarDa   About ]
                    ^^^^^^^^^^
                    soft pill bg slides here

Moving to "About":
  [ Masterclasses   The Forge   StarDa  [About] ]
                    pill slides -------> ^^^^^^
```

### What Stays the Same

- Pill navbar shape, glassmorphism, and scroll behavior
- Logo, Sign In button, and mobile hamburger
- Custom cursor interactions
- Mobile overlay menu
- All existing transitions and animations

