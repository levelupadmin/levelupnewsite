

# Why LevelUp Cards: Flip-to-Expand Interaction Redesign

Replace the current 3D flip animation with a horizontal expand/compress interaction where the clicked card grows to ~65% width while the others shrink to ~17.5% each.

---

## Interaction Design

**Rest state**: Three equal-width cards (33.33% each), showing title + illustration

**Expanded state**:
- Active card: ~65% width -- shows title, illustration (left side), expanded description, bullet points, and stat (right side)
- Inactive cards: ~17.5% width -- show only the title rotated vertically, with a subtle amber accent line

**Transitions**:
- Width change: 400ms ease-in-out
- Expanded content fade-in: 150ms delay after width starts
- Only one card expandable at a time
- Clicking expanded card collapses back to rest state

**Mobile**: Cards stack vertically; the expanded card grows taller instead of wider, inactive cards show condensed single-line view

---

## Technical Details

### File: `src/components/WhyLevelUp.tsx`

**Changes:**
1. Replace `grid grid-cols-3` with a `flex` row layout to allow dynamic width control
2. Replace `flippedIndex` state with `expandedIndex`
3. Remove all 3D flip logic (perspective, rotateY, backfaceVisibility, preserve-3d)
4. Each card gets dynamic width via inline style:
   - No card expanded: `flex: 1` (equal)
   - Card expanded: active gets `flex: 3.7`, inactive get `flex: 1`
   - `transition: flex 400ms ease-in-out` on each card
5. Card internal layout changes based on expanded state:
   - **Collapsed (default)**: Title + illustration stacked vertically (same as current front)
   - **Expanded**: Two-column layout -- illustration on left (~40%), text content on right (~60%) with description, bullets, stat
   - **Compressed (inactive when another is expanded)**: Title displayed vertically using `writing-mode: vertical-rl` with a small amber accent bar
6. Expanded content uses `opacity` + `transition-delay: 150ms` for the fade-in effect
7. Mobile: Switch to `flex-col`, expanded card gets more height, compressed cards show horizontal condensed view (title only, single line)

### Sub-components unchanged
- `ExpertMembershipCard`, `LiveProjectsCard`, `CommunityCard` remain as-is -- they render inside the illustration area of each card

### Styling maintained
- Dark gradient background on cards: `linear-gradient(160deg, hsl(30 40% 12%) 0%, hsl(0 0% 4%) 50%, hsl(0 0% 2%) 100%)`
- Orange accent borders: `border-primary/20`, `border-primary/40` on active
- Rounded corners: `rounded-2xl`
- Soft glow shadow on expanded card: `shadow-[0_0_30px_4px_hsl(30_80%_45%/0.25)]`
- Compressed cards get a subtle `border-primary/10` treatment

