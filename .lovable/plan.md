

# Grainy Animated 3D Star Field for Hero Background

## What it adds

A pure Canvas-based star field behind the hero section that creates a cinematic, deep-space feel with film grain overlay. No heavy 3D libraries -- just a lightweight `<canvas>` element driven by `requestAnimationFrame`.

## How it works

### Star Field (Canvas)
- ~200 stars rendered as small white circles with varying opacity and size
- Each star has x, y, z coordinates; the z-axis drives perspective projection (stars closer to the "camera" appear larger and brighter)
- Stars drift slowly toward the viewer (z decreases each frame), creating a gentle parallax depth effect -- not warp speed, more like floating through space
- When a star passes the camera, it resets to the far plane with new random x/y
- A subtle radial vignette is drawn on top (dark edges, transparent center) to focus attention on the headline

### Film Grain Overlay
- A separate small off-screen canvas generates a static noise texture (random grayscale pixels)
- This texture is tiled over the hero area at low opacity (~4-6%) using CSS `background-image`
- The noise texture regenerates every 3-4 frames to create a subtle flickering grain effect, mimicking 16mm film stock

### Performance
- Single `<canvas>` element, no DOM nodes per star
- Uses `requestAnimationFrame` with cleanup on unmount
- Grain regeneration is throttled (every ~100ms) to avoid unnecessary work
- Canvas resolution is capped at `devicePixelRatio` of 2 to save GPU on high-DPI screens
- The existing gradient overlays (amber glow at top, fade-to-black at bottom) layer on top, so the stars naturally fade out toward the carousel

## Technical Details

### New file: `src/components/StarField.tsx`

A self-contained component that:
1. Creates a full-size `<canvas>` positioned absolutely behind the hero content
2. Initializes ~200 star objects with random 3D positions
3. Runs a render loop: clear canvas, project each star from 3D to 2D, draw as a circle with size/opacity based on z-depth, apply vignette
4. Generates a grain texture on a tiny off-screen canvas (e.g., 128x128) and composites it at low opacity every few frames
5. Handles window resize to keep the canvas full-size
6. Cleans up on unmount (cancels animation frame, releases references)

### Modified file: `src/components/HeroSection.tsx`

- Import and render `<StarField />` as the first child inside the `<section>`, positioned `absolute inset-0` behind everything
- The existing gradient overlays remain on top, ensuring the bottom fade and amber glow still work
- No other changes to the headline, CTA, or carousel

