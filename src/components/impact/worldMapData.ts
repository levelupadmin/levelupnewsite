// World map dot grid data — Mercator-projected coordinates in viewBox 0 0 800 400

// ── Indian cities (focal hub) ──
export const indianCities = [
  { cx: 540, cy: 195, label: "Mumbai" },
  { cx: 548, cy: 160, label: "Delhi" },
  { cx: 575, cy: 215, label: "Bangalore" },
  { cx: 585, cy: 218, label: "Chennai" },
  { cx: 590, cy: 175, label: "Kolkata" },
  { cx: 560, cy: 200, label: "Hyderabad" },
];

// India center for arcs (approx Nagpur)
export const INDIA_CENTER = { cx: 560, cy: 190 };

// ── International cities ──
export const internationalCities = [
  { cx: 470, cy: 195, label: "Dubai" },
  { cx: 395, cy: 105, label: "London" },
  { cx: 175, cy: 130, label: "New York" },
  { cx: 625, cy: 215, label: "Singapore" },
  { cx: 680, cy: 320, label: "Sydney" },
  { cx: 155, cy: 105, label: "Toronto" },
  { cx: 95, cy: 155, label: "Los Angeles" },
];

// ── Internal India arcs (city-to-city) ──
export const indiaArcs = [
  { from: 0, to: 1 }, // Mumbai ↔ Delhi
  { from: 2, to: 3 }, // Bangalore ↔ Chennai
  { from: 1, to: 4 }, // Delhi ↔ Kolkata
  { from: 0, to: 5 }, // Mumbai ↔ Hyderabad
  { from: 5, to: 2 }, // Hyderabad ↔ Bangalore
];

// ── Dense India dots ──
export const indiaDots = [
  // Kashmir / North
  { cx: 540, cy: 145 }, { cx: 544, cy: 142 }, { cx: 548, cy: 140 },
  { cx: 542, cy: 148 }, { cx: 546, cy: 146 }, { cx: 550, cy: 143 },
  // Punjab / Haryana
  { cx: 538, cy: 152 }, { cx: 542, cy: 155 }, { cx: 546, cy: 153 },
  { cx: 550, cy: 156 }, { cx: 536, cy: 156 }, { cx: 544, cy: 158 },
  // Rajasthan
  { cx: 528, cy: 168 }, { cx: 532, cy: 172 }, { cx: 526, cy: 175 },
  { cx: 530, cy: 178 }, { cx: 534, cy: 166 }, { cx: 524, cy: 172 },
  { cx: 536, cy: 170 }, { cx: 528, cy: 180 },
  // Delhi / UP
  { cx: 548, cy: 160 }, { cx: 552, cy: 163 }, { cx: 556, cy: 166 },
  { cx: 550, cy: 168 }, { cx: 554, cy: 170 }, { cx: 558, cy: 164 },
  { cx: 562, cy: 168 }, { cx: 546, cy: 165 },
  // Bihar / East
  { cx: 572, cy: 170 }, { cx: 576, cy: 168 }, { cx: 580, cy: 172 },
  { cx: 568, cy: 172 }, { cx: 584, cy: 170 }, { cx: 574, cy: 175 },
  // Gujarat
  { cx: 520, cy: 185 }, { cx: 516, cy: 188 }, { cx: 524, cy: 182 },
  { cx: 518, cy: 192 }, { cx: 522, cy: 190 }, { cx: 514, cy: 185 },
  // MP / Central
  { cx: 542, cy: 182 }, { cx: 548, cy: 180 }, { cx: 554, cy: 178 },
  { cx: 546, cy: 185 }, { cx: 550, cy: 188 }, { cx: 538, cy: 186 },
  { cx: 556, cy: 182 }, { cx: 560, cy: 186 },
  // Maharashtra
  { cx: 534, cy: 195 }, { cx: 530, cy: 200 }, { cx: 538, cy: 198 },
  { cx: 542, cy: 196 }, { cx: 528, cy: 196 }, { cx: 536, cy: 202 },
  // Nagpur area
  { cx: 558, cy: 192 }, { cx: 554, cy: 196 }, { cx: 562, cy: 194 },
  // Kolkata / East
  { cx: 590, cy: 175 }, { cx: 586, cy: 178 }, { cx: 592, cy: 180 },
  { cx: 588, cy: 182 },
  // Northeast
  { cx: 598, cy: 165 }, { cx: 602, cy: 162 }, { cx: 596, cy: 168 },
  { cx: 604, cy: 166 },
  // Telangana / Hyderabad
  { cx: 556, cy: 202 }, { cx: 560, cy: 200 }, { cx: 564, cy: 204 },
  { cx: 552, cy: 206 }, { cx: 568, cy: 202 },
  // AP coastal
  { cx: 572, cy: 208 }, { cx: 576, cy: 212 }, { cx: 570, cy: 214 },
  // Karnataka
  { cx: 548, cy: 215 }, { cx: 544, cy: 218 }, { cx: 552, cy: 212 },
  { cx: 540, cy: 220 }, { cx: 556, cy: 216 },
  // Goa
  { cx: 530, cy: 210 }, { cx: 534, cy: 208 },
  // Tamil Nadu
  { cx: 564, cy: 222 }, { cx: 568, cy: 226 }, { cx: 572, cy: 220 },
  { cx: 560, cy: 228 }, { cx: 576, cy: 224 }, { cx: 556, cy: 232 },
  // Kerala
  { cx: 548, cy: 230 }, { cx: 544, cy: 234 }, { cx: 550, cy: 226 },
  { cx: 542, cy: 228 },
  // Odisha
  { cx: 580, cy: 195 }, { cx: 576, cy: 198 }, { cx: 584, cy: 192 },
];

