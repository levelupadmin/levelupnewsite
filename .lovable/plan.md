

# Replace Bullet Icon with Custom Anvil+Hammer SVG

## What Changes
Replace the `PlusCircle` icon in the Forge section's three feature bullet points with a custom inline SVG component that exactly matches the uploaded anvil-and-hammer icon, rendered in the site's primary orange color.

## Technical Steps

### `src/components/ForgeSection.tsx`

**1. Update import (line 1)**
- Remove `PlusCircle` from the lucide-react import:
  - Before: `import { PlusCircle, ArrowRight } from "lucide-react";`
  - After: `import { ArrowRight } from "lucide-react";`

**2. Add custom AnvilHammerIcon component (after imports, before `featurePoints`)**
- Define a small inline SVG component that draws:
  - An anvil base (flat-topped trapezoid shape)
  - A hammer at an angle above the anvil
  - Small spark/impact lines at the strike point
- Uses `currentColor` so it inherits the orange color from `text-primary`

**3. Replace icon usage (lines 172-174)**
- Swap:
  ```
  <PlusCircle className="w-5 h-5 text-primary" strokeWidth={1.5} />
  ```
- With:
  ```
  <AnvilHammerIcon className="w-5 h-5 text-primary" />
  ```

No other files need changes. The icon picks up the site's orange theme automatically via `text-primary`.

