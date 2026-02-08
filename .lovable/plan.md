

# Lazy-Load Navbar Dropdown Images

## Current Behavior

The `Navbar.tsx` component statically imports 9 local images at the top of the file (lines 7-18: `masterclass-3.jpg`, `masterclass-4.jpg`, `masterclass-5.jpg`, `liveProgram1-3.jpg`, `forge1-3.jpg`). Even though the dropdown panels are conditionally rendered (only when hovered/tapped), these static imports mean:

- The image URL references are bundled into the main Navbar JavaScript chunk
- The browser may prefetch these assets via Vite's `modulepreload` hints
- The Navbar module is heavier than it needs to be on first load

The Masterclasses category uses CDN URLs (not local images), so those are already fine.

---

## Approach

Extract the navigation data and its image imports into a **separate file** that is **dynamically imported** on first interaction. This code-splits the image references out of the critical Navbar bundle entirely.

---

## Step 1: Create a new `navbarData.ts` file

Move the entire `navLinks` array (lines 34-159) and all 9 local image imports (lines 7-18) into a new file at `src/components/navbarData.ts`. Export the `navLinks` array, the `NavItem` and `NavLink` interfaces.

---

## Step 2: Update `Navbar.tsx` to dynamically import

- Remove the 9 image `import` statements and the `navLinks` constant from `Navbar.tsx`
- Keep the `NavItem` and `NavLink` interfaces (or import them from the new file)
- Add a `useState` for the loaded nav data and a `useRef` to track if loading has started
- On **first hover** (desktop) or **first menu open** (mobile), trigger `import('./navbarData')` to load the data
- While loading (brief moment, typically under 50ms since it's a local chunk), show the nav link labels without dropdown content
- Once loaded, store the data in state and render dropdowns as before

The flow looks like this:

```text
Page loads --> Navbar renders with link labels only (no image data loaded)
User hovers a category --> dynamic import fires --> navbarData chunk loads (~1 frame)
Data arrives --> state updates --> dropdown renders with images
Subsequent hovers --> data already in state, instant
```

---

## Step 3: Preload on pointer proximity (optional enhancement)

To eliminate any perceived delay, add an `onPointerEnter` handler on the entire nav bar area (not individual links) that triggers the dynamic import. This way, the chunk starts loading as soon as the cursor approaches the nav, well before the user actually hovers a specific category.

---

## Technical Details

### Files to Create
- `src/components/navbarData.ts` -- Contains all 9 image imports + the `navLinks` array + type exports

### Files to Modify
- `src/components/Navbar.tsx` -- Remove static image imports and `navLinks` constant; add dynamic import with state management

### What Gets Code-Split
The 9 local image imports (`liveProgram1-3`, `forge1-3`, `masterclass3-5`) and the `navLinks` data array move into their own chunk. The Navbar's initial JS bundle shrinks by the size of those resolved image URLs and the data structure.

### No Visual Changes
The dropdown behavior, animations, and layout remain identical. The only difference is a sub-frame delay on the very first hover interaction while the data chunk loads.

