/**
 * Microsoft Clarity custom event helpers.
 * Clarity must be loaded via index.html before these fire.
 */

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Fire a Clarity custom event (tag). */
export function clarityEvent(name: string, value?: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", name, value ?? name);
  }
}

/** Track a CTA click with section context. */
export function trackCTAClick(section: string, label?: string) {
  clarityEvent("cta_click", `${section}${label ? ` | ${label}` : ""}`);
}

/** Track a navigation click. */
export function trackNavClick(label: string) {
  clarityEvent("nav_click", label);
}

/** Track a section becoming visible (scroll into view). */
export function trackSectionView(section: string) {
  clarityEvent("section_view", section);
}
