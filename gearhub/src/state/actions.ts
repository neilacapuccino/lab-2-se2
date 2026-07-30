import type { Product, SortBy, ViewFlags } from '../types';

/**
 * Every way the state is allowed to change. The first eight are the brief's,
 * with its payloads; the rest are additions listed features need.
 */
export type Action =
  // ---- specified by the brief ----
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_SORT'; payload: SortBy }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  // ---- additions ----
  /** "Filter by max price range" is a listed feature with no action of its own. */
  | { type: 'SET_MAX_PRICE'; payload: number }
  /** Adds or removes one category from the sidebar's multi-selection. */
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  /** Returns every filter, the category selection and both views to defaults. */
  | { type: 'RESET_FILTERS' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'TOGGLE_VIEW'; payload: keyof ViewFlags }
  | { type: 'TOGGLE_FILTERS'; payload?: boolean }
  /** The simulated checkout: banks the cart as a receipt and empties it. */
  | { type: 'CHECKOUT' }
  | { type: 'DISMISS_NOTICE' };

/* ---------- action creators ---------- */

/* Dispatched instead of inline object literals, so a mistyped action type is a
   compile error in one place rather than a silent no-op at the call site. */

// addToCart :: Product -> Action
export const addToCart = (product: Product): Action => ({
  type: 'ADD_TO_CART',
  payload: product,
});

// removeFromCart :: String -> Action
export const removeFromCart = (id: string): Action => ({
  type: 'REMOVE_FROM_CART',
  payload: id,
});

// updateQuantity :: String -> Number -> Action
export const updateQuantity = (id: string, quantity: number): Action => ({
  type: 'UPDATE_QUANTITY',
  payload: { id, quantity },
});

// clearCart :: () -> Action
export const clearCart = (): Action => ({ type: 'CLEAR_CART' });

// setSearchQuery :: String -> Action
export const setSearchQuery = (searchQuery: string): Action => ({
  type: 'SET_SEARCH_QUERY',
  payload: searchQuery,
});

// setCategory :: String -> Action
export const setCategory = (category: string): Action => ({
  type: 'SET_CATEGORY',
  payload: category,
});

// setSort :: SortBy -> Action
export const setSort = (sortBy: SortBy): Action => ({
  type: 'SET_SORT',
  payload: sortBy,
});

// toggleCart :: Maybe Boolean -> Action
export const toggleCart = (open?: boolean): Action => ({
  type: 'TOGGLE_CART',
  payload: open,
});

// setMaxPrice :: Number -> Action
export const setMaxPrice = (maxPrice: number): Action => ({
  type: 'SET_MAX_PRICE',
  payload: maxPrice,
});

// toggleCategory :: String -> Action
export const toggleCategory = (category: string): Action => ({
  type: 'TOGGLE_CATEGORY',
  payload: category,
});

// resetFilters :: () -> Action
export const resetFilters = (): Action => ({ type: 'RESET_FILTERS' });

// toggleWishlist :: String -> Action
export const toggleWishlist = (id: string): Action => ({
  type: 'TOGGLE_WISHLIST',
  payload: id,
});

// toggleView :: (keyof ViewFlags) -> Action
export const toggleView = (key: keyof ViewFlags): Action => ({
  type: 'TOGGLE_VIEW',
  payload: key,
});

// toggleFilters :: Maybe Boolean -> Action
export const toggleFilters = (open?: boolean): Action => ({
  type: 'TOGGLE_FILTERS',
  payload: open,
});

// checkout :: () -> Action
export const checkout = (): Action => ({ type: 'CHECKOUT' });

// dismissNotice :: () -> Action
export const dismissNotice = (): Action => ({ type: 'DISMISS_NOTICE' });
