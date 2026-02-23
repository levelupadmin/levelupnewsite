

## Replace Nelson Dilipkumar Image

### What
Replace the current `nelson-dilipkumar.png` (likely a large PNG) with the uploaded smaller JPG version across all usages.

### Steps

1. **Copy the uploaded image** to `src/assets/nelson-dilipkumar.jpg`
2. **Update imports** in the two files that reference it:
   - `src/components/MasterclassSection.tsx` — change import from `nelson-dilipkumar.png` to `nelson-dilipkumar.jpg`
   - `src/components/navbarData.ts` — change import from `nelson-dilipkumar.png` to `nelson-dilipkumar.jpg`

No visual or behavioral changes — same image, smaller file size, different format.

