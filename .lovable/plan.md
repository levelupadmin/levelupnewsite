

## Career Quiz Popup

Build an interactive multi-step quiz dialog that opens when the user clicks "Take our quiz" in the LiveProgramsSection. The quiz follows the flowchart logic to recommend one of 4 products: Masterclass, Live Workshop (BFP/VE/SW), The Forge, or Advanced Mentorship Program.

### Quiz Flow (from flowchart)

```text
START PAGE -> Q1 -> Q2 -> Q3 -> Q4 -> Q5 -> Decision Logic -> Result

Q1: What do you want to learn? (Multiselect: Filmmaking, Editing, Writing, Photography, Music, Design, Content Creation)
Q2: How would you describe your experience? (Beginner, Intermediate, Advanced)
Q3: What's your goal? (Passion/hobby, Go pro/level up)
Q4: How much time can you commit? (All-in for 1-2 weeks, Own pace / a few hours per week)
Q5: What's your budget? (Under 15k, 15k-40k or whatever it takes, 3k-15k)

Decision tree:
- All-in time + High budget (15k-40k) -> The Forge
- All-in time + Pro goal + Experienced + Mid/high budget -> Advanced Mentorship (BFP)
- All-in time + Pro goal + Not experienced / No -> check sub-budget:
  - 3k-15k or pro but not all-in -> Live Workshop
  - Low budget or hobby -> Masterclass
- Own pace / hobby -> Masterclass
```

### Result Pages (4 outcomes)
1. **Masterclass** - "Learn from India's finest, at your own pace." -> links to `#masterclasses`
2. **Live Workshop** - "Structured learning with real-time feedback." -> links to relevant program CTA
3. **The Forge** - "12 days. In person. You make a film." -> links to `https://www.forgebylevelup.com/`
4. **Advanced Mentorship Program** - "For those ready to make the leap." -> links to BFP CTA

### Technical Implementation

**New file: `src/components/CareerQuizDialog.tsx`**
- Self-contained component with internal state machine (step: start | q1-q5 | result)
- Uses existing `Dialog`/`DialogContent` from `@/components/ui/dialog`
- Start page: headline, brief description, "Start Quiz" button
- Each question renders as a card with animated transitions (fade-in)
- Progress bar at top showing step X of 5
- Back button on each step
- Result page shows recommended product with name, description, and CTA button linking to the appropriate URL
- Dark themed to match site aesthetic (bg-background, text-foreground)
- Mobile responsive (dialog already handles this)

**Edit: `src/components/LiveProgramsSection.tsx` (lines 155-162)**
- Replace the `<a>` tag with a `<button>` that sets quiz dialog open state
- Render `<CareerQuizDialog open={quizOpen} onOpenChange={setQuizOpen} />` in the component
- Add `useState` for `quizOpen`

### Decision Logic (simplified)
The component stores answers in state and runs a simple function at the end:
- If Q4 = "own pace" or Q3 = "hobby" and Q5 = low budget -> Masterclass
- If Q4 = "all-in" and Q5 = "15k-40k+" -> The Forge
- If Q4 = "all-in" and Q2 = "advanced" and Q5 = mid+ -> Advanced Mentorship
- If Q5 = "3k-15k" or (pro goal but not all-in) -> Live Workshop
- Default fallback -> Masterclass

