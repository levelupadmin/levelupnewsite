import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import usePageSeo from "@/hooks/usePageSeo";

/**
 * Refund Policy — covers LevelUp's self-serve product tiers:
 *   • Masterclasses (pre-recorded, one-time payment, lifetime access)
 *   • Workshops (short 1-3 day intensives)
 *   • Free events
 *
 * Live programs (BFP, the Advance Direction Program, and other multi-week
 * instructor-led cohorts) and the Forge program have their OWN dedicated
 * Refund & Cancellation policies. This page links out to them in Section 3
 * rather than restating their terms.
 *
 * Required for: Apple App Store review (Guideline 1.1.6 — they expect
 * a refund mechanism for paid content), Razorpay merchant compliance,
 * Indian Consumer Protection Act 2019, and basic customer trust.
 */

const tocSections = [
  { id: "overview",          label: "1. Overview" },
  { id: "masterclasses",     label: "2. Masterclasses" },
  { id: "live-cohorts",      label: "3. Live programs & the Forge" },
  { id: "workshops",         label: "4. Workshops" },
  { id: "free-events",       label: "5. Free events" },
  { id: "how-to-request",    label: "6. How to request a refund" },
  { id: "processing",        label: "7. Processing time + method" },
  { id: "non-refundable",    label: "8. What's non-refundable" },
  { id: "exceptional",       label: "9. Exceptional circumstances" },
  { id: "chargeback",        label: "10. Chargebacks" },
  { id: "contact",           label: "11. Contact" },
];

const RefundPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  usePageSeo({
    title: "Refund Policy — LevelUp Learning",
    description: "Clear refund policy for LevelUp Learning's masterclasses and workshops. 7-day no-questions-asked window on masterclasses. Live programs and the Forge have their own dedicated policies.",
    path: "/refund-policy",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    tocSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <MotionProvider>
      <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h1 className="font-sans-body text-3xl md:text-4xl font-bold text-foreground mb-2">Refund Policy</h1>
        <p className="font-sans-body text-sm text-muted-foreground mb-2">Effective: 28 May 2026 · Last updated: 28 May 2026</p>
        <p className="font-sans-body text-sm text-muted-foreground mb-10">
          See also our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
        </p>

        <nav className="bg-card border border-border rounded-lg p-6 mb-12 print:hidden">
          <h2 className="text-lg font-semibold text-foreground mb-4">Table of Contents</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {tocSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`transition-colors ${activeId === s.id ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-0 font-sans-body text-sm md:text-base text-muted-foreground leading-relaxed">
          <p className="border-b border-border pb-8 mb-8">
            We want you to learn from us with confidence. This Refund Policy explains exactly when, why, and
            how you can get your money back across the products covered here — masterclasses, workshops, and
            Resources bundles. Live programs and the Forge program each have their own dedicated Refund &amp;
            Cancellation Policy (see <a href="#live-cohorts" className="text-primary hover:underline">Section 3</a>).
          </p>

          <section id="overview" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
            <div className="bg-muted/50 border-l-2 border-primary p-4 rounded">
              <p className="text-foreground font-medium mb-3">At a glance:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong className="text-foreground">Masterclasses:</strong> 7 days from purchase, full refund, no questions asked — provided you've watched under 25% of the content.</li>
                <li><strong className="text-foreground">Live programs &amp; the Forge:</strong> governed by their own dedicated Refund &amp; Cancellation Policies — see <a href="#live-cohorts" className="text-primary hover:underline">Section 3</a>.</li>
                <li><strong className="text-foreground">Workshops:</strong> full refund up to 48 hours before the start time. No refund after.</li>
                <li><strong className="text-foreground">Free events:</strong> nothing to refund.</li>
              </ul>
            </div>
            <p className="mt-4">
              All refunds are processed in Indian Rupees (INR) back to the original payment method via Razorpay.
              Detailed terms by product follow below.
            </p>
          </section>

          <section id="masterclasses" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Masterclasses (pre-recorded courses)</h2>
            <p className="mb-3">
              Examples: <em>Karthick Subbaraj Teaches Filmmaking, G Venket Ram Teaches Photography, Ravi Basrur
              Teaches Music Composition, DRK Kiran Teaches Art Direction, Nelson Dilipkumar Teaches Filmmaking,
              The Storytelling Masterclass</em>, and similar.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">7-day window:</strong> request a full refund within 7 calendar days of purchase.</li>
              <li><strong className="text-foreground">Watch-limit condition:</strong> the refund window closes early if you've watched more than 25% of the masterclass's total runtime. Our player tracks per-chapter completion.</li>
              <li><strong className="text-foreground">After 7 days:</strong> no refunds. The masterclass remains yours for life — re-watch any chapter forever.</li>
              <li><strong className="text-foreground">Coupon / discounted purchases:</strong> same 7-day window applies. The refund is the net amount you paid, including discount.</li>
            </ul>
          </section>

          <section id="live-cohorts" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Live programs &amp; the Forge</h2>
            <p className="mb-4">
              Our live cohort programs — the 8–12 week instructor-led programs across filmmaking, editing, AI,
              and communication (including the Breakthrough Filmmaker Programme and the Advance Direction
              Program) — and the Forge program are each governed by their own dedicated Refund &amp; Cancellation
              Policy. <strong className="text-foreground">The refund terms on this page do not apply to them.</strong> Please refer to the applicable policy:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Live programs:</strong>{" "}
                <a href="https://www.leveluplearning.live/refund-cancellation-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Refund &amp; Cancellation Policy →</a>
              </li>
              <li>
                <strong className="text-foreground">The Forge:</strong>{" "}
                <a href="https://creators.forgebylevelup.com/cancellation-and-refund-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cancellation &amp; Refund Policy →</a>
              </li>
            </ul>
          </section>

          <section id="workshops" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Workshops (1–3 day intensives)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Up to 48 hours before start:</strong> full refund.</li>
              <li><strong className="text-foreground">Within 48 hours of start, or after start:</strong> no refund.</li>
              <li>You may transfer your seat to a future workshop date for a small re-scheduling charge (₹500), subject to availability. Email us at least 24 hours before the original start.</li>
            </ul>
          </section>

          <section id="free-events" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Free events</h2>
            <p>Webinars, AMAs, demo days, and similar zero-fee events have nothing to refund. You may simply unenrol or stop attending.</p>
          </section>

          <section id="how-to-request" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">6. How to request a refund</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email <a href="mailto:support@leveluplearning.in" className="text-primary hover:underline">support@leveluplearning.in</a> from the email address you used to purchase.</li>
              <li>Subject line: "Refund request — [name of course/cohort]"</li>
              <li>In the body, share: the order ID (from your purchase email), the date you paid, and a one-line reason. Reasons are appreciated but not required for in-window masterclass refunds.</li>
            </ol>
            <p className="mt-3">
              We acknowledge every refund email within 24 hours (Indian business hours: Mon–Fri, 10am–6pm IST).
            </p>
          </section>

          <section id="processing" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Processing time + method</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Approval:</strong> we'll confirm your refund eligibility within 3 working days of your request.</li>
              <li><strong className="text-foreground">Initiation:</strong> approved refunds are initiated to Razorpay the same working day.</li>
              <li><strong className="text-foreground">Settlement:</strong> Razorpay typically returns funds to your original payment method within 5–7 working days. UPI is often faster (1–3 days); credit cards can take up to 10 working days.</li>
              <li><strong className="text-foreground">Original-method refund:</strong> all refunds go back to the exact payment instrument you used. We cannot refund to a different card/UPI/bank account.</li>
              <li><strong className="text-foreground">Currency:</strong> all refunds are in INR. International customers may see a small forex difference vs the original charge — this is set by your card issuer's exchange rate on the day, not us.</li>
            </ul>
          </section>

          <section id="non-refundable" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">8. What's non-refundable</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Masterclasses where 25%+ of the runtime has been watched.</li>
              <li>Workshops once they've started or are within 48 hours of starting.</li>
              <li>Razorpay payment-gateway fees on disputed/chargeback transactions (set by Razorpay, not us).</li>
              <li>"Bundle" purchases where you've already consumed one of the bundled items beyond the masterclass 25% watch limit.</li>
            </ul>
          </section>

          <section id="exceptional" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Exceptional circumstances</h2>
            <p className="mb-3">
              We will consider refunds outside the standard windows on a case-by-case basis where there's a
              clear and verifiable reason — e.g. medical emergency with documentation, bereavement, content
              not delivered as promised, a technical issue on our side that prevented you from accessing the
              content for an extended period.
            </p>
            <p>Email us with the details. We don't promise — we listen.</p>
          </section>

          <section id="chargeback" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Chargebacks</h2>
            <p>
              Please email us BEFORE raising a chargeback or dispute with your bank. Chargebacks cost us
              Razorpay penalty fees regardless of outcome, and they take 30–60 days to resolve versus our
              7-day refund processing. We will always work with you to resolve issues directly — that route
              is faster and cheaper for everyone.
            </p>
          </section>

          <section id="contact">
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
            <div className="bg-muted/50 border-l-2 border-primary p-4 rounded">
              <p className="text-foreground text-sm">For refund requests:</p>
              <p className="mt-2">
                <a href="mailto:support@leveluplearning.in" className="text-primary hover:underline font-medium">support@leveluplearning.in</a>
              </p>
              <p className="text-foreground text-sm mt-3">For escalations or to reach our Grievance Officer:</p>
              <p className="mt-1">
                <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline font-medium">admin@leveluplearning.in</a>
              </p>
              <p className="text-sm mt-3">
                LevelUp Edu Pvt Ltd, Old no.9 New no.17, Seethammal Rd, Seethammal Colony, Alwarpet, Chennai, Tamil Nadu 600018
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all print:hidden"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      </div>
    </MotionProvider>
  );
};

export default RefundPolicy;
