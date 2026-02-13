import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink, NavItem } from "./navbarData";

const DEFAULT_ACCENT = "hsl(24 95% 53%)";

interface NavbarMobileMenuProps {
  links: (NavLink | { label: string; href: string; description: string; items: NavItem[] })[];
  onClose: () => void;
}

const NavbarMobileMenu = ({ links, onClose }: NavbarMobileMenuProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 flex flex-col h-full pt-20 pb-8 px-5 overflow-y-auto">
        {links.map((link, index) => {
          const hasItems = link.items.length > 0;
          const isExpanded = expandedIndex === index;
          const linkAccent = (link as NavLink).accent || DEFAULT_ACCENT;
          const badge = (link as NavLink).formatBadge;

          return (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + index * 0.05 }}
              className="border-b border-border/20"
            >
              {hasItems ? (
                <>
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between py-4 font-serif-display text-xl transition-colors duration-200"
                    style={{ color: isExpanded ? linkAccent : undefined }}
                  >
                    <span>{link.label}</span>
                    <motion.span animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-2xl leading-none transition-colors duration-200" style={{ color: isExpanded ? linkAccent : undefined }}>
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false} mode="wait">
                    {isExpanded && (
                      <motion.div
                        key={`mobile-expand-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.25, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        {link.description && (
                          <p className="font-sans-body text-xs mb-3 px-1" style={{ color: linkAccent, opacity: 0.6 }}>
                            {link.description}
                          </p>
                        )}
                        <div className="grid grid-cols-2 gap-2.5 pb-4 pl-3 border-l-2" style={{ borderColor: linkAccent + "33" }}>
                          {link.items.map((item, i) => (
                            <motion.a
                              key={item.title}
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.04 * i }}
                              onClick={onClose}
                              className="block rounded-sm overflow-hidden bg-white/5 active:bg-white/10 transition-colors"
                            >
                              <div className="aspect-[16/10] overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                              </div>
                              <div className="px-2.5 py-2">
                                <p className="font-serif-display text-sm text-foreground leading-tight">{item.title}</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <p className="font-sans-body text-[10px] text-muted-foreground">{item.subtitle}</p>
                                  {badge && (
                                    <span
                                      className="font-sans-body text-[8px] font-semibold uppercase tracking-wider px-1 py-0.5 rounded-full"
                                      style={{ color: linkAccent, backgroundColor: linkAccent.replace(")", " / 0.12)").replace("hsl(", "hsl(") }}
                                    >
                                      {badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className="block py-4 font-serif-display text-xl text-foreground"
                >
                  {link.label}
                </a>
              )}
            </motion.div>
          );
        })}

        <motion.a
          href="https://www.leveluplearning.in"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 + links.length * 0.05 }}
          onClick={onClose}
          className="mt-6 self-center font-sans-body text-base text-primary border border-primary/30 rounded-full px-6 py-2.5 active:bg-primary/10 transition-colors"
        >
          Sign In
        </motion.a>
      </div>
    </motion.div>
  );
};

export default NavbarMobileMenu;
