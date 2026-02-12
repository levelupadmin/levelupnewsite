

## Fix Navbar Hover Animation Glitch

### Problem
The navbar has two animation systems fighting over the same element:
1. **CSS transitions** (`transition-colors transition-shadow duration-500`) on the `motion.nav` container
2. **Framer Motion** `animate` prop controlling `borderRadius` on the same element

When hovering between nav items, these systems conflict and cause visual stuttering. The `layoutId="nav-accent-dot"` indicator also triggers costly layout recalculations during panel transitions.

### Solution

#### 1. Remove CSS transition conflicts on `motion.nav` (Navbar.tsx ~line 106-113)
- Remove `transition-colors transition-shadow duration-500 ease-out` from the `motion.nav` className
- Move `backgroundColor`, `borderColor`, and `boxShadow` into Framer Motion's `animate` prop so a single system controls all animated properties
- This eliminates the dual-animation conflict

#### 2. Stabilize the accent dot indicator (Navbar.tsx ~line 160-175)
- Remove `layoutId="nav-accent-dot"` to prevent layout thrashing during hover transitions
- Use a simpler opacity/scale animation without layout projection
- This prevents the dot from triggering expensive layout recalculations while the dropdown panel is also animating

#### 3. Add `will-change` hint for the dropdown panel (Navbar.tsx ~line 213)
- Add `will-change: height, opacity` to the expandable panel's motion div to hint the browser to optimize compositing for that element

### Files Changed
- `src/components/Navbar.tsx` -- all 3 fixes in one file

