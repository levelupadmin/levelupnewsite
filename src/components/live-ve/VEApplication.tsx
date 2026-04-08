import { useRef, useEffect, useState, useCallback } from "react";
import FadeInSection from "@/components/FadeInSection";

const steps = [
  { step: "01", title: "Request an invite via\nthe application form" },
  { step: "02", title: "Pay a refundable\napplication fee" },
  { step: "03", title: "Sit for an interview with\nour admissions team" },
  { step: "04", title: "Get a decision\nwithin 12–48 hours" },
  { step: "05", title: "Confirm your seat\nif selected" },
];

const VEApplication = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (rect.top < 120) {
        const scale = 1 - index * 0.03;
        const opacity = 1 - index * 0.1;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);
      } else {
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      className="text-center"
      style={{ background: "#050505", padding: "120px 20px" }}
    >
      <FadeInSection>
        <p className="text-sm mb-2" style={{ color: "#777" }}>
          🎬 The Process
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-normal text-white m-0"
        >
          How to Apply?
        </h2>
        <p
          className="mx-auto leading-relaxed"
          style={{
            color: "#aaa",
            maxWidth: 500,
            margin: "20px auto 80px",
          }}
        >
          To become the kind of editor who knows what to cut, why it works, and
          how to turn it into paid work.
        </p>
      </FadeInSection>

      <div className="relative mx-auto" style={{ maxWidth: 520 }}>
        {steps.map((step, i) => (
          <div
            key={step.step}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="text-center"
            style={{
              position: "sticky",
              top: 100,
              marginBottom: i === steps.length - 1 ? 0 : 40,
              padding: 30,
              borderRadius: 20,
              background: "linear-gradient(135deg, hsl(270 40% 14%), hsl(260 30% 10%))",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.6), 0 0 40px rgba(140, 80, 255, 0.12)",
              border: "1px solid rgba(140, 80, 255, 0.1)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            <div
              className="text-xs mb-2"
              style={{ color: "hsl(270 70% 70%)" }}
            >
              Step {step.step}
            </div>
            <h3
              className="text-xl md:text-2xl font-normal text-white m-0 leading-relaxed whitespace-pre-line"
              
            >
              {step.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VEApplication;
