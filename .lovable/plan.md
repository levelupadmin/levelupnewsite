

# Why LevelUp Cards: Fixed-Width Expand with Icons and Auto-Scroll

Upgrade the existing expand/compress interaction to use fixed pixel widths, explicit expand/close icons, auto-scroll behavior, and refined timing.

---

## What Changes

### 1. Fixed pixel widths instead of flex ratios
- Rest state: all cards `width: 380px`
- Expanded: active card `width: 920px`, others stay `380px`
- Container becomes horizontally scrollable with hidden scrollbar

### 2. Timing and easing update
- Transition duration: `700ms` (up from 500ms)
- Easing: `cubic-bezier(0.25, 0.8, 0.25, 1)` (snappier attack, softer settle)
- Content fade-in delay stays at `150ms`

### 3. Expand/Close icon buttons
- Collapsed cards: show a `Maximize2` icon (from lucide-react) in top-right corner
- Expanded card: show an `X` icon in top-right corner instead
- Icons have hover effects (scale + background opacity)
- Only the close button (X) or clicking another card triggers collapse -- clicking general card content does NOT collapse

### 4. Auto-scroll into view
- Add `useRef` on the scroll container
- Add `useRef` array for each card
- On expand, after 100ms delay via `useEffect`, scroll the expanded card into center view with `scrollIntoView({ behavior: 'smooth', inline: 'center' })`

### 5. Click behavior refinement
- Clicking a collapsed card expands it
- Clicking inside an expanded card does nothing (content area stops propagation)
- Only the X close button or clicking a different card collapses

---

## Technical Details

### File: `src/components/WhyLevelUp.tsx`

**State and refs:**
- Keep `expandedIndex` state
- Add `containerRef = useRef<HTMLDivElement>` for the scroll container
- Add `cardRefs = useRef<(HTMLDivElement | null)[]>([])` for individual cards
- Add `useEffect` watching `expandedIndex` to trigger auto-scroll after 100ms

**Layout changes:**
- Replace `flex: flexValue` with explicit `width` values (`380px` / `920px`)
- Add `min-width` matching width to prevent flex shrinking
- Container: add `overflow-x-auto` with CSS to hide scrollbar (`scrollbar-width: none`, `-webkit-scrollbar: display none`)
- Update transition property to `width 700ms cubic-bezier(0.25, 0.8, 0.25, 1), min-height 700ms ...`

**Icon buttons:**
- Import `Maximize2` and `X` from `lucide-react`
- Add absolute-positioned button in top-right of each card
- Default state: `Maximize2` icon, clicking expands the card
- Expanded state: `X` icon, clicking collapses (sets `expandedIndex` to null)
- Both have `onClick` with `e.stopPropagation()` to prevent card-level click handling
- Hover: `hover:scale-110 hover:bg-white/10` with transition

**Click handling:**
- Card outer div: `onClick` only expands (sets index), does NOT toggle
- Expanded content area: `onClick={e => e.stopPropagation()}` to prevent collapse
- Close button: explicitly sets `expandedIndex` to null

**Mobile behavior:**
- On mobile, cards use full width and stack vertically (existing behavior preserved)
- Width values only apply on desktop

### Sub-components unchanged
- `ExpertMembershipCard`, `LiveProjectsCard`, `CommunityCard` stay as-is

