import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reports whether a CSS media query currently matches, and re-renders when that
 * changes.
 *
 * The layout needs this in JavaScript, not just CSS: when the viewport is too
 * narrow to hold the grid alongside both panels, opening one panel has to close
 * the other. That is a state decision, so the breakpoint has to be readable from
 * the component rather than only from a stylesheet.
 *
 * `useSyncExternalStore` is the hook meant for exactly this — reading a value
 * that lives outside React. Subscribing in an effect and copying the result into
 * `useState` would work too, but it renders once with a stale value first.
 */
// useMediaQuery :: String -> Boolean
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onStoreChange);
      return () => list.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // There is no server render here, but the third argument is required; a narrow
  // viewport is the safer assumption, since it floats the panels rather than
  // reserving space for them.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Wide enough to show the sidebar, grid and cart side by side, as in the design. */
export const WIDE_LAYOUT = '(min-width: 1280px)';
