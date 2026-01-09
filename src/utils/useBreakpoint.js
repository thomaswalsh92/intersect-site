import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../scss/breakpoints";

/**
 * useBreakpoint - returns true/false depending on screen width
 * @param {string} key - one of the BREAKPOINTS keys ('sm', 'md', etc.)
 * @param {string} direction - 'up' (min-width) or 'down' (max-width), default 'down'
 */
export function useBreakpoint(key, direction = "down") {
  const breakpoint = BREAKPOINTS[key];

  if (!breakpoint) {
    throw new Error(`Invalid breakpoint key: ${key}`);
  }

  const query =
    direction === "down"
      ? `(max-width: ${breakpoint - 1}px)`
      : `(min-width: ${breakpoint}px)`;

  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    listener(); // sync on mount
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
