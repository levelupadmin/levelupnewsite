

# Update BFP Navbar Thumbnail

## Change
Copy the uploaded `BFP_Hover.png` to `src/assets/nav-bfp.png` and update the import in `navbarData.ts` to use it (the import already points to the right path from the previous edit, but the actual asset file needs to be the new uploaded image).

## Steps
1. Copy `user-uploads://BFP_Hover.png` to `src/assets/nav-bfp.png`
2. Update `src/components/navbarData.ts` to import from `nav-bfp.png` (already imports `live-bfp.png`, needs to change to `nav-bfp.png`)

Single asset copy + one line import change.

