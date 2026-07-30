export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; // url to the product's image
  inStock: boolean;
  /**
   * Units available. Additive to the interface the brief specifies — `inStock`
   * is kept and stays consistent with this (`inStock === stock > 0`), so the
   * mandated shape is intact while the cart can enforce a per-product ceiling.
   */
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/**
 * The spec's State interface lists sortBy as 'default' | 'price-asc' | 'price-desc',
 * but the feature list also asks to "sort products by price (low-to-high,
 * high-to-low) or title". 'title' is included here so both can be satisfied.
 */
export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'title' | 'stock';

/** Extra views layered on top of the category selection. */
export interface ViewFlags {
  wishlistOnly: boolean;
  soldOnly: boolean;
}

/** Everything is on sale; the struck-through "was" price is derived from this. */
export const SALE_MULTIPLIER = 1.28;


export interface Filters {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: SortBy;
}

/**
 * The whole of the application state.
 *
 * The four keys the brief mandates — `products`, `cart`, `filters`,
 * `isCartOpen` — are kept exactly as specified. The keys below them are
 * additions, listed separately so the mandated shape stays readable. They live
 * here rather than in component `useState` because the brief requires state
 * management to rely entirely on `useReducer` with `createContext`; anything
 * two components both need has to be reachable from the reducer.
 */
export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;

  /**
   * The sidebar allows several categories at once, which `filters.category`
   * (a single string) cannot express. `filters.category` is kept in step:
   * one named pick shows that category, none or several fall back to "All".
   */
  selectedCategories: string[];
  /** Product ids the shopper has hearted. Not in the brief; a requested extra. */
  wishlist: string[];
  /** Wishlist / sold-out views, kept out of the fixed four-key `filters`. */
  views: ViewFlags;
  /** Whether the left filter rail is showing. */
  isFilterOpen: boolean;
  /** The completed order, held so the drawer can show a receipt after checkout. */
  receipt: CartItem[] | null;
  /** Transient message, e.g. when an add is refused for want of stock. */
  notice: string | null;
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
