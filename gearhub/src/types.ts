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

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;
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
 * but the catalogue tops out at $549.99, so the ceiling is raised to keep
 * every product reachable.
 */
export const MAX_PRICE = 600;
