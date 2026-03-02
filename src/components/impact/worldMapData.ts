// ── World Map Layout Data ──
// Positions mapped to the world-map.svg coordinate system
// SVG viewBox: "30.767 241.591 784.077 458.627"

// India's actual position on the world map — derived from geometry.
// The India local artwork spans roughly -2..100 × 0..130 (102 wide × 130 tall).
// We scale it to fit ~66 SVG-world-units wide so it overlays correctly.
export const INDIA_WORLD_SCALE = 0.52;
// Target top-left of India artwork in world-map coords so it lands on the subcontinent:
export const INDIA_WORLD_TX = 540;
export const INDIA_WORLD_TY = 388;

// Derived center for arcs/hub (geometry-anchored, not manual constant)
export const INDIA_CENTER = {
  cx: INDIA_WORLD_TX + 49 * INDIA_WORLD_SCALE, // ~565
  cy: INDIA_WORLD_TY + 65 * INDIA_WORLD_SCALE, // ~422
};

// Phase-1 zoom presets: viewBox values that zoom into India
// These define the SVG viewBox for the zoomed-in India view
export const INDIA_ZOOM_VIEWBOX = {
  desktop: "505 370 130 130",
  mobile: "510 375 120 120",
};

// International cities — positioned on the world map SVG coordinates
export const internationalCities = [
  { cx: 525, cy: 440, label: "Dubai", learners: "180+", flag: "🇦🇪" },
  { cx: 405, cy: 320, label: "London", learners: "85+", flag: "🇬🇧" },
  { cx: 218, cy: 380, label: "New York", learners: "120+", flag: "🇺🇸" },
  { cx: 635, cy: 510, label: "Singapore", learners: "95+", flag: "🇸🇬" },
  { cx: 725, cy: 600, label: "Sydney", learners: "60+", flag: "🇦🇺" },
  { cx: 210, cy: 350, label: "Toronto", learners: "75+", flag: "🇨🇦" },
  { cx: 140, cy: 400, label: "Los Angeles", learners: "110+", flag: "🇺🇸" },
];
