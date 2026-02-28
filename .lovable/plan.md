

## Replace Venket Ram Thumbnail in Navbar Only

The navbar (`navbarData.ts`) and masterclass section (`MasterclassSection.tsx`) both share `venket-ram.png`. To change only the navbar, save the new image as a separate navbar-specific asset.

### Steps

1. **Copy uploaded image** to `src/assets/nav-venket-ram.png`
2. **Update `src/components/navbarData.ts`** — change the Venket Ram import from `venket-ram.png` to `nav-venket-ram.png`. No other changes.

