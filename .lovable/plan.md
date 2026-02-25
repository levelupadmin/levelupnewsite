

## Replace Video Editing Academy Navbar Thumbnail

### Changes

1. **Copy the uploaded image** to `src/assets/nav-ve-new.png`

2. **Update `src/components/navbarData.ts`** — Change the import for the Video Editing Academy thumbnail:
   - Replace `import navVe from "@/assets/nav-ve.png"` with `import navVe from "@/assets/nav-ve-new.png"` (or simply overwrite `nav-ve.png` with the new file)

Since the existing import variable `navVe` is already used in the correct place (the Video Editing Academy item in the LevelUp Live dropdown), only the asset file needs to change. The simplest approach is to copy the uploaded image directly to `src/assets/nav-ve.png`, overwriting the old one — zero code changes needed.

### File Operations
- **Copy**: `user-uploads://image-81.png` → `src/assets/nav-ve.png` (overwrite existing)

No code changes required — the existing import already references this path.

