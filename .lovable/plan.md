

# Why LevelUp Cards: Height Increase + Layout Restructure

## Changes

### 1. Increase card height by 20%
- Desktop `minHeight`: 440px --> 528px
- Mobile collapsed: 360px --> 432px
- Mobile expanded: 420px --> 504px

### 2. Restructure expanded card layout
Currently the expanded state has a top bar (title + description) then a 3-column grid below. Restructure to a **2-column split**:

- **Left column (~40%)**: Title at top, illustration centered below, stat at bottom
- **Right column (~60%)**: Description paragraph at top, bullet list below with more vertical spacing

This gives the content more breathing room with the taller cards and creates a cleaner visual hierarchy.

### 3. Default/compressed state layout
With more height available, add the short description text below the title (currently only shows title + illustration). Layout becomes:
- Title at top
- Short description below title
- Illustration fills remaining space

---

## Technical Details

### File: `src/components/WhyLevelUp.tsx`

**Height values (line 128-130):**
- Desktop: `minHeight: 528` (was 440)
- Mobile collapsed: `432` (was 360)
- Mobile expanded: `504` (was 420)

**Default/compressed layer (lines 154-169):**
- Add `feature.description` as a `<p>` between the title and illustration
- Style: `text-sm text-muted-foreground leading-relaxed mb-4`

**Expanded state layout (lines 182-226):**
- Replace top-bar + 3-column-grid with a 2-column layout (`grid grid-cols-[2fr_3fr]`)
- Left column: title, illustration (centered), stat at bottom
- Right column: expanded description, bullets with more spacing (`space-y-3.5`)
- On mobile: stack vertically as before

