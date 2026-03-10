

## Analysis: Logo Marquee Scroll Direction

### What I Found

After thorough code inspection:

1. **`StudentLogosSection.tsx` (lines 98-102)** — The row configuration already specifies alternating directions:
   - Row 1: `animate-scroll-left`
   - Row 2: `animate-scroll-right`
   - Row 3: `animate-scroll-left`

2. **`src/index.css` (lines 765-791)** — The CSS keyframes and utility classes are correctly defined:
   - `scroll-left`: `translateX(0)` → `translateX(-50%)` (scrolls left)
   - `scroll-right`: `translateX(-50%)` → `translateX(0)` (scrolls right)

### The Problem

Despite the code being correct, all rows may visually scroll left. This could be caused by:

- **Tailwind CSS purging** the `animate-scroll-right` class since it's applied dynamically via a variable (`${row.direction}`), and Tailwind's JIT compiler may not detect it
- The `@layer utilities` wrapper could cause specificity issues where the class is defined but not generated

### Fix Plan

1. **Ensure Tailwind recognizes the dynamic class** by adding a safelist or using the classes directly instead of via string interpolation. Specifically, refactor the marquee track rendering to explicitly apply each row's animation class in a way Tailwind's scanner can detect.

2. **Alternative approach**: Instead of relying on Tailwind utility detection, apply the animation directly via inline `style` on the marquee track div, e.g., `style={{ animation: 'scroll-right 40s linear infinite' }}` for row 2. This bypasses any class purging issues entirely.

### Implementation

- In `StudentLogosSection.tsx`, update the marquee track div to use inline `style` for the animation property instead of the dynamic class name, or add both class names explicitly in the file so Tailwind's scanner picks them up (e.g., a comment like `// animate-scroll-left animate-scroll-right`).
- Since these classes are defined in plain CSS (`@layer utilities`), the simpler fix is to move them outside `@layer utilities` so they aren't subject to Tailwind's purging behavior, or keep the current approach but ensure the classes are referenced statically somewhere.

