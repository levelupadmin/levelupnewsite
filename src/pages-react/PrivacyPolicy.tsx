import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import usePageSeo from "@/hooks/usePageSeo";

/**
 * Privacy Policy — rewritten 2026-05-28 for Apple App Store + Google Play
 * + India DPDP Act 2023 compliance. Explicitly covers the iOS app
 * (Capacitor wrapper around app.leveluplearning.in), the Android app,
 * and the marketing site. Names every third-party processor + describes
 * the in-app account deletion path Apple requires under Guideline
 * 5.1.1(v).
 */

const tocSections = [
  { id: "scope",            label: "1. Scope: who we are and what this covers" },
  { id: "info-collect",     label: "2. Information we collect" },
  { id: "how-use",          label: "3. How we use your information" },
  { id: "data-sharing",     label: "4. Third-party processors we share data with" },
  { id: "tracking",         label: "5. Cookies, analytics, and tracking" },
  { id: "data-retention",   label: "6. Data retention" },
  { id: "data-location",    label: "7. Where your data is stored" },
  { id: "your-rights",      label: "8. Your rights" },
  { id: "account-deletion", label: "9. Account deletion" },
  { id: "data-security",    label: "10. Data security" },
  { id: "data-breach",      label: "11. Data breach notification" },
  { id: "children-privacy", label: "12. Children's privacy" },
  { id: "updates-policy",   label: "13. Changes to this policy" },
  { id: "grievance",        label: "14. Grievance officer (DPDP Act, India)" },
  { id: "contact-us",       label: "15. Contact us" },
];

