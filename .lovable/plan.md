## Plan: Align Tool Icons to Match Reference Layout

### What's changing

The "Tools You'll Learn" circular layout needs adjustments to match the reference image. The structure (center + inner ring + outer ring) is correct, but the positioning, order, and a label need updating.

### Changes

&nbsp;

**2. Reorder outer ring tools** (`src/data/liveVEData.ts`)

- Reorder the `veToolIcons` array so the outer ring renders in the correct clockwise order matching the reference: ChatGPT (top) → Photoshop (upper-right) → Boards (right) → Illustrator (lower-right) → Canva (lower-left) → Premiere Pro (left) → After Effects (upper-left)

**3. Adjust inner ring positioning** (`src/components/live-ve/VEPortfolio.tsx`)

- Tweak the inner ring angle offset so Envato Elements sits upper-left, Midjourney sits right, and Nuendo sits bottom — matching the reference triangle layout

**4. Ensure consistent icon sizing and padding**

- Center icon (DaVinci): keep larger size, ensure `object-cover` fills container
- Inner ring icons: remove padding, use `object-cover` consistently
- Outer ring icons: already using `object-cover`, keep as-is