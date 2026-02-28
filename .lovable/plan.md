

## Replace Anthony Gonsalvez Poster in On-demand Masterclasses Section Only

Same approach as Karthik Subbaraj — create a separate asset so the navbar thumbnail stays unchanged.

### Steps

1. **Copy uploaded image** to `src/assets/anthony-gonsalvez-masterclass.png`
2. **Update `src/components/MasterclassSection.tsx`** — change the Anthony import from `anthony-gonsalvez.png` to `anthony-gonsalvez-masterclass.png` (line 9 import only). No other changes.

