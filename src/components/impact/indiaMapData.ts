// ── India Map Data ──
// City positions and region data for the animated GeoReachScene.
// ALL coordinates are in WORLD-MAP SVG coordinate space (viewBox: "30.767 241.591 784.077 458.627").
// India's actual bbox: x=570.23, y=435.45, w=63.26, h=74.24, center=(601.86, 472.57)

export type Region = "central" | "west" | "north" | "east" | "south";

/** Stagger delay (seconds) for each region wave */
export const REGION_DELAYS: Record<Region, number> = {
  central: 0.3,
  west: 0.7,
  north: 1.1,
  east: 1.5,
  south: 1.9,
};

/** Major Indian cities — in world-map SVG coordinates
 *  Mapped from geographic positions onto the SVG coordinate system.
 *  India bbox: x=570..633, y=435..510, center≈(602, 473)
 */
export const INDIA_CITIES: {
  x: number;
  y: number;
  label: string;
  learners: string;
  region: Region;
  tier: 1 | 2;
}[] = [
  // Tier 1 — major metros
  { x: 595, y: 455, label: "Delhi", learners: "4,200+", region: "north", tier: 1 },
  { x: 578, y: 484, label: "Mumbai", learners: "5,800+", region: "west", tier: 1 },
  { x: 588, y: 500, label: "Bengaluru", learners: "6,100+", region: "south", tier: 1 },
  { x: 600, y: 500, label: "Chennai", learners: "3,400+", region: "south", tier: 1 },
  { x: 598, y: 486, label: "Hyderabad", learners: "3,200+", region: "south", tier: 1 },
  { x: 616, y: 466, label: "Kolkata", learners: "2,800+", region: "east", tier: 1 },

  // Tier 2 — secondary cities
  { x: 584, y: 486, label: "Pune", learners: "3,600+", region: "west", tier: 2 },
  { x: 576, y: 467, label: "Ahmedabad", learners: "1,800+", region: "west", tier: 2 },
  { x: 581, y: 456, label: "Jaipur", learners: "1,500+", region: "west", tier: 2 },
  { x: 603, y: 460, label: "Lucknow", learners: "1,200+", region: "north", tier: 2 },
  { x: 590, y: 448, label: "Chandigarh", learners: "900+", region: "north", tier: 2 },
  { x: 585, y: 504, label: "Kochi", learners: "1,100+", region: "south", tier: 2 },
  { x: 588, y: 474, label: "Indore", learners: "800+", region: "central", tier: 2 },
  { x: 609, y: 490, label: "Vizag", learners: "600+", region: "east", tier: 2 },
  { x: 592, y: 502, label: "Coimbatore", learners: "700+", region: "south", tier: 2 },
  { x: 592, y: 474, label: "Bhopal", learners: "500+", region: "central", tier: 2 },
  { x: 611, y: 460, label: "Patna", learners: "700+", region: "east", tier: 2 },
  { x: 596, y: 478, label: "Nagpur", learners: "600+", region: "central", tier: 2 },
];
