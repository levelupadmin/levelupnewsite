

# Scroll to Live Programs Section on "LevelUp Live" Click

## Problem
Clicking "LevelUp Live" in the navbar navigates to an external URL (`https://www.leveluplearning.live`) instead of scrolling to the live programs section on the homepage.

## Changes

### 1. `src/components/navbarData.ts` (line 87)
Change the `href` for "LevelUp Live" from `"https://www.leveluplearning.live"` to `"#live-programs"`.

### 2. `src/components/Navbar.tsx` (line 14)
Change the mobile nav `href` for "LevelUp Live" from `"https://www.leveluplearning.live"` to `"#live-programs"`.

### 3. `src/components/Footer.tsx` (line 9)
Update the footer link for "LevelUp Live" from the external URL to `"#live-programs"` for consistency.

Three one-line changes. No new dependencies.

