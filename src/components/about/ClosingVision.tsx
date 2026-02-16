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
  <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-primary to-[hsl(24,95%,40%)] relative">
    <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
      <m.blockquote
        {...fadeUp}
        transition={{ duration: 0.6 }}
        className="font-serif-display text-2xl md:text-4xl text-primary-foreground leading-relaxed"
      >
        "Creativity is becoming India's most valuable skill."
      </m.blockquote>

      <m.p
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="font-sans-body text-sm md:text-base text-primary-foreground/80 max-w-xl leading-relaxed"
      >
        As AI automates execution, storytelling, creative judgment, and design thinking are the new economic differentiators.
      </m.p>

      <m.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
        <Link to="/">
          <Button
            size="lg"
            className="rounded-xl gap-2 text-sm font-sans-body bg-white text-primary hover:bg-white/90"
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
