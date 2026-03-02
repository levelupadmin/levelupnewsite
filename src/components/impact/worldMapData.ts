// ── Hub-Spoke Radial Layout Data ──
// All positions relative to a 900×600 viewBox with India centered at ~450,300

// India center (Nagpur) in the parent SVG coordinate space
export const INDIA_CENTER = { cx: 450, cy: 300 };

// Offset to translate IndiaDotsMap local coords (108,140) → parent center (450,300)
export const INDIA_OFFSET = { x: 450 - 108, y: 300 - 140 };

// Indian cities — positioned in parent SVG coords
export const indianCities = [
  { cx: 414, cy: 308, label: "Mumbai", learners: "2,400+", flag: "🇮🇳" },
  { cx: 442, cy: 228, label: "Delhi", learners: "1,800+", flag: "🇮🇳" },
  { cx: 432, cy: 355, label: "Bangalore", learners: "1,500+", flag: "🇮🇳" },
  { cx: 452, cy: 360, label: "Chennai", learners: "1,200+", flag: "🇮🇳" },
  { cx: 492, cy: 275, label: "Kolkata", learners: "900+", flag: "🇮🇳" },
  { cx: 444, cy: 328, label: "Hyderabad", learners: "1,100+", flag: "🇮🇳" },
];

// India internal arcs
export const indiaArcs = [
  { from: 0, to: 1 }, // Mumbai ↔ Delhi
  { from: 2, to: 3 }, // Bangalore ↔ Chennai
  { from: 1, to: 4 }, // Delhi ↔ Kolkata
  { from: 0, to: 5 }, // Mumbai ↔ Hyderabad
  { from: 5, to: 2 }, // Hyderabad ↔ Bangalore
];

// International cities — radial positions around India center
// Positioned by real-world compass direction at fixed orbital distances
export const internationalCities = [
  { cx: 225, cy: 300, label: "Dubai", learners: "180+", flag: "🇦🇪", angle: 270 },
  { cx: 165, cy: 115, label: "London", learners: "85", flag: "🇬🇧", angle: 315 },
  { cx: 55, cy: 210, label: "New York", learners: "120+", flag: "🇺🇸", angle: 290 },
  { cx: 680, cy: 340, label: "Singapore", learners: "95", flag: "🇸🇬", angle: 100 },
  { cx: 770, cy: 490, label: "Sydney", learners: "60", flag: "🇦🇺", angle: 135 },
  { cx: 80, cy: 95, label: "Toronto", learners: "75", flag: "🇨🇦", angle: 320 },
  { cx: 35, cy: 310, label: "Los Angeles", learners: "110+", flag: "🇺🇸", angle: 260 },
];

// Range ring radii (from INDIA_CENTER)
export const RANGE_RINGS = [180, 320];
