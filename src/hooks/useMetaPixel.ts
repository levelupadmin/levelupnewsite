import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { META_PIXEL_ID } from "@/lib/constants";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export function useMetaPixel() {
  const location = useLocation();

  // Initialize pixel once
  useEffect(() => {
    if (window.fbq) return;

    const f = window;
    const b = document;
    const n = function (...args: unknown[]) {
      // eslint-disable-next-line prefer-spread
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    } as any;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [] as unknown[][];
    f.fbq = n;
    f._fbq = n;

    const s = b.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    b.head.appendChild(s);

    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);
}
