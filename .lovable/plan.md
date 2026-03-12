

## Zoom Out Pricing Section Image

### Change

In `src/pages/MasterclassDetail.tsx` line 545, change the image's `object-cover` to include `scale-90` (or similar) so the image is slightly zoomed out, fitting the name/head fully within the frame without changing the container size or margins.

**Line 545**: Change `className="w-full h-full object-cover"` → `className="w-full h-full object-cover scale-[0.85] object-top"`

This scales the image down ~15% within its container so the top of the head/name is fully visible, while `object-top` anchors it to show the top portion.

### Files Modified
- `src/pages/MasterclassDetail.tsx` (line 545 only)

