

## Fix: Remove Gap Between Title and Illustration in Expanded Left Column

The `mb-4` on the `h3` (line 197) and the `flex-1` + `items-center justify-center` on the illustration wrapper (line 200) create vertical space between the title and the illustration. The `flex-1` makes the illustration wrapper expand to fill all available space, centering the illustration in the middle — leaving a visible gap below the title.

### Change in `src/components/WhyLevelUp.tsx`

1. **Remove `mb-4`** from the expanded `h3` (line 197) → change to `mb-2` for minimal breathing room
2. **Remove `flex-1` and `items-center justify-center`** from the illustration wrapper (line 200) → change to `flex items-start min-h-0 pb-4 overflow-hidden` so the illustration sits directly below the title without centering in extra space

| File | Change |
|------|--------|
| `src/components/WhyLevelUp.tsx` | Remove vertical centering from illustration wrapper, reduce title margin |

