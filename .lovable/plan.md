

## Plan: Add two-layer mobile hero for Venket Ram

The user uploaded three images:
1. **Ingredients_result_2.png** — the background photo (Venket Ram at desk with camera)
2. **Background_Removed.png** — the name text overlay ("G VENKET RAM")
3. **venket-ram-desktop.png** — reference showing the desired composite result (desktop combined image, but user wants this look on mobile only)

Currently, the Venket Ram mobile hero uses `gvr-hero-bg.png` with no name overlay. The fix is to adopt the same two-layer composite pattern already used by Anthony Gonsalvez on mobile.

### Changes

1. **Copy uploaded assets to `src/assets/`**
   - `user-uploads://Ingredients_result_2.png` → `src/assets/gvr-hero-mobile.png`
   - `user-uploads://Background_Removed.png` → `src/assets/gvr-hero-name.png`

2. **`src/data/masterclassPages.ts`**
   - Import the two new images
   - Add `heroNameOverlay: gvrHeroName` to the Venket Ram entry (the name text overlay)
   - Change `heroBgImage` to use the new mobile background photo (`gvrHeroMobile`) — or add a separate `heroMobileBg` field
   
   Since `heroBgImage` is also used in the desktop fallback path, and the desktop already has `heroDesktopBg` set (or uses `gvr-hero-bg.png`), the simplest approach: check if Venket Ram already has a `heroDesktopBg`. If not, we need to keep desktop working too.

   Looking at the data: Venket Ram does NOT have `heroDesktopBg` set, so desktop falls through to the `heroBgImage` fallback path (lines 194-200). Changing `heroBgImage` would affect desktop too.

   **Better approach**: Add a `heroMobileBg` optional field to the interface. On mobile, prefer `heroMobileBg` over `heroBgImage`. This keeps desktop untouched.

   - Add `heroMobileBg?: string` to interface
   - Set `heroMobileBg: gvrHeroMobile` and `heroNameOverlay: gvrHeroName` on Venket Ram entry

3. **`src/pages/MasterclassDetail.tsx`** (lines 182-188, mobile hero block)
   - Use `data.heroMobileBg ?? data.heroBgImage` as the mobile background image source

   ```tsx
   <div className="absolute inset-0 z-0 md:hidden">
     {data.heroNameOverlay && (
       <img src={data.heroNameOverlay} alt="" className="absolute inset-x-0 top-16 sm:top-24 bottom-0 w-full h-auto object-contain z-0" aria-hidden="true" />
     )}
     <img src={data.heroMobileBg ?? data.heroBgImage} alt="" className="w-full h-full object-cover object-center z-[1]" aria-hidden="true" />
     <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />
   </div>
   ```

This follows the exact same composite pattern as Anthony's mobile hero — name text behind, subject photo in front, gradient overlay on top. No other pages are affected.

