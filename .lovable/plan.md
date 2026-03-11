

## Redesign "Watch on Any Device" Section

### What Changes

Replace the current grid-of-cards layout in section 9 ("Watch on Any Device") with the layout from the reference screenshot:

1. **Central device mockup image** — the uploaded `devices_final-1-p-1080.png` placed center, showing laptop + tablet + phone
2. **Concentric rings background** — subtle grey concentric circles radiating from center behind the devices
3. **4 corner feature labels** — "Watch on any Device" (top-left), "Get Certified" (top-right), "Pay Once, Play Forever" (bottom-left), "Learn at your own Pace" (bottom-right), each with a small icon above the text
4. **App store buttons** — Google Play and App Store badge images centered below the device mockup
5. **CTA button** — "BUY NOW AT ₹2499" orange gradient button at the bottom

### Technical Approach

**File: `src/assets/devices-showcase.png`** — Copy the uploaded device mockup image here.

**File: `src/pages/MasterclassDetail.tsx`** — Replace lines 430–455 (section 9) with:

- A `relative` container with `overflow-hidden`
- CSS concentric rings using multiple `rounded-full border border-white/5` divs absolutely positioned and centered (4–5 rings of increasing size)
- The device image centered via `mx-auto` with `relative z-10`
- 4 feature labels positioned in corners using a grid or absolute positioning, each with a small Lucide icon (`Monitor`, `Infinity`, `Award`, `Clock`) styled in amber/orange
- Two inline app store badge links (Google Play + App Store) as styled divs or SVG badges centered below the image
- The existing `CTAButton` below

### Files Modified
- `src/assets/devices-showcase.png` (new — copied from upload)
- `src/pages/MasterclassDetail.tsx` (section 9 rewrite, ~40 lines)

