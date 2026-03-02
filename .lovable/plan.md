

## Audit: GeoReach Animation Issues

### Problems Found

**1. India states overlay is positioned over China/Central Asia, not India**
The state paths are rendered at `translate(540, 388) scale(0.52)` which places them over Central/East Asia on the world map. Looking at the world SVG (`viewBox: 30.767 241.591 784.077 458.627`), India's actual geographic center is approximately at SVG coordinates ~580, 450. The current `INDIA_WORLD_TX=540, INDIA_WORLD_TY=388` is significantly off — about 25-40 units too far left and 30-50 units too high.

**Root fix**: Recalibrate `INDIA_WORLD_TX`, `INDIA_WORLD_TY`, and `INDIA_WORLD_SCALE` in `worldMapData.ts`. India's bounding box on the actual world-map.svg (path `#in`) needs to be matched by our custom state paths. Estimated correct values: `TX ≈ 560`, `TY ≈ 420`, `SCALE ≈ 0.42`.

**2. Phase 1 zoom viewBox doesn't center on India**
`INDIA_ZOOM_VIEWBOX.desktop = "505 370 130 130"` — this viewBox crops into a region that's positioned based on the wrong India location. Once we fix the position, this must also shift to match.

**3. `INDIA_CENTER` for arcs is derived from the wrong position**
Since `INDIA_CENTER` is computed from `INDIA_WORLD_TX + 49 * INDIA_WORLD_SCALE`, the arcs emanate from the wrong point (Central Asia), not from India. This auto-fixes once TX/TY/SCALE are corrected.

**4. India outline path is too simplified to be recognizable**
The current `INDIA_OUTLINE_PATH` and state paths use crude polygons (6-8 points each) that don't look like India at all — they look like abstract shapes. The eastern coastline, southern peninsula, and Gujarat/Kathiawar peninsula are not recognizable. This is why Phase 1 shows "glowing fragments" rather than India.

**Root fix**: Replace state paths with more detailed SVG paths (~20-30 points each for key states) and a more accurate national outline. Focus on making the peninsula, Sri Lanka gap, Gujarat coast, and eastern coast recognizable.

**5. No smooth viewBox transition between phases**
`viewBox` changes are instant (state swap). The jump from zoomed-India to world-view is jarring. SVG `viewBox` doesn't CSS-transition natively.

**Root fix**: Animate viewBox values using `requestAnimationFrame` interpolation (lerp between zoomed and world viewBox over ~1.5s) instead of instant state swap.

**6. Heartbeat/glow center at ~(565, 422) is in the wrong spot**
The large glow circle (`r=40`) appears over China, not India. Same root cause as #1.

### Remediation Plan

**File: `src/components/impact/worldMapData.ts`**
- Recalibrate `INDIA_WORLD_TX ≈ 558`, `INDIA_WORLD_TY ≈ 418`, `INDIA_WORLD_SCALE ≈ 0.44` to align state paths precisely over India on the world map
- Update `INDIA_ZOOM_VIEWBOX` to center on the corrected India position
- All derived values (`INDIA_CENTER`) auto-correct

**File: `src/components/impact/indiaMapData.ts`**
- Replace the simplified state paths with more geographically accurate paths (more waypoints for coastline, peninsula shape, Gujarat, northeast)
- Improve `INDIA_OUTLINE_PATH` to be immediately recognizable as India
- Adjust city coordinates to match the new, more accurate state geometry

**File: `src/components/impact/GeoReachScene.tsx`**
- Add animated viewBox interpolation using `requestAnimationFrame` for smooth Phase 1→4 transition instead of instant swap
- This makes the "camera zoom out" feel cinematic rather than jarring

**File: `src/components/impact/IndiaStatesMap.tsx`**
- No structural changes needed — it reads from the data files which we're fixing

### Priority Order
1. Fix position calibration (worldMapData.ts) — makes India land on India
2. Improve state/outline paths (indiaMapData.ts) — makes India look like India
3. Add viewBox animation (GeoReachScene.tsx) — makes transition smooth

