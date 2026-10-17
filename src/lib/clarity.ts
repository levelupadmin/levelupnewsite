/**
 * Microsoft Clarity helpers.
 *
 * BaseLayout defines a queueing `window.clarity` stub in <head> and loads the
 * real Clarity script once the page is idle, so these calls are safe at any
 * time: early calls are queued and sent when Clarity arrives.
 *
 * Clarity has two kinds of custom data:
 * - tags (`clarity("set", key, value)`): filter recordings by key and value;
 * - events (`clarity("event", name)`): counted in Clarity's funnels and
 *   smart events.
 */

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Set a Clarity tag on the session. */
export function clarityEvent(name: string, value?: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("set", name, value ?? name);
  }
}

/** Record a Clarity custom event (counted in funnels). */
export function clarityCustomEvent(name: string) {
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", name);
  }
}

/** Track a CTA click with section context: a tag for filtering, an event for funnels. */
export function trackCTAClick(section: string, label?: string) {
  clarityEvent("cta_click", `${section}${label ? ` | ${label}` : ""}`);
  clarityCustomEvent("cta_click");
}

/** Track a navigation click. */
export function trackNavClick(label: string) {
  clarityEvent("nav_click", label);
}

/** Track a section becoming visible (scroll into view). */
export function trackSectionView(section: string) {
  clarityEvent("section_view", section);
}
