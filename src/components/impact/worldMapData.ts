// ── World Map Layout Data ──
// Positions mapped to the world-map.svg coordinate system
// SVG viewBox: "30.767 241.591 784.077 458.627"

// India's bounding box on the world-map.svg (includes J&K and Ladakh)
export const INDIA_BBOX_WORLD = {
  x: 570.23,
  y: 431,
  w: 63.26,
  h: 78.7,
};

// India center — used as the "hub" for arc connections
export const INDIA_CENTER = {
  cx: 601.86,
  cy: 470,
};

// India outline path — Official boundaries including Jammu & Kashmir and Ladakh.
// Coordinates are in world-map SVG space. The northern boundary extends to
// cover J&K and Ladakh as a smooth northward extension from the main outline.
export const INDIA_SVG_PATH =
  "M595 509.688l3.958-1.938 2.352-8.505-.104-10.44 13.468-14.54v-3.448l2.774-1.08-.104-3.985-2.99-5.817 1.71-3.12 3.743 3.448 4.808.216v1.937l-1.495 1.616.318.863 2.567.104.536 2.904h.753l1.928-3.45.96-9.04 3.206-2.266.104-3.12-1.28-2.48-2.03-.105-7.95 5.256.5 3.38-5.585-.02-1.97-2.41-1.072.138.363 3.354-12.075-.863-7.484-3.338-2-4-2-5-1-4.5-1-4-1.5-2-2.5-1.5-3 0-2 1-1 2-.74 1.26.856 3.424 3.854 3.12-6.665 13.642-4.46.337-.734 1.643 4.393 4.062-.216 4.105-4.486-.07-.483 2.04 3.727-.163.104 1.616-2.67 1.4 1.71 3.232 3.312 1.08 2.03-1.504.96-2.687 1.177-.535 1.392 1.398-.425 3.45-.96 1.616.217 2.8Z";

// Phase-1 zoom presets: viewBox values that zoom into India's actual position
// Centered on India's real bbox with padding
export const INDIA_ZOOM_VIEWBOX = {
  desktop: `${INDIA_BBOX_WORLD.x - 40} ${INDIA_BBOX_WORLD.y - 30} ${INDIA_BBOX_WORLD.w + 80} ${INDIA_BBOX_WORLD.h + 60}`,
  mobile: `${INDIA_BBOX_WORLD.x - 20} ${INDIA_BBOX_WORLD.y - 15} ${INDIA_BBOX_WORLD.w + 40} ${INDIA_BBOX_WORLD.h + 30}`,
};

// International cities — positioned on the world map SVG coordinates
export const internationalCities = [
  { cx: 525, cy: 460, label: "Dubai", learners: "180+", flag: "🇦🇪" },
  { cx: 405, cy: 380, label: "London", learners: "85+", flag: "🇬🇧" },
  { cx: 218, cy: 420, label: "New York", learners: "120+", flag: "🇺🇸" },
  { cx: 650, cy: 510, label: "Singapore", learners: "95+", flag: "🇸🇬" },
  { cx: 725, cy: 600, label: "Sydney", learners: "60+", flag: "🇦🇺" },
  { cx: 210, cy: 380, label: "Toronto", learners: "75+", flag: "🇨🇦" },
  { cx: 140, cy: 430, label: "Los Angeles", learners: "110+", flag: "🇺🇸" },
];
