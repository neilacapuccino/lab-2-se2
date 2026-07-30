import type { CartItem, Filters, Product, Query, SortBy } from '../types';

/**
 * Pure helpers for turning the catalogue into what the grid shows. Each takes
 * its inputs as arguments and returns a new value, mutating nothing.
 */

// countByCategory :: [Product] -> Record String Number
export function countByCategory(products: Product[]): Record<string, number> {
  return products.reduce<Record<string, number>>(
    (counts, product) => ({
      ...counts,
      [product.category]: (counts[product.category] ?? 0) + 1,
    }),
    {},
  );
}

/* ---------- pricing ---------- */

// formatPrice :: Number -> String
export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

/** The struck-through "was" price. Derived, so the two figures cannot drift. */
// listPrice :: Product -> Number
export const listPrice = (product: Product): number =>
  Math.round((product.price / (1 - product.discount / 100)) * 100) / 100;

/* ---------- cart totals ---------- */

/* Take the items to total as an argument, so the same functions serve a live
   cart and a completed order's receipt. */

// cartCount :: [CartItem] -> Number
export const cartCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

// cartSubtotal :: [CartItem] -> Number
export const cartSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

/** What the shopper pays. Equals the subtotal while shipping is free; kept
    separate so a shipping or tax line has one place to go. */
// cartGrandTotal :: [CartItem] -> Number
export const cartGrandTotal = (items: CartItem[]): number => cartSubtotal(items);

/* ---------- stock ---------- */

// cartQuantity :: [CartItem] -> String -> Number
export const cartQuantity = (cart: CartItem[], id: string): number =>
  cart.find((item) => item.id === id)?.quantity ?? 0;

/** What the grid counts down; the cart keeps showing the quantity taken. */
// remainingStock :: Product -> [CartItem] -> Number
export const remainingStock = (product: Product, cart: CartItem[]): number =>
  Math.max(0, product.stock - cartQuantity(cart, product.id));

// isSoldOut :: Product -> [CartItem] -> Boolean
export const isSoldOut = (product: Product, cart: CartItem[]): boolean =>
  remainingStock(product, cart) === 0;

/* ---------- filtering ---------- */

// normalise :: String -> String
const normalise = (value: string): string => value.trim().toLowerCase();

// matchesSearch :: String -> Product -> Boolean
const matchesSearch = (query: string) => (product: Product) =>
  product.name.toLowerCase().includes(normalise(query));

/** Empty or 'All' keeps everything; anything else keeps those categories. */
// matchesCategories :: [String] -> Product -> Boolean
const matchesCategories = (categories: string[]) => (product: Product) =>
  categories.length === 0 ||
  categories.includes('All') ||
  categories.includes(product.category);

/** Zero is "any", so the far-left slider position widens rather than empties. */
// withinBudget :: Number -> Product -> Boolean
const withinBudget = (maxPrice: number) => (product: Product) =>
  maxPrice === 0 || product.price <= maxPrice;

// matchesViews :: Query -> Product -> Boolean
const matchesViews = (query: Query) => (product: Product) => {
  if (query.views.wishlistOnly && !query.wishlist.includes(product.id)) return false;
  if (query.views.soldOnly && !isSoldOut(product, query.cart)) return false;
  return true;
};

// filterProducts :: Query -> [Product] -> [Product]
export function filterProducts(query: Query, products: Product[]): Product[] {
  return products
    .filter(matchesSearch(query.filters.searchQuery))
    .filter(matchesCategories(query.categories))
    .filter(withinBudget(query.filters.maxPrice))
    .filter(matchesViews(query));
}

/* ---------- ordering ---------- */

/**
 * 0 when the name opens with the term, 1 when a later word does, 2 when it only
 * appears inside — so "zo" puts "Zone Wireless" above "Razer Basilisk".
 */
// searchRank :: String -> Product -> Number
const searchRank = (query: string) => (product: Product): number => {
  const term = normalise(query);
  const name = product.name.toLowerCase();

  if (name.startsWith(term)) return 0;
  if (name.split(/\s+/).some((word) => word.startsWith(term))) return 1;
  return 2;
};

// sortProducts :: SortBy -> [Product] -> [Product]
export function sortProducts(sortBy: SortBy, products: Product[]): Product[] {
  // Copy first: sort() mutates in place, which would change the caller's array.
  const copy = [...products];

  switch (sortBy) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

/** An explicit sort wins; otherwise a search orders by match, and the rest
    keeps catalogue order. */
// orderProducts :: Filters -> [Product] -> [Product]
export function orderProducts(filters: Filters, products: Product[]): Product[] {
  const term = normalise(filters.searchQuery);

  if (filters.sortBy !== 'default' || term === '') {
    return sortProducts(filters.sortBy, products);
  }

  const rank = searchRank(term);
  return [...products].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
}

/* ---------- composition ---------- */

/** Whether anything is narrowing the catalogue. Nothing shows until something
    is, so opening the rail presents an empty list, not all 151 products. */
// hasActiveFilter :: Query -> Boolean
export function hasActiveFilter(query: Query): boolean {
  return (
    query.categories.length > 0 ||
    normalise(query.filters.searchQuery).length > 0 ||
    query.filters.maxPrice > 0 ||
    query.views.wishlistOnly ||
    query.views.soldOnly
  );
}

// visibleProducts :: Query -> [Product] -> [Product]
export function visibleProducts(query: Query, products: Product[]): Product[] {
  if (!hasActiveFilter(query)) return [];
  return orderProducts(query.filters, filterProducts(query, products));
}

/**
 * One product per category before any repeats, so the landing row is a
 * cross-section rather than the first N of the catalogue.
 *
 * Reads Math.random, so not pure — call behind useMemo or it reshuffles on
 * every state change.
 */
// pickFeatured :: [Product] -> Number -> [Product]
export function pickFeatured(products: Product[], count: number): Product[] {
  const shuffle = <T,>(items: T[]): T[] =>
    items
      .map((item) => ({ item, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map(({ item }) => item);

  const available = shuffle(products.filter((product) => product.inStock));

  const byCategory = available.reduce<Record<string, Product[]>>(
    (groups, product) => ({
      ...groups,
      [product.category]: [...(groups[product.category] ?? []), product],
    }),
    {},
  );

  const firstOfEach = shuffle(
    Object.values(byCategory)
      .map((group) => group[0])
      .filter(Boolean),
  );
  const remainder = available.filter((product) => !firstOfEach.includes(product));

  return [...firstOfEach, ...remainder].slice(0, count);
}
