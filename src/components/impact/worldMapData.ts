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
  { from: 0, to: 1 },
  { from: 2, to: 3 },
  { from: 1, to: 4 },
  { from: 0, to: 5 },
  { from: 5, to: 2 },
];

// International cities — spread wider to edges for visibility
export const internationalCities = [
  { cx: 260, cy: 280, label: "Dubai", learners: "180+", flag: "🇦🇪" },
  { cx: 180, cy: 100, label: "London", learners: "85+", flag: "🇬🇧" },
  { cx: 70, cy: 180, label: "New York", learners: "120+", flag: "🇺🇸" },
  { cx: 680, cy: 360, label: "Singapore", learners: "95+", flag: "🇸🇬" },
  { cx: 780, cy: 480, label: "Sydney", learners: "60+", flag: "🇦🇺" },
  { cx: 100, cy: 80, label: "Toronto", learners: "75+", flag: "🇨🇦" },
  { cx: 50, cy: 340, label: "Los Angeles", learners: "110+", flag: "🇺🇸" },
];

// Range ring radii (from INDIA_CENTER)
export const RANGE_RINGS = [140, 260];
