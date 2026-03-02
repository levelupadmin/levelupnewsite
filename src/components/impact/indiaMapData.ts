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

  // Wave 1 — West (Maharashtra/Gujarat)
  { cx: 72, cy: 148, label: "Mumbai", learners: "320+", region: "West", wave: 1 },
  { cx: 82, cy: 140, label: "Pune", learners: "180+", region: "West", wave: 1 },
  { cx: 62, cy: 120, label: "Ahmedabad", learners: "95+", region: "West", wave: 1 },

  // Wave 2 — South
  { cx: 102, cy: 168, label: "Hyderabad", learners: "210+", region: "South", wave: 2 },
  { cx: 90, cy: 195, label: "Bangalore", learners: "280+", region: "South", wave: 2 },
  { cx: 110, cy: 200, label: "Chennai", learners: "190+", region: "South", wave: 2 },
  { cx: 80, cy: 215, label: "Kochi", learners: "65+", region: "South", wave: 2 },
  { cx: 120, cy: 175, label: "Vizag", learners: "40+", region: "South", wave: 2 },

  // Wave 3 — North
  { cx: 100, cy: 68, label: "Delhi", learners: "350+", region: "North", wave: 3 },
  { cx: 78, cy: 82, label: "Jaipur", learners: "85+", region: "North", wave: 3 },
  { cx: 120, cy: 80, label: "Lucknow", learners: "70+", region: "North", wave: 3 },
  { cx: 92, cy: 45, label: "Chandigarh", learners: "55+", region: "North", wave: 3 },

  // Wave 4 — East / Northeast
  { cx: 150, cy: 115, label: "Kolkata", learners: "160+", region: "East", wave: 4 },
];

/** Max wave value — used to calculate total stagger duration */
export const MAX_WAVE = 4;

/** Per-wave delay in ms */
export const WAVE_DELAY_MS = 400;
