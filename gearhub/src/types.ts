export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; // url to the product's image
  inStock: boolean;
  /* The two below are additions; the brief's fields above are untouched. */

  /** Units available. Kept consistent with `inStock` (`inStock === stock > 0`). */
  stock: number;
  /** Percentage off, rolled per session. The "was" price derives from it. */
  discount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/**
 * The brief's union omits 'title', but its feature list asks to sort by it, so
 * both are covered. 'default' is catalogue order, or best match when searching.
 */
export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'title';

/** Extra views layered on top of the category selection. */
export interface ViewFlags {
  wishlistOnly: boolean;
  soldOnly: boolean;
}


export interface Filters {
  searchQuery: string;
  category: string;
  /**
   * Price ceiling, in steps of 5. **Zero means "any"**, not "nothing under $0" —
   * the far-left slider position would otherwise empty the grid. Zero doubles as
   * the off position, so the switch is just `maxPrice > 0` and needs no field.
   */
  maxPrice: number;
  sortBy: SortBy;
}

/**
 * Everything the pure filter/sort helpers need, in one argument — otherwise each
 * takes four or five positional parameters that must stay in order at every call.
 */
export interface Query {
  filters: Filters;
  /** Empty means no category filter; 'All' means every category. */
  categories: string[];
  views: ViewFlags;
  wishlist: string[];
  cart: CartItem[];
}

/**
 * The whole of the application state. The brief's four keys come first, exactly
 * as specified; the rest are additions. They live in the reducer rather than in
 * component `useState` because the brief requires state management to rely
 * entirely on `useReducer` with `createContext`.
 */
export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;

  /**
   * The sidebar allows several categories at once, which the single-string
   * `filters.category` cannot express. That field is kept in step: one named
   * pick shows that category, none or several fall back to "All".
   */
  selectedCategories: string[];
  /** Product ids the shopper has hearted. A requested extra, not in the brief. */
  wishlist: string[];
  /** Wishlist / sold-out views, kept out of the fixed four-key `filters`. */
  views: ViewFlags;
  /** Whether the left filter rail is showing. */
  isFilterOpen: boolean;
  /** The completed order, so the drawer can show a receipt after checkout. */
  receipt: CartItem[] | null;
  /** Transient message, e.g. when an add is refused for want of stock. */
  notice: string | null;
  /** Featured view versus results grid. True once any filter or the rail opens. */
  isBrowsing: boolean;
}

export const CATEGORIES = [
  'All',
  'Headphones',
  'Chargers',
  'Speakers',
  'Keyboards',
  'Mice',
  'Microphones',
  'Webcams',
  'Routers',
] as const;

/**
 * Upper bound of the price range slider. The design labels this "Max: $250",
 * but the catalogue tops out at $599, so the ceiling is raised to keep every
 * product reachable.
 */
export const MAX_PRICE = 600;
