

## Visual Layout Changes to Forge Section

**File:** `src/components/ForgeSection.tsx`

Two targeted layout adjustments — no wording, color, or functionality changes.

### 1. Feature Points (lines 178-195)
Currently a 3-column grid with `text-left` and `flex gap-4 items-start` (icon beside text horizontally).

**Change to:** Center-aligned columns with icon, title, and description stacked vertically. Each card centers its content with `text-center items-center` instead of `text-left items-start`.

### 2. Stats Row (lines 197-207)
Already a centered horizontal row — just needs minor tweaks: remove the wrapping `div` per stat that could imply boxing, and ensure `justify-between` with a `max-w-xl` constraint for even spacing across the page width. Numbers get `font-bold` added.

### Specific Edits

**Lines 178-195** — Feature points grid:
- Keep `grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-6 md:mt-8`
- Change `text-left` → `text-center`
- Each card: change `flex gap-4 items-start` → `flex flex-col items-center`
- Icon wrapper: remove `mt-1`, keep icon centered above title
- Title and description: centered naturally via parent `text-center`

**Lines 197-207** — Stats row:
- Change `flex justify-center gap-8 md:gap-10` → `flex justify-between max-w-xl mx-auto`
- Add `text-center` to each stat wrapper
- Add `font-bold` to the number `<p>` tag (currently `font-medium`)

No other sections, colors, or copy affected.

