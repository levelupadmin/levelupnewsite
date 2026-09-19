import MotionProvider from "./MotionProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Navbar and Footer for Astro pages that are not one big React island.
 *
 * Both use framer-motion's `m` components, which render at their `initial`
 * state and never animate unless a LazyMotion provider is above them. Mounted
 * bare from an .astro file the navbar stays at opacity 0, so it is invisible
 * on the page while still being present in the DOM. These wrappers carry the
 * provider with them.
 */

export function SiteNavbar() {
  return (
    <MotionProvider>
      <Navbar />
    </MotionProvider>
  );
}

export function SiteFooter() {
  return (
    <MotionProvider>
      <Footer />
    </MotionProvider>
  );
}
