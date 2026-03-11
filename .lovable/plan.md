

## Apply Style Guide & Replace Certificate Image

### Changes

**1. Copy certificate image to project**
- Copy `user-uploads://GVR-certificate-p-800.png` → `src/assets/gvr-certificate.png`

**2. Replace certificate section (Section 6) in `MasterclassDetail.tsx`**
- Remove the text-based certificate mockup (lines 310-320)
- Replace with the actual certificate image: `<img src={certificateImg} />`
- Import the certificate image at the top of the file

**3. Typography alignment from style guide**
The Webflow style guide uses these fonts: **Bebas Neue** (display headings), **Sora** (body), **Forum** (serif accents). The project already uses Sora as the primary font. Key adjustment:
- Add **Bebas Neue** as a display heading font for large section headers (like "Photography", the hero discipline heading) — this matches the original Webflow site's bold, condensed headings
- Add the font import to `index.html` and extend `tailwind.config.ts` with a `font-display` family
- Update hero `h1` and major section headings to use `font-display` (Bebas Neue) instead of `font-serif-display` (Sora)

### Files Modified
- `src/assets/gvr-certificate.png` — new asset (copied from upload)
- `src/pages/MasterclassDetail.tsx` — certificate section + heading font classes
- `tailwind.config.ts` — add Bebas Neue font family
- `index.html` — add Google Fonts import for Bebas Neue

