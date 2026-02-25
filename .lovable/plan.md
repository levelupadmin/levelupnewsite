

## Remove Bouncy Animations from Expert Mentors Card

**File:** `src/components/why-levelup/ExpertMembershipCard.tsx`

Remove all `animate-float-card-*` classes and their associated `animationDelay` styles to make the card illustration static.

**Elements affected (6 total):**
1. **Main player** (line 26): remove `animate-float-card-3`
2. **Lesson sidebar** (line 70): remove `animate-float-card-2` and `animationDelay: "0.3s"`
3. **LIVE FEEDBACK badge** (line 126): remove `animate-float-card-1` and `animationDelay: "0.2s"`
4. **Filmmaking tag** (line 135): remove `animate-float-card-2` and `animationDelay: "0s"`
5. **Editing tag** (line 141): remove `animate-float-card-3` and `animationDelay: "0.6s"`
6. **Music tag** (line 147): remove `animate-float-card-1` and `animationDelay: "1.2s"`
7. **Mentor avatars** (line 155): remove `animate-float-card-2` and `animationDelay: "0.8s"`

No other files affected. All elements keep their positioning and styling — only the floating/bouncing animation is removed.

