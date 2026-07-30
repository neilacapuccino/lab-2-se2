import { useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import { AppStateContext } from './appStateContext';
import { appStateReducer, initialState } from './appStateReducer';

/**
 * Holds the one `useReducer` the whole application shares and publishes it
 * through `AppStateContext`. Wrapped around the app in `main.tsx`.
 */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // `dispatch` is stable, so the value only needs rebuilding when state changes.
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
