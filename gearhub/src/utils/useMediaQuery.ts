import { useEffect, useState } from 'react';

/**
 * Reports whether a CSS media query currently matches, and re-renders when that
 * changes.
 *
 * The layout needs this in JavaScript, not just CSS: when the viewport is too
 * narrow to hold the grid alongside both panels, opening one panel has to close
 * the other. That is a state decision, so the breakpoint has to be readable from
 * the component rather than only from a stylesheet.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Wide enough to show the sidebar, grid and cart side by side, as in the design. */
export const WIDE_LAYOUT = '(min-width: 1280px)';
