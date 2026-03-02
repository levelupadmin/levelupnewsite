// ── Indian Cities Data ──
// Positions mapped to the IndiaDotsMap local coordinate space (0–200 x 0–280)
// Grouped by region for staggered state-wise lighting animation

export interface IndianCity {
  cx: number;
  cy: number;
  label: string;
  learners: string;
  region: string;
  /** Delay group for staggered animation (0 = center, higher = further out) */
  wave: number;
}

export const indianCities: IndianCity[] = [
  // Wave 0 — Central India (Nagpur area, ripple origin)
  { cx: 108, cy: 138, label: "Nagpur", learners: "45+", region: "Central", wave: 0 },
  { cx: 95, cy: 118, label: "Indore", learners: "35+", region: "Central", wave: 0 },
  { cx: 102, cy: 125, label: "Bhopal", learners: "30+", region: "Central", wave: 0 },
  { cx: 115, cy: 130, label: "Raipur", learners: "20+", region: "Central", wave: 0 },

  // Wave 1 — West (Maharashtra/Gujarat)
  { cx: 72, cy: 148, label: "Mumbai", learners: "320+", region: "West", wave: 1 },
  { cx: 82, cy: 140, label: "Pune", learners: "180+", region: "West", wave: 1 },
  { cx: 62, cy: 120, label: "Ahmedabad", learners: "95+", region: "West", wave: 1 },
  { cx: 55, cy: 130, label: "Surat", learners: "50+", region: "West", wave: 1 },
  { cx: 50, cy: 105, label: "Rajkot", learners: "25+", region: "West", wave: 1 },
  { cx: 68, cy: 170, label: "Goa", learners: "30+", region: "West", wave: 1 },

  // Wave 2 — South
  { cx: 102, cy: 168, label: "Hyderabad", learners: "210+", region: "South", wave: 2 },
  { cx: 90, cy: 195, label: "Bangalore", learners: "280+", region: "South", wave: 2 },
  { cx: 110, cy: 200, label: "Chennai", learners: "190+", region: "South", wave: 2 },
  { cx: 80, cy: 215, label: "Kochi", learners: "65+", region: "South", wave: 2 },
  { cx: 120, cy: 175, label: "Vizag", learners: "40+", region: "South", wave: 2 },
  { cx: 95, cy: 210, label: "Coimbatore", learners: "55+", region: "South", wave: 2 },
  { cx: 88, cy: 225, label: "Trivandrum", learners: "35+", region: "South", wave: 2 },
  { cx: 100, cy: 230, label: "Madurai", learners: "30+", region: "South", wave: 2 },
  { cx: 78, cy: 185, label: "Mangalore", learners: "25+", region: "South", wave: 2 },

  // Wave 3 — North
  { cx: 100, cy: 68, label: "Delhi", learners: "350+", region: "North", wave: 3 },
  { cx: 78, cy: 82, label: "Jaipur", learners: "85+", region: "North", wave: 3 },
  { cx: 120, cy: 80, label: "Lucknow", learners: "70+", region: "North", wave: 3 },
  { cx: 92, cy: 45, label: "Chandigarh", learners: "55+", region: "North", wave: 3 },
  { cx: 110, cy: 90, label: "Kanpur", learners: "40+", region: "North", wave: 3 },
  { cx: 75, cy: 95, label: "Udaipur", learners: "20+", region: "North", wave: 3 },
  { cx: 65, cy: 75, label: "Jodhpur", learners: "15+", region: "North", wave: 3 },
  { cx: 85, cy: 55, label: "Dehradun", learners: "30+", region: "North", wave: 3 },
  { cx: 128, cy: 72, label: "Varanasi", learners: "35+", region: "North", wave: 3 },

  // Wave 4 — East / Northeast
  { cx: 150, cy: 115, label: "Kolkata", learners: "160+", region: "East", wave: 4 },
  { cx: 138, cy: 98, label: "Patna", learners: "45+", region: "East", wave: 4 },
  { cx: 130, cy: 135, label: "Bhubaneswar", learners: "35+", region: "East", wave: 4 },
  { cx: 140, cy: 108, label: "Ranchi", learners: "25+", region: "East", wave: 4 },

  // Wave 5 — Far Northeast
  { cx: 162, cy: 95, label: "Guwahati", learners: "30+", region: "Northeast", wave: 5 },
  { cx: 170, cy: 88, label: "Shillong", learners: "15+", region: "Northeast", wave: 5 },
  { cx: 175, cy: 82, label: "Imphal", learners: "10+", region: "Northeast", wave: 5 },
];

/** Max wave value — used to calculate total stagger duration */
export const MAX_WAVE = 5;

/** Per-wave delay in ms */
export const WAVE_DELAY_MS = 400;