// ── World continent dots (sparse, low opacity) ──
export const worldDots = [
  // North America
  { cx: 120, cy: 95 }, { cx: 130, cy: 100 }, { cx: 140, cy: 105 },
  { cx: 150, cy: 100 }, { cx: 160, cy: 108 }, { cx: 170, cy: 115 },
  { cx: 135, cy: 115 }, { cx: 145, cy: 120 }, { cx: 155, cy: 125 },
  { cx: 165, cy: 120 }, { cx: 175, cy: 128 }, { cx: 180, cy: 135 },
  { cx: 125, cy: 108 }, { cx: 115, cy: 102 }, { cx: 105, cy: 110 },
  { cx: 95, cy: 120 }, { cx: 90, cy: 130 }, { cx: 100, cy: 135 },
  { cx: 110, cy: 140 }, { cx: 120, cy: 135 }, { cx: 130, cy: 130 },
  { cx: 140, cy: 135 }, { cx: 150, cy: 138 }, { cx: 160, cy: 132 },
  { cx: 170, cy: 140 }, { cx: 180, cy: 145 }, { cx: 115, cy: 118 },
  { cx: 108, cy: 125 }, { cx: 142, cy: 112 }, { cx: 188, cy: 140 },
  { cx: 85, cy: 140 }, { cx: 80, cy: 148 },
  // Mexico / Central America
  { cx: 130, cy: 170 }, { cx: 140, cy: 175 }, { cx: 150, cy: 180 },
  { cx: 120, cy: 165 }, { cx: 125, cy: 175 }, { cx: 135, cy: 180 },
  { cx: 145, cy: 185 }, { cx: 155, cy: 190 },

  // South America
  { cx: 195, cy: 220 }, { cx: 200, cy: 230 }, { cx: 210, cy: 240 },
  { cx: 215, cy: 250 }, { cx: 220, cy: 260 }, { cx: 218, cy: 270 },
  { cx: 210, cy: 280 }, { cx: 205, cy: 290 }, { cx: 200, cy: 300 },
  { cx: 195, cy: 310 }, { cx: 190, cy: 318 }, { cx: 185, cy: 325 },
  { cx: 225, cy: 235 }, { cx: 230, cy: 245 }, { cx: 228, cy: 255 },
  { cx: 222, cy: 265 }, { cx: 215, cy: 275 }, { cx: 208, cy: 285 },
  { cx: 202, cy: 295 }, { cx: 198, cy: 250 }, { cx: 206, cy: 258 },
  { cx: 235, cy: 248 }, { cx: 232, cy: 260 }, { cx: 212, cy: 225 },
  { cx: 190, cy: 225 }, { cx: 185, cy: 232 },

  // Europe
  { cx: 370, cy: 95 }, { cx: 380, cy: 90 }, { cx: 390, cy: 92 },
  { cx: 400, cy: 98 }, { cx: 410, cy: 95 }, { cx: 395, cy: 105 },
  { cx: 405, cy: 108 }, { cx: 415, cy: 102 }, { cx: 385, cy: 100 },
  { cx: 375, cy: 105 }, { cx: 420, cy: 108 }, { cx: 425, cy: 115 },
  { cx: 430, cy: 112 }, { cx: 412, cy: 118 }, { cx: 402, cy: 115 },
  { cx: 392, cy: 112 }, { cx: 382, cy: 108 }, { cx: 388, cy: 115 },
  { cx: 398, cy: 118 }, { cx: 408, cy: 122 }, { cx: 418, cy: 120 },
  { cx: 365, cy: 100 }, { cx: 360, cy: 108 }, { cx: 355, cy: 115 },
  { cx: 368, cy: 112 }, { cx: 378, cy: 118 },
  // Scandinavia
  { cx: 390, cy: 75 }, { cx: 400, cy: 72 }, { cx: 410, cy: 78 },
  { cx: 395, cy: 82 }, { cx: 405, cy: 85 }, { cx: 415, cy: 88 },
  // UK / Ireland
  { cx: 365, cy: 90 }, { cx: 358, cy: 92 }, { cx: 362, cy: 96 },

  // Africa
  { cx: 395, cy: 185 }, { cx: 400, cy: 195 }, { cx: 410, cy: 200 },
  { cx: 405, cy: 210 }, { cx: 400, cy: 220 }, { cx: 395, cy: 230 },
  { cx: 405, cy: 240 }, { cx: 410, cy: 250 }, { cx: 408, cy: 260 },
  { cx: 402, cy: 270 }, { cx: 398, cy: 280 }, { cx: 392, cy: 290 },
  { cx: 388, cy: 300 }, { cx: 415, cy: 220 }, { cx: 420, cy: 210 },
  { cx: 425, cy: 225 }, { cx: 418, cy: 235 }, { cx: 412, cy: 245 },
  { cx: 390, cy: 200 }, { cx: 385, cy: 210 }, { cx: 380, cy: 195 },
  { cx: 375, cy: 180 }, { cx: 420, cy: 195 }, { cx: 430, cy: 205 },
  { cx: 435, cy: 215 }, { cx: 440, cy: 225 }, { cx: 430, cy: 235 },
  // North Africa
  { cx: 382, cy: 170 }, { cx: 390, cy: 165 }, { cx: 400, cy: 168 },
  { cx: 410, cy: 172 }, { cx: 420, cy: 170 }, { cx: 430, cy: 175 },
  { cx: 440, cy: 172 }, { cx: 450, cy: 175 },

  // Middle East
  { cx: 450, cy: 165 }, { cx: 455, cy: 172 }, { cx: 460, cy: 178 },
  { cx: 465, cy: 185 }, { cx: 458, cy: 168 }, { cx: 448, cy: 180 },
  { cx: 475, cy: 182 }, { cx: 480, cy: 175 },

  // Russia / Central Asia
  { cx: 440, cy: 85 }, { cx: 460, cy: 80 }, { cx: 480, cy: 78 },
  { cx: 500, cy: 75 }, { cx: 520, cy: 72 }, { cx: 540, cy: 70 },
  { cx: 560, cy: 68 }, { cx: 580, cy: 72 }, { cx: 600, cy: 75 },
  { cx: 620, cy: 78 }, { cx: 640, cy: 82 }, { cx: 450, cy: 92 },
  { cx: 470, cy: 88 }, { cx: 490, cy: 85 }, { cx: 510, cy: 82 },
  { cx: 530, cy: 80 }, { cx: 550, cy: 78 },
  // Central Asia
  { cx: 490, cy: 130 }, { cx: 500, cy: 135 }, { cx: 510, cy: 140 },
  { cx: 495, cy: 145 }, { cx: 505, cy: 148 },

  // East Asia / China / Japan
  { cx: 610, cy: 110 }, { cx: 620, cy: 115 }, { cx: 630, cy: 120 },
  { cx: 640, cy: 125 }, { cx: 615, cy: 125 }, { cx: 625, cy: 130 },
  { cx: 635, cy: 135 }, { cx: 645, cy: 140 }, { cx: 600, cy: 120 },
  { cx: 605, cy: 130 }, { cx: 610, cy: 140 }, { cx: 620, cy: 145 },
  { cx: 630, cy: 150 }, { cx: 640, cy: 155 }, { cx: 650, cy: 148 },
  { cx: 655, cy: 135 }, { cx: 660, cy: 142 },
  // Japan
  { cx: 668, cy: 125 }, { cx: 672, cy: 132 }, { cx: 670, cy: 140 },
  { cx: 665, cy: 148 },

  // Southeast Asia
  { cx: 615, cy: 195 }, { cx: 620, cy: 205 }, { cx: 625, cy: 210 },
  { cx: 630, cy: 218 }, { cx: 635, cy: 225 }, { cx: 640, cy: 215 },
  { cx: 650, cy: 220 }, { cx: 645, cy: 230 }, { cx: 610, cy: 200 },
  { cx: 618, cy: 215 },
  // Philippines
  { cx: 660, cy: 195 }, { cx: 658, cy: 205 }, { cx: 662, cy: 212 },

  // Oceania / Australia
  { cx: 670, cy: 290 }, { cx: 680, cy: 295 }, { cx: 690, cy: 300 },
  { cx: 700, cy: 305 }, { cx: 710, cy: 300 }, { cx: 715, cy: 310 },
  { cx: 705, cy: 315 }, { cx: 695, cy: 310 }, { cx: 685, cy: 305 },
  { cx: 675, cy: 300 }, { cx: 660, cy: 295 }, { cx: 665, cy: 305 },
  { cx: 700, cy: 295 }, { cx: 690, cy: 285 }, { cx: 710, cy: 290 },
  { cx: 720, cy: 295 },
  // New Zealand
  { cx: 740, cy: 330 }, { cx: 742, cy: 338 },

  // Indonesia
  { cx: 640, cy: 245 }, { cx: 650, cy: 248 }, { cx: 660, cy: 250 },
  { cx: 670, cy: 252 }, { cx: 680, cy: 255 }, { cx: 655, cy: 255 },
];
