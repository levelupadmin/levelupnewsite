

## Make WhyLevelUp Expanded Cards Consistent

Two inconsistencies to fix:

### 1. Grid column ratio (line 194)
Card 1 (Portfolio-Driven Learning) uses `grid-cols-2` while cards 0 and 2 use `grid-cols-[2fr_3fr]`. Change to use the same ratio for all three cards: `grid-cols-[2fr_3fr]`.

**Note:** The memory says card 1 uses `grid-cols-2` "to prevent text clipping." This may reintroduce clipping — but uniformity is what you asked for. If text clips, we can adjust the right column content instead.

### 2. Remove microLine from card 1 (lines 203-207)
Only card 1 has a `microLine` property. Remove it from the features data (line 42) and remove the rendering code (lines 203-207) to make all cards structurally identical.

### Changes

| File | Line | Change |
|------|------|--------|
| `src/components/WhyLevelUp.tsx` | 42 | Remove `microLine` property from card 1 data |
| `src/components/WhyLevelUp.tsx` | 194 | Remove conditional `index === 1 ? "grid-cols-2" :` — use `grid-cols-[2fr_3fr]` for all |
| `src/components/WhyLevelUp.tsx` | 203-207 | Remove microLine rendering block |

