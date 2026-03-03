

## Replace Forge Writing Navbar Thumbnail

**What**: Replace the current `nav-forge-writing.jpg` thumbnail used in the navbar dropdown for "The Forge → Writing Retreat" with the user's uploaded image.

**Steps**:
1. Copy `user-uploads://Screenshot_2026-03-03_at_6.02.18 PM.png` to `src/assets/nav-forge-writing.jpg` (overwriting the existing file)
2. No code changes needed — `navbarData.ts` already imports from `@/assets/nav-forge-writing.jpg`

Single file copy, zero code edits.

