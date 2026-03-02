// ── India Map Data ──
// Simplified state outlines and city positions for the animated GeoReachScene.
// Coordinate space: 0–100 (width) × 0–130 (height), origin at top-left (Kashmir → Kanyakumari).

export type Region = "central" | "west" | "north" | "east" | "south";

/** Stagger delay (seconds) for each region wave */
export const REGION_DELAYS: Record<Region, number> = {
  central: 0.3,
  west: 0.7,
  north: 1.1,
  east: 1.5,
  south: 1.9,
};

/** Simplified SVG path data for major Indian states / UTs */
export const INDIA_STATE_PATHS: { id: string; region: Region; d: string }[] = [
  // ── North ──
  { id: "jk", region: "north", d: "M50,2 L62,0 L68,8 L70,18 L64,22 L56,20 L48,14 Z" },
  { id: "hp", region: "north", d: "M56,22 L66,20 L72,28 L68,34 L60,32 L54,26 Z" },
  { id: "pb", region: "north", d: "M40,28 L54,26 L56,36 L50,40 L40,38 Z" },
  { id: "uk", region: "north", d: "M62,24 L74,28 L78,36 L72,40 L64,36 Z" },
  { id: "hr", region: "north", d: "M40,38 L50,40 L54,48 L48,52 L40,48 Z" },
  { id: "up", region: "north", d: "M50,40 L72,40 L82,48 L78,56 L68,60 L54,56 L48,48 Z" },

  // ── Central ──
  { id: "mp", region: "central", d: "M30,58 L54,56 L68,60 L66,72 L56,76 L32,74 L26,66 Z" },

  // ── West ──
  { id: "rj", region: "west", d: "M10,34 L40,32 L40,48 L38,60 L30,66 L14,62 L6,50 Z" },
  { id: "gj", region: "west", d: "M0,52 L6,50 L14,62 L18,70 L14,78 L4,76 L-2,66 Z" },
  { id: "mh", region: "west", d: "M14,74 L32,74 L52,78 L56,86 L50,92 L32,94 L20,90 L12,80 Z" },
  { id: "goa", region: "west", d: "M20,92 L26,90 L28,96 L22,96 Z" },

  // ── East ──
  { id: "br", region: "east", d: "M70,46 L82,46 L84,52 L78,56 L70,54 Z" },
  { id: "jh", region: "east", d: "M66,56 L78,56 L80,64 L74,70 L64,66 Z" },
  { id: "wb", region: "east", d: "M78,52 L88,48 L92,56 L88,66 L84,72 L78,64 L76,58 Z" },
  { id: "od", region: "east", d: "M62,68 L78,64 L84,72 L80,82 L72,84 L62,78 Z" },
  { id: "cg", region: "east", d: "M56,62 L66,60 L72,68 L68,78 L60,78 L54,72 Z" },
  { id: "ne", region: "east", d: "M86,40 L96,38 L100,46 L98,56 L92,58 L86,50 Z" },

  // ── South ──
  { id: "ts", region: "south", d: "M44,76 L56,76 L64,78 L62,86 L50,88 L42,82 Z" },
  { id: "ap", region: "south", d: "M50,86 L64,82 L72,84 L68,96 L58,102 L48,98 L44,90 Z" },
  { id: "ka", region: "south", d: "M22,96 L32,94 L44,98 L48,108 L42,114 L28,112 L22,102 Z" },
  { id: "kl", region: "south", d: "M26,114 L34,114 L34,124 L30,130 L24,126 L22,118 Z" },
  { id: "tn", region: "south", d: "M40,108 L54,102 L62,108 L60,120 L50,128 L38,124 L34,114 Z" },
];

/** Major Indian cities positioned in the same local coordinate space */
export const INDIA_CITIES: {
  x: number;
  y: number;
  label: string;
  learners: string;
  region: Region;
}[] = [
  { x: 50, y: 44, label: "Delhi", learners: "4,200+", region: "north" },
  { x: 16, y: 76, label: "Mumbai", learners: "5,800+", region: "west" },
  { x: 36, y: 106, label: "Bengaluru", learners: "6,100+", region: "south" },
  { x: 54, y: 118, label: "Chennai", learners: "3,400+", region: "south" },
  { x: 58, y: 84, label: "Hyderabad", learners: "3,200+", region: "south" },
  { x: 86, y: 54, label: "Kolkata", learners: "2,800+", region: "east" },
  { x: 38, y: 84, label: "Pune", learners: "3,600+", region: "west" },
  { x: 10, y: 58, label: "Ahmedabad", learners: "1,800+", region: "west" },
  { x: 26, y: 40, label: "Jaipur", learners: "1,500+", region: "west" },
  { x: 66, y: 48, label: "Lucknow", learners: "1,200+", region: "north" },
  { x: 46, y: 30, label: "Chandigarh", learners: "900+", region: "north" },
  { x: 28, y: 120, label: "Kochi", learners: "1,100+", region: "south" },
  { x: 36, y: 66, label: "Indore", learners: "800+", region: "central" },
  { x: 70, y: 90, label: "Vizag", learners: "600+", region: "east" },
  { x: 44, y: 112, label: "Coimbatore", learners: "700+", region: "south" },
  { x: 48, y: 66, label: "Bhopal", learners: "500+", region: "central" },
  { x: 76, y: 48, label: "Patna", learners: "700+", region: "east" },
  { x: 52, y: 72, label: "Nagpur", learners: "600+", region: "central" },
];
