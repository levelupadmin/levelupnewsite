import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const ClosingVision = () => (
  <section className="py-16 md:py-24 px-6 md:px-12 bg-background relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    <div className="absolute inset-0 bg-gradient-amber-glow pointer-events-none" />

    <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
      <m.blockquote
        {...fadeUp}
        transition={{ duration: 0.6 }}
        className="font-serif-display text-xl md:text-3xl text-hero-headline leading-relaxed"
      >
        "Creativity is becoming India's most valuable skill."
      </m.blockquote>

      <m.p
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-sans-body text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed"
      >
        As AI automates execution, storytelling, creative judgment, and design thinking are the new economic differentiators.
      </m.p>

      <m.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
        <Link to="/">
          <Button
            size="lg"
            className="cta-sweep cta-glow rounded-sm gap-2 text-sm font-sans-body"
          >
            Explore Programs
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </m.div>
    </div>
  </section>
);

export default ClosingVision;
