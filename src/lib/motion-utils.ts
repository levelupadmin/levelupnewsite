import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

export function useIsAboveMd(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
