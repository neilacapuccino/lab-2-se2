import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { State } from '../types';
import type { Action } from './actions';

/**
 * The context carries both halves of `useReducer`: the current state and the
 * `dispatch` that replaces it. `dispatch` is typed as `Dispatch<Action>` rather
 * than left loose, so a component that dispatches something the reducer does not
 * handle fails to compile.
 *
 * The context object and its hook live in this plain module, apart from the
 * provider component, because a file that exports both a component and other
 * values cannot take part in fast refresh.
 */
export interface AppStateContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextValue | null>(null);

/**
 * Reads the app state. Throws rather than handing back a hollow default when it
 * is called outside the provider — a missing provider is a wiring mistake, and
 * failing loudly at the first render beats a screen that silently shows nothing.
 */
// useAppState :: () -> AppStateContextValue
export function useAppState(): AppStateContextValue {
  const value = useContext(AppStateContext);

  if (!value) {
    throw new Error('useAppState must be called inside an AppStateProvider');
  }

  return value;
}
