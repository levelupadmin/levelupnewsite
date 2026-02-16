

# About Us Page -- Built from the Investor Deck

## Overview

A new `/about` page that distills the investor deck's narrative into a public-facing story. The page will follow the same cinematic dark aesthetic, Sora typography, and amber accent system as the rest of the site. No investor-confidential data (revenue, MRR, fundraising) will be shown -- only the public-worthy story, problem framing, mission, stats, team, and outcomes.

## Page Sections (top to bottom)

### 1. Hero -- "Building India's Creative Career Infrastructure"
- Full-width dark section with the tagline from the deck's cover
- Subline: "India's next workforce isn't coding -- it's creating."
- Supporting line from deck: "Filmmakers, Musicians, Designers and Creators are building a new kind of career -- driven by ideas, not job titles."

### 2. The Problem
Three cards in a row (stacked on mobile) presenting the three core problems from the deck:
- **No Structured Learning** -- "YouTube has 10,000 tutorials. Zero clear pathways."
- **No Verified Skills** -- "They learn scattered skills but can't prove their capability."
- **No Access to Network** -- "Talent gets lost without a network. Opportunities go to known faces only."

### 3. The Opportunity (Market Context)
A subtle data section with key public stats from the deck (sourced from BCG, LinkedIn, AIICE):
- India's creative industry: $30B (set to be $50B by 2030)
- Creative job postings: up 180% in 3 years
- 67% of creative positions remain unfilled
- By 2030, 10M creative professionals will make up 15-18% of India's IT workforce
Each stat displayed as a compact grid with source attribution.

### 4. Our Answer -- "The only end-to-end infrastructure for creative careers"
A visual journey through the four ecosystem layers:
- **Discover** -- 2-hour Workshops to explore creative fields
- **Learn from the best** -- Masterclasses from India's top 0.01%
- **Master the craft** -- 8-16 week live cohorts with portfolios and placement
- **Experience** -- Invite-only Forge residencies worldwide
Displayed as a horizontal timeline on desktop, vertical stack on mobile.

### 5. Impact Numbers
A clean stats row (reusing the AnimatedCounter component already in the project):
- 9,000+ learners
- 821 cities
- 13+ countries
- 300,000+ community
- 3,000+ collaborations enabled
- 4.86/5 average rating

### 6. Student Success Stories
Four mini case studies from the deck, each as a compact card:
- Chetan Chaudhary -- Aspiring Director to first feature film
- Bishall Paul -- Stuck writer to Amazon bestselling author
- Kiruba Shankar -- 800 views to 500K+ viral reels
- Sneha Patil -- No job offers to placed at Swiggy

### 7. Why LevelUp (Moats)
Three pillars from the deck's "Why should we be the ones building this?":
- **Mentor IP** -- Exclusive masterclasses with top filmmakers
- **Community Flywheel** -- 300K+ creators fueling acquisition and opportunity
- **Brand and Certification Partners** -- Partnered with India's leading brands and institutions

### 8. Closing Vision
Quote-style closing block:
- "Creativity is becoming India's most valuable skill."
- "As AI automates execution, storytelling, creative judgment, and design thinking are the new economic differentiators."
- CTA: "Explore Programs" linking back to homepage

### 9. Featured In (press logos)
Reuse the existing press logos from `TrustedCTASection` -- Outlook India, The Quint, Hindustan Times, YourStory, ABN.

## Technical Details

### New Files
- `src/pages/About.tsx` -- Page component with all sections above
- `src/components/about/AboutHero.tsx` -- Hero section
- `src/components/about/ProblemSection.tsx` -- The 3-card problem layout
- `src/components/about/OpportunityStats.tsx` -- Market data grid
- `src/components/about/EcosystemJourney.tsx` -- 4-layer timeline
- `src/components/about/ImpactNumbers.tsx` -- Stats row with AnimatedCounter
- `src/components/about/SuccessStories.tsx` -- 4 student case study cards
- `src/components/about/WhyUsSection.tsx` -- 3 moat pillars
- `src/components/about/ClosingVision.tsx` -- Quote block with CTA

### Modified Files
- `src/App.tsx` -- Add `/about` route
- `src/components/navbarData.ts` -- Update "About" link from external URL to `/about`
- `src/components/Navbar.tsx` -- Update the hardcoded About label href to `/about`

### Patterns and Conventions
- All sections use `py-12 md:py-16` vertical padding and `px-6 md:px-12` horizontal padding
- Max width: `max-w-7xl` for standard sections
- Dark background throughout (`bg-background`)
- Amber accent lines and glows between sections
- Sora font via `font-serif-display` and `font-sans-body` utilities
- Framer Motion for scroll-triggered fade-in animations
- Reuse existing `AnimatedCounter` component for the stats
- Each sub-component kept under 200 lines per project guidelines

