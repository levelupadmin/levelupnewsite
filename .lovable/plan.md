

## Audit: Hardcoded Neutral `hsl(0 0% ...)` Values

### Findings

**Files with neutral black values to replace:**

| File | Line(s) | Current Value | Replacement |
|------|---------|---------------|-------------|
| `src/index.css` | 46 | `hsl(0 0% 0% / 0.6)` (shadow-cinematic) | `hsl(22 14% 0% / 0.6)` |
| `src/index.css` | 47 | `hsl(0 0% 0% / 0.5)`, `hsl(0 0% 0% / 0.3)` (text-shadow-hero) | `hsl(22 14% 0% / 0.5)`, `hsl(22 14% 0% / 0.3)` |
| `src/index.css` | 100 | `hsl(0 0% 0% / 0.06)` (light-mode shadow-cinematic) | `hsl(22 14% 0% / 0.06)` |
| `src/index.css` | 526-542 | `hsl(0 0% 40%)` in lms-tab keyframes (×8 occurrences) | `hsl(22 10% 40%)` |
| `ExpertMembershipCard.tsx` | 46 | `hsl(0 0% 0% / 0.9)` gradient | `hsl(22 14% 0% / 0.9)` |
| `ExpertMembershipCard.tsx` | 173 | `hsl(0 0% 0% / 0.5)` box-shadow | `hsl(22 14% 0% / 0.5)` |
| `LiveProjectsCard.tsx` | 22 | `hsl(0 0% 0% / 0.4)` box-shadow | `hsl(22 14% 0% / 0.4)` |
| `LiveProjectsCard.tsx` | 42 | `hsl(0 0% 0% / 0.75)` gradient | `hsl(22 14% 0% / 0.75)` |
| `CommunityCard.tsx` | 204 | `hsl(0 0% 0% / 0.4)` box-shadow | `hsl(22 14% 0% / 0.4)` |

### Approach

Replace all `hsl(0 0% ...)` with `hsl(22 14% ...)` (or `hsl(22 10% ...)` for the mid-gray tab text) to give shadows, gradients, and inactive text a warm undertone matching the established palette. The lightness values stay identical — only hue and saturation shift.

Four files total: `src/index.css`, `ExpertMembershipCard.tsx`, `LiveProjectsCard.tsx`, `CommunityCard.tsx`.

