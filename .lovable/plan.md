
## Add "View All Masterclasses" CTA Card to 4th Grid Slot

### Overview
Add a promotional CTA card in the empty 4th position of the second row (after 7 masterclass posters with a 4-3 layout) that directs users to the full masterclass library.

### Changes

**File: `src/components/MasterclassSection.tsx`**

1. **Create `MasterclassCTACard` component**
   - New component that renders as a 3/4 aspect ratio card (matching masterclass card dimensions)
   - Gradient background: amber/primary color with subtle opacity (similar to premium feel)
   - Centered content: "View All Masterclasses" heading + subtext + ArrowRight icon
   - Links to `https://masterclass.leveluplearning.in/`
   - Hover effects: shadow glow and scale slightly to match the interactive feel of masterclass cards
   - Uses `group` and hover classes for consistency

2. **Update grid rendering logic**
   - After mapping all 7 masterclass cards, conditionally add the CTA card
   - On `lg:grid-cols-4`, this will place it in the 4th slot of the second row
   - On smaller screens (mobile/tablet), it wraps naturally with existing cards

### Design Details

- **Styling**: Matches the poster aesthetic with 3/4 aspect ratio, rounded corners, shadow, and hover interactions (similar glow effect)
- **Colors**: Use primary/amber gradient background with adjusted opacity for a premium, distinctive look (different from the poster style but cohesive)
- **Typography**: Heading + supporting text centered within the card
- **Icon**: ArrowRight icon from lucide-react (consistent with existing CTA)
- **Hover states**: Amber glow shadow + subtle scale effect (similar to masterclass cards for consistency)

### Responsive Behavior
- Desktop (lg): Card lands in 4th position, creating clean 4-3 layout
- Tablet (sm): Card wraps naturally with 3-column grid
- Mobile: Wraps with 2-column grid
