import { products } from '../data/products';
import { MAX_PRICE } from '../types';
import type { CartItem, Filters, State } from '../types';
import { cartQuantity } from '../utils/productUtils';
import type { Action } from './actions';

/**
 * The single source of truth for how state changes.
 *
 * `appStateReducer` is a pure function: it reads nothing outside its two
 * arguments, mutates neither of them, and returns a fresh object built with
 * spreads and `map`/`filter`. Give it the same state and action and it returns
 * the same result every time, which is what makes the whole app's behaviour
 * testable without rendering anything.
 *
 * Anything that cannot be pure stays out: the media-query breakpoint that
 * decides whether both panels fit on screen is read in the component layer, and
 * the random stock roll happens once in `data/products.ts` at module load.
 */

const initialFilters: Filters = {
  searchQuery: '',
  category: 'All',
  maxPrice: MAX_PRICE,
  sortBy: 'default',
};

export const initialState: State = {
  products,
  cart: [],
  filters: initialFilters,
  isCartOpen: false,
  selectedCategories: [],
  wishlist: [],
  views: { wishlistOnly: false, soldOnly: false },
  isFilterOpen: false,
  receipt: null,
  notice: null,
};

/* ---------- pure helpers ---------- */

// toggleMembership :: [String] -> String -> [String]
const toggleMembership = (list: string[], value: string): string[] =>
  list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];

/**
 * "All" is exclusive: picking it drops the named categories, and picking a
 * named category drops "All". An empty result means no category filter.
 */
// nextCategories :: [String] -> String -> [String]
const nextCategories = (current: string[], category: string): string[] => {
  if (category === 'All') return current.includes('All') ? [] : ['All'];

  return current.includes(category)
    ? current.filter((entry) => entry !== category)
    : [...current.filter((entry) => entry !== 'All'), category];
};

/** Mirrors the multi-selection into the single-value field the brief defines. */
// categoryField :: [String] -> String
const categoryField = (categories: string[]): string =>
  categories.length === 1 ? categories[0] : 'All';

/* ---------- the reducer ---------- */

// appStateReducer :: State -> Action -> State
export function appStateReducer(state: State, action: Action): State {
  switch (action.type) {
    /**
     * Adds the product, or increments it when it is already a line item, and
     * refuses once the cart holds every unit that exists. The stock figure is
     * read from `state.products` rather than the payload, so the ceiling cannot
     * be raised by dispatching a doctored product.
     */
    case 'ADD_TO_CART': {
      const product =
        state.products.find((entry) => entry.id === action.payload.id) ?? action.payload;
      const held = cartQuantity(state.cart, product.id);

      if (held >= product.stock) {
        return {
          ...state,
          notice:
            product.stock === 0
              ? `${product.name} is out of stock.`
              : `Only ${product.stock} of ${product.name} available — all of them are already in your cart.`,
        };
      }

      const cart: CartItem[] =
        held === 0
          ? [...state.cart, { ...product, quantity: 1 }]
          : state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );

      return { ...state, cart, notice: null };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        notice: null,
      };

    /**
     * Sets an exact quantity. Zero or less removes the line item; more than the
     * product has in stock is refused with a message rather than clamped
     * silently, so the shopper learns why the number stopped moving.
     */
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.id !== id), notice: null };
      }

      const item = state.cart.find((entry) => entry.id === id);
      if (!item) return state;

      if (quantity > item.stock) {
        return { ...state, notice: `Only ${item.stock} of ${item.name} available.` };
      }

      return {
        ...state,
        cart: state.cart.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)),
        notice: null,
      };
    }

    /**
     * Empties the cart. The brief's action table also has this reset a promo
     * code, but the `State` interface it gives has no promo field and the app
     * has no promo entry, so there is nothing further to clear.
     */
    case 'CLEAR_CART':
      return { ...state, cart: [], notice: null };

    case 'SET_SEARCH_QUERY':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };

    /** The nav dropdown is single-choice, so it replaces the whole selection. */
    case 'SET_CATEGORY':
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
        selectedCategories: [action.payload],
      };

    case 'SET_SORT':
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };

    /** Closing the drawer also dismisses a receipt that is showing in it. */
    case 'TOGGLE_CART': {
      const isCartOpen =
        typeof action.payload === 'boolean' ? action.payload : !state.isCartOpen;

      return { ...state, isCartOpen, receipt: isCartOpen ? state.receipt : null };
    }

    case 'SET_MAX_PRICE':
      return { ...state, filters: { ...state.filters, maxPrice: action.payload } };

    /** Sidebar rows toggle in and out; `filters.category` follows the result. */
    case 'TOGGLE_CATEGORY': {
      const selectedCategories = nextCategories(state.selectedCategories, action.payload);

      return {
        ...state,
        selectedCategories,
        filters: { ...state.filters, category: categoryField(selectedCategories) },
      };
    }

    /** Every filter at once, including the two views the sidebar lists. */
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialFilters,
        selectedCategories: [],
        views: { wishlistOnly: false, soldOnly: false },
      };

    case 'TOGGLE_WISHLIST':
      return { ...state, wishlist: toggleMembership(state.wishlist, action.payload) };

    case 'TOGGLE_VIEW':
      return {
        ...state,
        views: { ...state.views, [action.payload]: !state.views[action.payload] },
      };

    case 'TOGGLE_FILTERS':
      return {
        ...state,
        isFilterOpen:
          typeof action.payload === 'boolean' ? action.payload : !state.isFilterOpen,
      };

    /**
     * The simulated checkout. The cart becomes the receipt and is emptied in one
     * step, so the drawer can show what was ordered after the fact.
     */
    case 'CHECKOUT':
      if (state.cart.length === 0) return state;

      return { ...state, receipt: state.cart, cart: [], isCartOpen: true, notice: null };

    case 'DISMISS_NOTICE':
      return { ...state, notice: null };

    default:
      return state;
  }
}
