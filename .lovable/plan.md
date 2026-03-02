

## Audit: Phase 1 India Map — Root Cause Analysis

### Critical Bug: Malformed `INDIA_SVG_PATH`

The India outline path in `worldMapData.ts` (line 22) is **broken**. It ends with:

```
...-.96 1.616.217 2.8l595 509.688z
```

The final segment `l595 509.688` is a **relative** line command — it draws a line **595 units right and 509 units down** from the last point, shooting the path completely off the visible map before closing. This produces a wildly distorted shape that does not look like India.

The path was likely meant to just close with `z`, but the starting coordinates (`M595 509.688`) were erroneously appended as a relative `l` command during extraction.

Additionally, the path itself appears to be an incomplete or incorrectly extracted fragment of the real India path (`id="in"`) from `world-map.svg`. The real path in the SVG file has significantly more detail, but the current `INDIA_SVG_PATH` has roughly 30 control points — far fewer than the actual path — meaning it was either truncated or reconstructed poorly.

### Why Cities Don't Align with the World Map

The city coordinates in `indiaMapData.ts` (Delhi at 595,455; Mumbai at 577,484; etc.) are placed within India's real bounding box on the world map (x: 570–633, y: 435–510). These are correct **relative to the world-map SVG coordinate system**.

However, the India outline (`INDIA_SVG_PATH`) doesn't match the actual India shape from the world-map SVG. So while the city dots sit where India actually is on the world map, the outline shape renders somewhere else due to the malformed path — creating a visible misalignment.

### What Needs to Happen

**1. Extract the real India path from `world-map.svg`**
The SVG file contains a path element with `id="in"` that is the actual, detailed India outline in the correct coordinate system. This path `d` attribute needs to be extracted verbatim and used as `INDIA_SVG_PATH`.

Since the SVG is a single-line file (55K+ characters), I cannot read it with standard tools. The extraction approach:
- Create a small helper script that loads the SVG, queries `#in`, and logs the `d` attribute
- Or manually find and copy the path from the SVG source

**2. Fix the path assignment in `worldMapData.ts`**
Replace the current broken `INDIA_SVG_PATH` with the real extracted path. Remove the erroneous `l595 509.688` suffix.

**3. Verify `INDIA_BBOX_WORLD` matches the real path bounds**
After extracting the real path, verify that `INDIA_BBOX_WORLD` (x: 570.23, y: 435.45, w: 63.26, h: 74.24) and `INDIA_CENTER` (cx: 601.86, cy: 472.57) align with the path's actual bounding box. If they were derived from the real SVG path, they should be correct.

**4. Verify city coordinates fall inside the real outline**
With the correct outline, visually confirm that all 18 city dots fall within India's boundaries. Some may need minor adjustments (e.g., Kolkata at x=618 may be slightly outside if the eastern boundary is narrower).

### Files to Change
- **`worldMapData.ts`**: Replace `INDIA_SVG_PATH` with the real path from `world-map.svg` `#in` element
- **`indiaMapData.ts`**: Minor city coordinate tweaks if any fall outside the corrected outline
- No structural changes needed to `IndiaStatesMap.tsx` or `GeoReachScene.tsx` — they consume the data correctly

### Implementation Note
The key blocker is extracting the India path from the single-line SVG file. I will create a temporary extraction approach (inline script or parse the SVG) to get the exact `d` attribute from the `id="in"` path element.

