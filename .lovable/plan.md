

## Smooth "are made" position transition

The problem: when the rotating word changes width (e.g. "editors" → "storytellers"), "are made" jumps abruptly to its new position. We need it to glide smoothly.

### Approach: Use `m.span` with `layout` animation

Framer Motion's `layout` prop automatically animates position/size changes. By wrapping "are made" in a `m.em` with `layout`, it will smoothly slide to its new x-position whenever the rotating word's width changes.

### Steps

1. **Update `src/components/HeroSection.tsx`**:
   - Wrap the parent `<span>` (containing rotating word + "are made") in `<m.span>` with `layout` enabled via `LayoutGroup`
   - Change `<em>` to `<m.em layout>` so Framer Motion animates its position when the sibling word width changes
   - Add a `layout` prop to the rotating word container as well
   - Use a smooth spring transition (`type: "spring", stiffness: 300, damping: 30`) for the layout animation to feel fluid rather than mechanical
   - Import `LayoutGroup` from framer-motion

The key change is adding `layout` to both the word container and the "are made" element, so when one resizes, the other repositions with a spring animation.

