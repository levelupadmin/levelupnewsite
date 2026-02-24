

# Add "200+ Projects Enabled" Stat to Portfolio-Driven Learning Card

## What Changes
The second card ("Portfolio-Driven Learning") currently has empty `stat` and `statLabel` fields. These will be populated with "200+" and "PROJECTS ENABLED" so the expanded view shows a centered stat block matching the style of the Expert Mentors card.

## Technical Steps

### `src/components/WhyLevelUp.tsx` (lines 32-33)

Update the feature data for the second card:

| Line | Current | New |
|------|---------|-----|
| 32 | `stat: "",` | `stat: "200+",` |
| 33 | `statLabel: "",` | `statLabel: "PROJECTS ENABLED",` |

No other changes needed -- the rendering logic already conditionally shows the stat block when `feature.stat` is truthy, using the same centered style as the first card.

