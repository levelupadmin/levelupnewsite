

# Hero Background — Heavy Grain & Texture Overhaul

## Problem
The current SVG-based `feTurbulence` grain looks flat and synthetic. It doesn't produce the rich, organic film grain seen in the reference. SVG noise filters render differently across browsers and lack the depth of real photographic grain.

## Solution: Multi-layer grain approach
Instead of relying on a single SVG noise filter, stack **3 separate grain/texture layers** with different frequencies, blend modes, and opacities. This creates depth and realism that a single layer cannot achieve.

## Changes (single file: `src/components/HeroSection.tsx`)

### Layer 3a: Coarse grain (REPLACE current grain layer)
- Change `baseFrequency` from `0.55` to `0.45` (coarser, chunkier particles)
- Change opacity from `0.55` to `0.50`
- Change blend mode from `mix-blend-soft-light` to `mix-blend-overlay` (stronger contrast, more visible grain)
- Keep `backgroundSize: 256px`

### Layer 3b: Fine grain (NEW layer — stack on top)
- Second SVG noise with `baseFrequency='0.80'` and `numOctaves='3'` (finer, denser particles)
- Opacity: `0.30`
- Blend mode: `mix-blend-soft-light`
- `backgroundSize: 200px 200px` (different tile size to avoid pattern repetition)
- This fills in between the coarse particles for a rich, organic texture

### Layer 3c: Micro-texture static (NEW layer)
- Third SVG noise with `baseFrequency='1.2'` and `numOctaves='2'` (very fine static)
- Opacity: `0.15`
- Blend mode: `mix-blend-overlay`
- `backgroundSize: 128px 128px` (smallest tile)
- Adds the "film static" quality — barely visible individually but adds density to overall grain

### All other layers remain unchanged
- Grid lines (Layer 1) — keep as-is
- Star dots (Layer 2) — keep as-is
- Primary bloom (Layer 4) — keep as-is
- Warm haze (Layer 5) — keep as-is
- Vignette (Layer 6) — keep as-is

## Technical summary

| Grain Layer | baseFrequency | numOctaves | Opacity | Blend Mode | Tile Size |
|-------------|---------------|------------|---------|------------|-----------|
| 3a: Coarse  | 0.45          | 4          | 50%     | overlay    | 256px     |
| 3b: Fine    | 0.80          | 3          | 30%     | soft-light | 200px     |
| 3c: Static  | 1.2           | 2          | 15%     | overlay    | 128px     |

## Why this will work
- **3 frequencies** create grain at different scales — coarse chunks + fine particles + micro static — just like real film grain
- **Different tile sizes** (256, 200, 128) prevent visible tiling patterns
- **Mixed blend modes** (overlay for punch, soft-light for subtlety) create depth
- The combined effect will be dramatically more textured and premium than a single noise layer

