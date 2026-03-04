

## Sync CredibilityCues numbers with Impact section truth

The CredibilityCues bar currently shows outdated/less-meaningful stats. Update to match the canonical numbers from the Impact section scenes:

**Current → New:**

| Slot | Current | New |
|------|---------|-----|
| 1 | 57,660+ Learners enrolled | **58,746+** Paid Learners |
| 2 | 4.85 Rating (15,000+ reviews) | **4.86** Rating (15,000+ reviews) |
| 3 | 6+ Masterclasses | **821+** Cities |
| 4 | 20+ Hours of content | **3,000+** Collaborations |

**File:** `src/components/CredibilityCues.tsx` — update the `cues` array (lines 5-10) with the corrected values, labels, and formatting flags (hasComma for 3,000).

