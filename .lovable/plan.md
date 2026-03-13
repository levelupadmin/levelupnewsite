

## Why the masterclass pages load slowly

The root cause is that **all assets for all masterclasses are eagerly imported** in both `MasterclassDetail.tsx` and `masterclassPages.ts`, regardless of which masterclass the user is viewing.

When a user visits `/masterclass/anthony-gonsalvez`, the browser must download:
- **30 imports** in `masterclassPages.ts` — hero images, certificates, portfolio posters, and testimonial photos for Anthony, Venket Ram, AND Kiran
- **26+ imports** in `MasterclassDetail.tsx` — portfolio images for both GVR and Anthony, audience icons, device showcase, testimonials, and "other masterclass" thumbnails

All of these are **PNG files imported via Vite's static asset pipeline**, meaning they're bundled into the JS chunk or resolved as URLs that the browser immediately starts fetching. Every masterclass page pays the cost of loading every other masterclass's assets.

### Plan: Lazy-load assets per masterclass

**1. Split `masterclassPages.ts` into per-slug data files**

Create separate files that each export only the data + imports for one masterclass:
- `src/data/masterclass/g-venket-ram.ts`
- `src/data/masterclass/anthony-gonsalvez.ts`
- `src/data/masterclass/drk-kiran.ts`

Each file imports only its own assets. The shared interface stays in `masterclassPages.ts`.

Update `masterclassPages.ts` to use lazy dynamic imports:
```ts
export async function getMasterclassData(slug: string): Promise<MasterclassPageData | undefined> {
  try {
    const module = await import(`./masterclass/${slug}.ts`);
    return module.default;
  } catch { return undefined; }
}
```

**2. Refactor `MasterclassDetail.tsx` to load data asynchronously**

- Move portfolio images and audience icons into the per-slug data files (or co-located modules) so they're only imported when that slug is loaded
- Use a `useEffect` or React Query to call `getMasterclassData(slug)` and show a lightweight skeleton/spinner while loading
- Move the "other masterclasses" thumbnails to a separate lazy-loaded component (they appear below the fold)

**3. Move large PNGs to `/public/` for non-bundled serving**

Hero images and portfolio posters are large (often 500KB–2MB PNGs). Moving them to `/public/images/masterclass/` and referencing them as string URLs (instead of Vite imports) prevents them from inflating the JS bundle and allows the browser to load them on-demand with standard `<img>` lazy loading.

### Expected impact

- Each masterclass page loads only its own ~8-12 images instead of ~50+ for all masterclasses combined
- JS chunk size for the MasterclassDetail route drops significantly
- First Contentful Paint improves because the browser isn't blocked downloading unused assets

