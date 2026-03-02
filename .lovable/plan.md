

## Bug: 58K Counter Disappears After Shimmer Animation

**Root cause:** The `.text-shimmer` class in `index.css` sets `-webkit-text-fill-color: transparent` and uses `background-clip: text` to render a gradient through the text. The shimmer animation runs once (no `infinite` or `forwards` fill), and the `@keyframes` ends at `background-position: 200% center`. After the animation completes, the gradient may shift to a position where the visible gradient bands are off-screen, leaving the text fully transparent.

**Fix (2 changes):**

1. **`src/index.css`** — Add `animation-fill-mode: forwards` isn't enough since the end state is `200%`. Instead, change the animation to end at `0% center` (back to start) OR keep the shimmer but ensure the resting state shows visible text. The cleanest fix: after the shimmer plays once, revert to solid `currentColor` text. This means the shimmer should be a one-shot overlay effect rather than permanently replacing the text fill.

   Concrete approach: Change the `.text-shimmer` animation to use `forwards` fill mode and adjust the keyframes so the end state (`100%`) has `background-position: 0% center` (where the text is fully visible), or simply remove `-webkit-text-fill-color: transparent` from the class and instead apply it only during the animation via keyframes.

2. **Alternative simpler fix:** Just add `animation-fill-mode: forwards` and change the keyframe `100%` from `200%` to `0%` so the text rests at a visible gradient position.

**Recommended implementation:**
- Change `@keyframes text-shimmer` so `100%` is `background-position: 0% center` (same as start, so text is visible)
- Keep the sweep effect by going `0% → 200% → 0%` or simply `0% → 100%` with adjusted sizing
- The shimmer sweeps across once and the text remains visible at its resting position

