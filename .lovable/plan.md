

## Add Advanced Cinematography Program as 5th LevelUp Live Cohort

### What needs to be done

1. **Save the uploaded image** to `src/assets/live-acp.png`

2. **Update `src/data/programs.ts`**:
   - Add `import liveAcp from "@/assets/live-acp.png";` at the top with other image imports
   - Add a 5th program object to the `showcasePrograms` array with:
     - `id`: "acp"
     - `title`: "Advanced Cinematography Program"
     - `description`: "A focused 4-week journey into cinematic thinking that covers visual storytelling, lighting logic, composition, and cinematography grammar."
     - `duration`: "4 weeks"
     - `format`: "Live · Online"
     - `instructor`: "Industry Mentors"
     - `status`: "Enrolling"
     - `image`: `liveAcp`
     - `ctaLink`: `"https://www.leveluplearning.live/acp-2"`
     - `learnMoreLink`: `"https://www.leveluplearning.live/acp-2"`
     - `previewVideo`: "/videos/acp-preview.mp4" (placeholder, can be updated later)
     - `youtubeId`: "dQw4w9WgXcQ" (placeholder, can be updated later)

3. **Update `src/components/LiveProgramsSection.tsx`**:
   - Add a 5th color gradient to the `activeGradients` array (indigo color to complement existing amber, sky, violet, rose):
     ```
     { active: "from-indigo-600 to-indigo-600/0", hoverBg: "linear-gradient(to right, rgba(79,70,229,0.25), transparent)", detailBg: "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, transparent 60%)" }
     ```

4. **Update `src/components/navbarData.ts`**:
   - Add import for the new image
   - Add a 5th item to the "LevelUp Live" dropdown `items` array:
     ```
     {
       image: navAcp,
       title: "Advanced Cinematography Program",
       subtitle: "4-week intensive",
       href: "https://www.leveluplearning.live/acp-2",
     }
     ```

### Design decisions

- The LiveProgramsSection component automatically scales to N programs, so no component refactoring needed
- The 5th gradient color (indigo) provides visual distinction while maintaining the brand palette
- Using a 4th color that hasn't appeared in existing programs for uniqueness
- Placeholder video/YouTube URLs can be replaced once assets are ready
- Navigation dropdown grid remains at 4 columns but cards will wrap naturally

### Technical changes summary

- 2 files modified: `src/data/programs.ts`, `src/components/LiveProgramsSection.tsx`, `src/components/navbarData.ts`
- 1 image added: `src/assets/live-acp.png`
- No component logic changes — only data and styling additions

