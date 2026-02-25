

# Navigate to Specific Program from Navbar Dropdown

## Problem
Clicking "Breakthrough Filmmakers' Program" in the LevelUp Live navbar dropdown currently links to an external URL. It should scroll to the Live + Mentor-Led section and auto-select the BFP tab.

## Approach
Use URL hash fragments (e.g. `#live-bfp`) to deep-link to specific programs. The LiveProgramsSection will read the hash on mount and select the matching tab.

## Changes

### 1. `src/components/navbarData.ts`
Update the `href` for each LevelUp Live dropdown item to use internal hash links instead of external URLs:
- "Breakthrough Filmmakers' Program" → `#live-bfp`
- "Video Editing Academy" → `#live-ve`
- "UI/UX Design Academy" → `#live-uiux`
- "Screenwriting Workshop" → `#live-sw`

### 2. `src/components/LiveProgramsSection.tsx`
Add a `useEffect` that:
1. Reads `window.location.hash` on mount and on `hashchange` events
2. Maps hashes like `#live-bfp` to the corresponding program index using the `id` field from `showcasePrograms`
3. Sets `activeShowcase` to that index
4. Scrolls the section into view smoothly

### 3. `src/components/Navbar.tsx`
No structural changes needed — the existing link rendering already handles internal `#` hrefs correctly (no `target="_blank"`).

## Technical Detail
The hash-to-index mapping uses the existing `id` field in `showcasePrograms` data (e.g. `"bfp"`, `"ve"`). The hash format is `#live-{id}`. On hash match, the component calls `sectionRef.current.scrollIntoView({ behavior: 'smooth' })` and updates the active tab state.

Three files touched, no new dependencies.