const PrivacyPolicy = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  usePageSeo({
    title: "Privacy Policy — LevelUp Learning",
    description: "How LevelUp Learning collects, uses, and protects your personal data across our website, iOS app, and Android app. India DPDP Act + Apple App Store compliant.",
    path: "/privacy-policy",
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
        <h1 className="font-sans-body text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="font-sans-body text-sm text-muted-foreground mb-2">Effective: 28 May 2026 · Last updated: 29 May 2026</p>
        <p className="font-sans-body text-sm text-muted-foreground mb-10">
          See also our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
          <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>.
        </p>

        {/* Table of Contents */}
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
            LevelUp Edu Pvt Ltd ("LevelUp", "we", "us", or "our") respects your privacy. This Privacy Policy
            explains what personal data we collect, how we use it, who we share it with, and the rights you
            have. It applies to our website (<strong>www.leveluplearning.in</strong>), our learning platform
            (<strong>app.leveluplearning.in</strong>), our <strong>iOS app</strong> and our{" "}
            <strong>Android app</strong> (together, the "Services").
          </p>

          <section id="scope" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Scope: who we are and what this covers</h2>
            <p className="mb-3">
              <strong className="text-foreground">Data fiduciary / controller:</strong> LevelUp Edu Pvt Ltd, a private limited company
              incorporated in India, registered at Old no.9 New no.17, Seethammal Rd, Seethammal Colony, Alwarpet,
              Chennai, Tamil Nadu 600018. For the purposes of India's Digital Personal Data Protection Act, 2023
              (the "DPDP Act") we are the "Data Fiduciary".
            </p>
            <p>
              This policy applies wherever you interact with us: browsing our marketing pages, signing up for an
              account, buying a course, watching content, posting in the community, taking a cohort, or
              contacting our support team — whether on the web, iOS, or Android.
            </p>
          </section>

          <section id="info-collect" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Information we collect</h2>
            <p className="mb-3">We collect the following categories of personal data. Categories below map to the Apple "App Privacy" labels disclosed in the App Store listing.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Contact Info:</strong> name, email address, phone number (used for OTP login + transactional comms).</li>
              <li><strong className="text-foreground">Identifiers:</strong> a unique user ID issued by our auth system, your device identifier (used to keep you signed in), and an IP address captured at request time.</li>
              <li><strong className="text-foreground">Purchases:</strong> records of which courses you bought, the amount, the date, and tokenised payment-method metadata returned by Razorpay (we never see or store your full card number or CVV — Razorpay does, as PCI-DSS-certified).</li>
              <li><strong className="text-foreground">User Content:</strong> assignments you submit, peer reviews you write, community posts and comments, chapter notes you save, profile bio + avatar you upload.</li>
              <li><strong className="text-foreground">Usage Data:</strong> which pages you view, which chapters you watch and for how long, your progress through a course, which features you use, attendance at live sessions.</li>
              <li><strong className="text-foreground">Diagnostics:</strong> error reports, crash logs, performance metrics — collected via Sentry to keep the Services working.</li>
              <li><strong className="text-foreground">Location (approximate only):</strong> we may infer your city or country from your IP address. We do <em>not</em> request precise device-level location, and the iOS / Android apps do not ask for the location permission.</li>
            </ul>
            <p className="mt-4">
              We do <strong>not</strong> collect: precise GPS location; health, financial, or biometric data;
              contacts; calendars; photos library (other than what you explicitly upload); your microphone or camera.
            </p>
          </section>

          <section id="how-use" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How we use your information</h2>
            <p className="mb-3">We use your personal data only for the following purposes (these are the "lawful purposes" under the DPDP Act):</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Service delivery:</strong> to create and maintain your account, grant access to the courses you bought, track your progress, deliver cohort assignments + feedback, host the community.</li>
              <li><strong className="text-foreground">Payments:</strong> to process your purchases through Razorpay, send GST invoices, and process refunds.</li>
              <li><strong className="text-foreground">Transactional communications:</strong> account verification (OTP), order confirmations, cohort reminders, mentor feedback notifications, refund updates — sent over email + WhatsApp + SMS.</li>
              <li><strong className="text-foreground">Marketing communications:</strong> news about new offerings, batch launches, and educational content. Always opt-in, with a one-click unsubscribe.</li>
              <li><strong className="text-foreground">Product analytics:</strong> aggregate, anonymous usage patterns to improve the Services.</li>
              <li><strong className="text-foreground">Safety + integrity:</strong> to detect fraud, abuse, and policy violations; to investigate reports; to enforce our Terms.</li>
              <li><strong className="text-foreground">Legal obligations:</strong> tax records, GST filings, and responding to lawful requests from authorities.</li>
            </ul>
          </section>

          <section id="data-sharing" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-party processors we share data with</h2>
            <p className="mb-3">
              We do not sell or rent your personal data. We share it only with the specific service providers
              listed below, and only to the extent each one needs to deliver the function described. Each of
              these processors is contractually required to handle your data with the same care we do.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded">
                <thead className="bg-muted/50">
                  <tr className="text-left text-foreground">
                    <th className="px-3 py-2 font-semibold">Processor</th>
                    <th className="px-3 py-2 font-semibold">What it does</th>
                    <th className="px-3 py-2 font-semibold">Data shared</th>
                  </tr>
                </thead>
                <tbody className="[&_td]:px-3 [&_td]:py-2 [&_td]:border-t [&_td]:border-border">
                  <tr><td><strong className="text-foreground">Supabase</strong></td><td>Authentication, database, storage</td><td>All account + content data (Tokyo region)</td></tr>
                  <tr><td><strong className="text-foreground">Vercel</strong></td><td>Web + app hosting + CDN</td><td>IP, request metadata (global edge)</td></tr>
                  <tr><td><strong className="text-foreground">Razorpay</strong></td><td>Payment processing (PCI-DSS Level 1)</td><td>Name, email, phone, amount, billing address</td></tr>
                  <tr><td><strong className="text-foreground">VdoCipher</strong></td><td>DRM-protected video streaming</td><td>User ID, device identifier, playback events</td></tr>
                  <tr><td><strong className="text-foreground">MSG91</strong></td><td>OTP delivery (login)</td><td>Phone number</td></tr>
                  <tr><td><strong className="text-foreground">Brevo</strong></td><td>Transactional + marketing email</td><td>Name, email, message body</td></tr>
                  <tr><td><strong className="text-foreground">Interakt</strong></td><td>WhatsApp Business API</td><td>Phone number, message body</td></tr>
                  <tr><td><strong className="text-foreground">Sentry</strong></td><td>Crash + error reporting</td><td>User ID, error stack traces, device + OS</td></tr>
                  <tr><td><strong className="text-foreground">Microsoft Clarity</strong></td><td>Session-replay heatmaps (anonymous)</td><td>Pseudonymous session, page interactions</td></tr>
                  <tr><td><strong className="text-foreground">Google Analytics 4</strong></td><td>Aggregate website analytics</td><td>Pseudonymous session, page views</td></tr>
                  <tr><td><strong className="text-foreground">Meta (Facebook) Pixel + CAPI</strong></td><td>Ad attribution + retargeting</td><td>Hashed email + phone, event metadata</td></tr>
                  <tr><td><strong className="text-foreground">X (Twitter) Pixel</strong></td><td>Ad attribution</td><td>Pseudonymous session, event metadata</td></tr>
                  <tr><td><strong className="text-foreground">Apple App Store / Google Play</strong></td><td>App distribution + crash reports</td><td>Device identifier, OS version, in-app events</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We may also disclose your data if required by a lawful order from a court or government authority,
              or to protect the rights, property, or safety of LevelUp, our users, or the public.
            </p>
          </section>

          <section id="tracking" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies, analytics, and tracking</h2>
            <p className="mb-3">
              On the web, we use first-party cookies to keep you signed in and to remember your preferences.
              We use third-party analytics + advertising cookies (Meta, Google, X, Microsoft Clarity) to
              understand how our Services are used and to attribute ad spend.
            </p>
            <p className="mb-3">
              <strong className="text-foreground">On iOS:</strong> per Apple's App Tracking Transparency (ATT)
              framework, our iOS app will ask for your explicit permission before using your device's
              advertising identifier (IDFA) for cross-app tracking. You can decline; we'll still serve you
              the same content and features.
            </p>
            <p>
              <strong className="text-foreground">On Android:</strong> the app does not access your device's
              Google Advertising ID (GAID) and requests no advertising-ID permission. The analytics and
              ad-attribution tools listed above run inside the app's in-app web view and rely on cookies, which
              you can clear in your device settings. You can also reset or delete your advertising ID from your
              Android privacy settings.
            </p>
          </section>

          <section id="data-retention" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Data retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Active account data:</strong> retained for as long as your account is open.</li>
              <li><strong className="text-foreground">After account deletion:</strong> personal data is erased within 30 days, except records we are legally required to keep (e.g. tax + GST invoices, retained 8 financial years under Indian law).</li>
              <li><strong className="text-foreground">Backups:</strong> personal data in encrypted backups is overwritten on a 30-day rolling cycle.</li>
              <li><strong className="text-foreground">Analytics:</strong> anonymous + aggregate metrics may be retained indefinitely.</li>
            </ul>
          </section>

          <section id="data-location" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Where your data is stored</h2>
            <p>
              Your primary account + content data is stored on Supabase infrastructure in the{" "}
              <strong>Asia Pacific (Tokyo)</strong> region. Some processors operate globally (Razorpay in India;
              Sentry, Vercel CDN, and the analytics platforms across the US/EU). Where data is transferred outside
              India, we rely on the data-protection commitments built into each processor's terms.
            </p>
          </section>

          <section id="your-rights" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Your rights</h2>
            <div className="bg-muted/50 border-l-2 border-primary p-4 rounded">
              <p className="mb-3 text-foreground font-medium text-sm">Under the DPDP Act (India) and applicable laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (see section 9 below)</li>
                <li>Withdraw consent for marketing communications at any time (one-click unsubscribe)</li>
                <li>Request a copy of your data in a portable, machine-readable format</li>
                <li>Nominate another individual to exercise these rights on your behalf in case of incapacity or death</li>
                <li>Lodge a grievance with our Grievance Officer (section 14) or India's Data Protection Board</li>
              </ul>
            </div>
            <p className="mt-4">
              To exercise any of these rights, email{" "}
              <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline">admin@leveluplearning.in</a>{" "}
              or use the in-app controls described in the next section. We'll respond within 30 days.
            </p>
          </section>

          <section id="account-deletion" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Account deletion</h2>
            <p className="mb-3">
              You can permanently delete your account and all associated personal data at any time. We
              comply with Apple's App Store Review Guideline 5.1.1(v) and Google Play's Account Deletion
              policy.
            </p>
            <p className="mb-3"><strong className="text-foreground">In-app (web + iOS + Android):</strong></p>
            <ol className="list-decimal pl-6 space-y-1 mb-4">
              <li>Sign in at <a className="text-primary hover:underline" href="https://app.leveluplearning.in/profile">app.leveluplearning.in/profile</a> (or open the app and tap Profile).</li>
              <li>Scroll to <em>Account → Delete my account</em>.</li>
              <li>Confirm. Your account is deactivated immediately and erased within 30 days.</li>
            </ol>
            <p className="mb-3">
              <strong className="text-foreground">By email:</strong> send a deletion request from your registered
              email address to{" "}
              <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline">admin@leveluplearning.in</a>{" "}
              with the subject "Delete my account". We'll confirm within 7 days and complete deletion within 30.
            </p>
            <p>
              <strong className="text-foreground">What gets deleted:</strong> your profile, contact info, payment
              method tokens, course progress, notes, community posts, submissions, peer reviews, certificates.
              <br />
              <strong className="text-foreground">What we retain</strong> (only to comply with Indian tax law):
              transaction records + GST invoices, kept for 8 financial years and then permanently deleted.
            </p>
          </section>

          <section id="data-security" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Data security</h2>
            <p>
              We take commercially reasonable steps to protect your personal data: TLS 1.3 in transit, AES-256
              encryption at rest (Supabase + Vercel + Razorpay), Postgres Row-Level Security so users only see
              their own data, bcrypt-hashed API keys, audit logging on admin actions, mandatory 2FA on all
              administrative accounts, and quarterly access reviews.
            </p>
          </section>

          <section id="data-breach" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Data breach notification</h2>
            <p>
              If we discover a personal-data breach that creates a risk of harm to you, we will notify the
              India Data Protection Board and the affected users without undue delay, as required by the
              DPDP Act, 2023. Notifications will be sent to your registered email address.
            </p>
          </section>

          <section id="children-privacy" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Children's privacy</h2>
            <p className="mb-3">
              Our Services are aimed at adult learners (18+).
            </p>
            <p>
              <strong className="text-foreground">For users in India:</strong> per the DPDP Act, anyone under 18
              is treated as a "child". We do not knowingly process the personal data of any individual under 18
              without verifiable parental consent. If you believe a child has registered without consent, please
              contact us immediately and we will delete the data.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">For users outside India:</strong> we do not knowingly collect
              data from anyone under 13 (Children's Online Privacy Protection Act, US).
            </p>
          </section>

          <section id="updates-policy" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we'll update the "Last updated"
              date at the top and, for material changes, notify you by email at least 14 days before the change
              takes effect. Continued use of the Services after the effective date constitutes acceptance.
            </p>
          </section>

          <section id="grievance" className="border-b border-border pb-8 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">14. Grievance officer (DPDP Act, India)</h2>
            <div className="bg-muted/50 border-l-2 border-primary p-4 rounded">
              <p className="mb-2 text-foreground"><strong>Grievance Officer:</strong> Rahul Reddy</p>
              <p className="mb-2 text-foreground"><strong>Email:</strong> <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline">admin@leveluplearning.in</a></p>
              <p className="mb-2 text-foreground"><strong>Postal address:</strong> Old no.9 New no.17, Seethammal Rd, Seethammal Colony, Alwarpet, Chennai, Tamil Nadu 600018</p>
              <p className="text-sm">We acknowledge grievances within 7 days and resolve them within 30 days. If unresolved, you may escalate to the Data Protection Board of India.</p>
            </div>
          </section>

          <section id="contact-us">
            <h2 className="text-xl font-semibold text-foreground mb-3">15. Contact us</h2>
            <div className="bg-muted/50 border-l-2 border-primary p-4 rounded">
              <p className="text-foreground text-sm">For general privacy questions or to exercise your rights:</p>
              <p className="mt-2">
                <a href="mailto:admin@leveluplearning.in" className="text-primary hover:underline font-medium">admin@leveluplearning.in</a>
              </p>
              <p className="text-foreground text-sm mt-3">For general support:</p>
              <p className="mt-1">
                <a href="mailto:support@leveluplearning.in" className="text-primary hover:underline font-medium">support@leveluplearning.in</a>
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

export default PrivacyPolicy;
