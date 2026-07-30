import { useCallback, useSyncExternalStore } from 'react';

/**
 * Whether a CSS media query matches, re-rendering when it changes. The layout
 * needs this in JavaScript because opening one panel has to close the other on
 * a narrow viewport — a state decision, not just a stylesheet one.
 *
 * `useSyncExternalStore` is the hook for reading a value that lives outside
 * React; an effect copying into `useState` renders once with a stale value.
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

  // No server render here, but the argument is required. Narrow is the safer
  // assumption: it floats the panels rather than reserving space for them.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Wide enough to show the sidebar, grid and cart side by side, as in the design. */
export const WIDE_LAYOUT = '(min-width: 1280px)';
