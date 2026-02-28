

## Replace Karthik Subbaraj Poster in On-demand Masterclasses Section Only

The navbar and masterclass section currently share the same image (`karthik-subbaraj.png`). To change only the masterclass section, we need a separate asset.

### Steps

1. **Copy uploaded image** to `src/assets/karthik-subbaraj-masterclass.png`
2. **Update `src/components/MasterclassSection.tsx`** — change the Karthik Subbaraj import from `karthik-subbaraj.png` to `karthik-subbaraj-masterclass.png` (line 8 import only). No other changes.

This ensures the navbar keeps the current thumbnail while the masterclass grid uses the new poster.

