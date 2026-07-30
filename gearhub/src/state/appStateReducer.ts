import { products } from '../data/products';
import type { CartItem, Filters, State } from '../types';
import { cartQuantity } from '../utils/productUtils';
import type { Action } from './actions';

/**
 * The single source of truth for how state changes.
 *
 * Pure: reads nothing outside its two arguments, mutates neither, and builds
 * every result with spreads and `map`/`filter`. Impure work stays out — the
 * media-query breakpoint is read in the component layer, the random stock and
 * discount rolls happen once in `data/products.ts`.
 */

const initialFilters: Filters = {
  searchQuery: '',
  category: 'All',
  maxPrice: 0, // "any" — see the note on Filters.maxPrice
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
  isBrowsing: false,
};

/* ---------- pure helpers ---------- */

// toggleMembership :: [String] -> String -> [String]
const toggleMembership = (list: string[], value: string): string[] =>
  list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];

/** "All" is exclusive both ways. An empty result means no category filter. */
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
     * Adds or increments, and refuses once the cart holds every unit. Stock is
     * read from `state.products`, not the payload, so a doctored product cannot
     * raise the ceiling.
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
     * Sets an exact quantity. Zero removes the line; above stock is refused with
     * a message rather than clamped silently, so the shopper learns why.
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

    /* The brief also has this reset a promo code, but the State it gives has no
       promo field and the app has no promo entry — nothing further to clear. */
    case 'CLEAR_CART':
      return { ...state, cart: [], notice: null };

    /* Every filter below also sets `isBrowsing`, moving the shopper off the
       landing page and onto the results grid. */

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload },
        isBrowsing: true,
      };

    /** The nav dropdown is single-choice, so it replaces the whole selection. */
    case 'SET_CATEGORY':
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
        selectedCategories: [action.payload],
        isBrowsing: true,
      };

    case 'SET_SORT':
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };

    /** Closing the drawer also dismisses a receipt that is showing in it. */
    case 'TOGGLE_CART': {
      const isCartOpen =
        typeof action.payload === 'boolean' ? action.payload : !state.isCartOpen;

      return { ...state, isCartOpen, receipt: isCartOpen ? state.receipt : null };
    }

    /** Zero is the off position, so the switch and the slider share one field. */
    case 'SET_MAX_PRICE':
      return {
        ...state,
        filters: { ...state.filters, maxPrice: action.payload },
        isBrowsing: true,
      };

    /** Sidebar rows toggle in and out; `filters.category` follows the result. */
    case 'TOGGLE_CATEGORY': {
      const selectedCategories = nextCategories(state.selectedCategories, action.payload);

      return {
        ...state,
        selectedCategories,
        filters: { ...state.filters, category: categoryField(selectedCategories) },
        isBrowsing: true,
      };
    }

    /* Every filter at once, views included. Returns to the landing page, since
       nothing is left to show results for. */
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialFilters,
        selectedCategories: [],
        views: { wishlistOnly: false, soldOnly: false },
        isBrowsing: false,
      };

    case 'TOGGLE_WISHLIST':
      return { ...state, wishlist: toggleMembership(state.wishlist, action.payload) };

    case 'TOGGLE_VIEW':
      return {
        ...state,
        views: { ...state.views, [action.payload]: !state.views[action.payload] },
        isBrowsing: true,
      };

    /** Opening the rail is itself a decision to browse, so the grid takes over. */
    case 'TOGGLE_FILTERS': {
      const isFilterOpen =
        typeof action.payload === 'boolean' ? action.payload : !state.isFilterOpen;

      return { ...state, isFilterOpen, isBrowsing: isFilterOpen || state.isBrowsing };
    }

    /**
     * The cart becomes the receipt and is emptied, and the purchased units come
     * off `products` for good — otherwise emptying the cart hands the stock back
     * and a sold-out item looks available again the moment the order goes through.
     */
    case 'CHECKOUT': {
      if (state.cart.length === 0) return state;

      const remaining = state.products.map((product) => {
        const bought = cartQuantity(state.cart, product.id);
        if (bought === 0) return product;

        const stock = Math.max(0, product.stock - bought);
        return { ...product, stock, inStock: stock > 0 };
      });

      return {
        ...state,
        products: remaining,
        receipt: state.cart,
        cart: [],
        isCartOpen: true,
        notice: null,
      };
    }

    case 'DISMISS_NOTICE':
      return { ...state, notice: null };

    default:
      return state;
  }
}
