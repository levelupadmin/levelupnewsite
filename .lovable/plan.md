

## Add Unique Icons for Each Forge Feature Point

Currently all three feature points use the same `AnvilHammerIcon`. The plan is to replace each with a distinct Lucide icon that matches the feature's meaning:

1. **"Pressure that transforms"** → `Flame` icon (intensity, heat, transformation)
2. **"Mentorship without filters"** → `Users` icon (direct connection, people, mentorship)
3. **"Offline. Immersive. Real."** → `MapPin` icon (physical location, in-person, real-world)

### Changes in `src/components/ForgeSection.tsx`

**Line 1** — Add Lucide imports:
```tsx
import { ArrowRight, Flame, Users, MapPin } from "lucide-react";
```

**Lines 43-58** — Add an `icon` field to each feature point:
```tsx
const featurePoints = [
  {
    headline: "Pressure that transforms",
    description: "Not comfort. Not theory. Real creative intensity, shoulder to shoulder.",
    icon: Flame,
  },
  {
    headline: "Mentorship without filters",
    description: "Work directly with creators who've shaped the industry. No layers between you and the work.",
    icon: Users,
  },
  {
    headline: "Offline. Immersive. Real.",
    description: "Step away from screens. Live, create, and break through — together, in one place.",
    icon: MapPin,
  },
];
```

**Line 182** — Replace `<AnvilHammerIcon>` with dynamic icon rendering:
```tsx
<point.icon className="w-6 h-6 text-primary mx-auto mb-3" />
```

The `AnvilHammerIcon` component can be left in place (used nowhere else, harmless) or removed for cleanliness.

