

# Update BFP Image in LevelUp Live Navbar Dropdown

## Change
Replace the current thumbnail image for "Breakthrough Filmmakers' Program" in the LevelUp Live navbar dropdown with the uploaded image.

## Steps

1. **Copy the uploaded image** to `src/assets/nav-bfp.png`
2. **Update `src/components/navbarData.ts`**:
   - Add a new import: `import navBfp from "@/assets/nav-bfp.png";`
   - Change the first item in the "LevelUp Live" `items` array from `image: liveProgram1` to `image: navBfp`
   - Remove the now-unused `liveProgram1` import if no longer referenced elsewhere

Single file change plus one asset copy. No new dependencies.

