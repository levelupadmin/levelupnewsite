

# Replace Brand Logos with High-Quality, Full-Color Versions

## What We're Doing

Replacing all 12 brand logos in the "Our Students Come From" section with high-quality, full-color, properly scaled PNG images. The current logos appear to be low-resolution or improperly formatted.

## Brands to Update (all 12)

1. FTII (Film and Television Institute of India)
2. NID (National Institute of Design)
3. Whistling Woods International
4. YRF (Yash Raj Films)
5. Excel Entertainment
6. TVF (The Viral Fever)
7. Google
8. Amazon Prime Video
9. Viacom18
10. Dharma Productions
11. Red Chillies Entertainment
12. Adobe

## Technical Changes

### 1. Source and download high-quality colored logos
- For each brand, source a clean, full-color PNG logo from official or high-quality web sources
- Save them to `src/assets/logos/` replacing the existing files
- Target resolution: at least 400px wide for crisp rendering at all responsive sizes

### 2. Update `StudentLogosSection.tsx` styling
- Remove `opacity-90` class so logos display at full color intensity
- Increase responsive sizing from `h-8 md:h-10 lg:h-12` to `h-10 md:h-14 lg:h-16` for fuller display
- Keep `object-contain` and `w-auto` for proper aspect ratio scaling

### 3. Files affected
- `src/assets/logos/ftii.png` (replaced)
- `src/assets/logos/nid.png` (replaced)
- `src/assets/logos/whistling-woods.png` (replaced)
- `src/assets/logos/yrf.png` (replaced)
- `src/assets/logos/excel-entertainment.png` (replaced)
- `src/assets/logos/tvf.png` (replaced)
- `src/assets/logos/google.png` (replaced)
- `src/assets/logos/amazon-prime.png` (replaced)
- `src/assets/logos/viacom18.png` (replaced)
- `src/assets/logos/dharma.png` (replaced)
- `src/assets/logos/red-chillies.png` (replaced)
- `src/assets/logos/adobe.png` (replaced)
- `src/components/StudentLogosSection.tsx` (styling update)

