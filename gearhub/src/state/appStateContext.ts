import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { State } from '../types';
import type { Action } from './actions';

/**
 * Carries both halves of `useReducer`. `dispatch` is typed `Dispatch<Action>`,
 * so dispatching something the reducer does not handle fails to compile.
 *
 * Kept apart from the provider component: a file exporting both a component and
 * other values cannot take part in fast refresh.
 */
export interface AppStateContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppStateContext = createContext<AppStateContextValue | null>(null);

/** Throws outside the provider — a missing provider is a wiring mistake. */
// useAppState :: () -> AppStateContextValue
export function useAppState(): AppStateContextValue {
  const value = useContext(AppStateContext);

  if (!value) {
    throw new Error('useAppState must be called inside an AppStateProvider');
  }

  return value;
}
