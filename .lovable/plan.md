
## Add Horizontal Arrow Animation to Mini CTA Banner

The arrow inside the "Take our quiz" link in the Mini CTA banner needs an animated horizontal movement to draw attention and create a dynamic, interactive feel.

### Technical Approach

**Animation Method**: Use Tailwind CSS with a custom keyframe animation for horizontal movement, similar to the existing animations in the tailwind config.

**Why this approach**:
- Consistent with the existing animation patterns in the project (fade-up, scale-reveal, etc.)
- No need for additional dependencies (framer-motion is already available but Tailwind is simpler here)
- The arrow is a simple icon that benefits from a straightforward translate animation

### Changes Required

**1. Add new keyframe to tailwind.config.ts**
- Add `"slide-right"` keyframe that translates the arrow horizontally:
  - `0%`: `translateX(0)`
  - `50%`: `translateX(4px)` (slides right)
  - `100%`: `translateX(0)` (returns to original position)
- Add animation duration: `slide-right 1.5s ease-in-out infinite`

**2. Update LiveProgramsSection.tsx**
- Wrap the arrow icon in a `<span>` or apply the animation class directly to the `ArrowRight` component
- Add `animate-slide-right` class to create the continuous horizontal sliding effect
- Keep the existing hover and transition styles intact

### Expected Result
The arrow will continuously slide left-right (4px movement) in an infinite loop at 1.5 second intervals, creating a subtle "pull" effect that encourages users to click the "Take our quiz" link.

