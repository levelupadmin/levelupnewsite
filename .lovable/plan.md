

## Replace live-bfp.png with New Image

**What will change:**
- Save the uploaded image as `src/assets/live-bfp.jpg` (replacing the current `live-bfp.png`)
- Update the import in `src/data/programs.ts` to point to the new `.jpg` file

**Steps:**
1. Copy `user-uploads://image_1.jpg` to `src/assets/live-bfp.jpg`
2. Update the import path in `src/data/programs.ts` from `live-bfp.png` to `live-bfp.jpg`

No other files need changes since all references go through the `programs.ts` data file.

