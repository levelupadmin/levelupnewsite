

# Swap Stats Row and Feature Points

## What Changes
Swap the order of two blocks in the Forge section so that the feature points ("Pressure that transforms", "Mentorship without filters", "Offline. Immersive. Real.") appear **before** the stats row (7 Cities, 11 Editions, 248 Shortfilms).

## Technical Steps

### `src/components/ForgeSection.tsx`

**Move the Feature Points block (lines 190-207) above the Stats row block (lines 178-188)**

The current order is:
1. Stats row (lines 178-188)
2. Feature points grid (lines 190-207)

The new order will be:
1. Feature points grid
2. Stats row

No other changes needed -- just a positional swap of these two blocks within the same parent container.

