export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; // url to the product's image
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

/**
 * The spec's State interface lists sortBy as 'default' | 'price-asc' | 'price-desc',
 * but the feature list also asks to "sort products by price (low-to-high,
 * high-to-low) or title". 'title' is included here so both can be satisfied.
 */
export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'title';

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
  'Cases',
  'Cables',
  'Keyboards',
  'Mice',
] as const;

/** Upper bound of the price range slider, matching the design's "Max: $250". */
export const MAX_PRICE = 250;
