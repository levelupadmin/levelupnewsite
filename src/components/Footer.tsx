import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { m } from "framer-motion";
import { useParallax } from "@/hooks/use-parallax";
import levelupLogo from "@/assets/levelup-logo.svg";

const footerLinks = {
  Learn: [
    { label: "Masterclasses", href: "#masterclasses" },
    { label: "LevelUp Live", href: "#live-programs" },
    { label: "The Forge", href: "#forge" },
    { label: "Student Stories", href: "/student-stories" },
  ],
  Company: [
    { label: "Careers", href: "https://www.leveluplearning.in/contact-us" },
    { label: "Press", href: "https://www.leveluplearning.in/contact-us" },
    { label: "Blog", href: "https://www.leveluplearning.in/contact-us" },
  ],
  Support: [
    { label: "FAQs", href: "#faq" },
    { label: "Contact Us", href: "https://api.whatsapp.com/send?phone=919791520177&text=Hi" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/leveluplearning.in/" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@leveluplearning" },
  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/levelup_Lrng" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/levelup-learning-india/" },
];

const Footer = () => {
  const { ref: watermarkRef, y: watermarkY } = useParallax({ speed: -0.05 });

  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden border-t border-border"
    >
      {/* Amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img
                src={levelupLogo}
                alt="LevelUp Learning"
                className="h-16 w-auto"
                decoding="async"
              />
            </div>
            <p className="font-sans-body text-sm text-muted-foreground leading-relaxed mb-6 max-w-[260px]">
              A creative education ecosystem for serious creators.
            </p>
            <a
              href="mailto:hello@leveluplearning.com"
              className="font-sans-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              hello@leveluplearning.com
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-sans-body text-xs font-medium uppercase tracking-widest text-primary mb-5">
                {category}
              </h4>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans-body text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center md:justify-start gap-5 md:gap-4 mt-14">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex items-center justify-center w-11 h-11 md:w-10 md:h-10 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-300"
            >
              <social.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
          <p className="font-sans-body text-xs text-muted-foreground">
            © 2026 LevelUp Learning. All rights reserved.
          </p>
          <div className="flex items-center gap-8 md:gap-6">
            <a href="/terms" className="font-sans-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Terms
            </a>
            <a href="/privacy-policy" className="font-sans-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/privacy-policy" className="font-sans-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>

      <m.div
        ref={watermarkRef}
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 left-0 right-0 translate-y-[35%] pointer-events-none select-none"
        style={{ y: watermarkY }}
      >
        <img
          src={levelupLogo}
          alt=""
          className="w-full h-auto opacity-[0.03]"
          decoding="async"
        />
      </m.div>
    </footer>
  );
};

export default Footer;
