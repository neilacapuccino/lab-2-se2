import { MAX_PRICE, SALE_MULTIPLIER } from '../types';
import type { CartItem, Filters, Product, SortBy, ViewFlags } from '../types';

/**
 * Pure helpers for turning the catalogue into what the grid should show.
 *
 * Every function takes its inputs as arguments and returns a new value; nothing
 * reads outside state and nothing mutates its arguments, so each can be reasoned
 * about and tested on its own.
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

/** The "was" price everything is discounted from. */
// listPrice :: Number -> Number
export const listPrice = (price: number): number =>
  Math.round(price * SALE_MULTIPLIER * 100) / 100;

// discountPercent :: Number -> Number
export const discountPercent = (price: number): number =>
  Math.round((1 - price / listPrice(price)) * 100);

/* ---------- stock ---------- */

// cartQuantity :: [CartItem] -> String -> Number
export const cartQuantity = (cart: CartItem[], id: string): number =>
  cart.find((item) => item.id === id)?.quantity ?? 0;

/**
 * Units still available once what is already in the cart is accounted for. This
 * is what the grid counts down; the cart itself keeps showing the quantity taken.
 */
// remainingStock :: Product -> [CartItem] -> Number
export const remainingStock = (product: Product, cart: CartItem[]): number =>
  Math.max(0, product.stock - cartQuantity(cart, product.id));

// isSoldOut :: Product -> [CartItem] -> Boolean
export const isSoldOut = (product: Product, cart: CartItem[]): boolean =>
  remainingStock(product, cart) === 0;

/* ---------- filtering ---------- */

// matchesSearch :: String -> Product -> Boolean
const matchesSearch = (query: string) => (product: Product) =>
  product.name.toLowerCase().includes(query.trim().toLowerCase());

/**
 * An empty selection means nothing has been picked yet — the landing view. The
 * literal 'All' entry keeps every product; any other entries keep only those
 * categories.
 */
// matchesCategories :: [String] -> Product -> Boolean
const matchesCategories = (categories: string[]) => (product: Product) =>
  categories.length === 0 ||
  categories.includes('All') ||
  categories.includes(product.category);

// withinBudget :: Number -> Product -> Boolean
const withinBudget = (maxPrice: number) => (product: Product) =>
  product.price <= maxPrice;

export interface ViewContext {
  cart: CartItem[];
  wishlist: string[];
  views: ViewFlags;
}

// matchesViews :: ViewContext -> Product -> Boolean
const matchesViews = (ctx: ViewContext) => (product: Product) => {
  if (ctx.views.wishlistOnly && !ctx.wishlist.includes(product.id)) return false;
  if (ctx.views.soldOnly && !isSoldOut(product, ctx.cart)) return false;
  return true;
};

// filterProducts :: Filters -> [String] -> ViewContext -> [Product] -> [Product]
export function filterProducts(
  filters: Filters,
  categories: string[],
  ctx: ViewContext,
  products: Product[],
): Product[] {
  return products
    .filter(matchesSearch(filters.searchQuery))
    .filter(matchesCategories(categories))
    .filter(withinBudget(filters.maxPrice))
    .filter(matchesViews(ctx));
}

/* ---------- sorting ---------- */

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
    case 'stock':
      // Most stock first, so anything nearly gone drops to the bottom.
      return copy.sort((a, b) => b.stock - a.stock || a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

/* ---------- composition ---------- */

/**
 * The grid stays empty until the shopper narrows things down — a category, a
 * search term, or one of the view filters.
 */
// hasQuery :: Filters -> [String] -> ViewFlags -> Boolean
export function hasQuery(
  filters: Filters,
  categories: string[],
  views: ViewFlags,
): boolean {
  return (
    categories.length > 0 ||
    filters.searchQuery.trim().length > 0 ||
    filters.maxPrice < MAX_PRICE ||
    views.wishlistOnly ||
    views.soldOnly
  );
}

// visibleProducts :: Filters -> [String] -> ViewContext -> [Product] -> [Product]
export function visibleProducts(
  filters: Filters,
  categories: string[],
  ctx: ViewContext,
  products: Product[],
): Product[] {
  if (!hasQuery(filters, categories, ctx.views)) return [];
  return sortProducts(filters.sortBy, filterProducts(filters, categories, ctx, products));
}

/**
 * Picks a varied handful of products for the landing page: one from each
 * category before any category repeats, so the row is a cross-section of the
 * shop rather than the first N rows of the catalogue.
 *
 * Note: reads Math.random, so it is not pure. Call it once behind useMemo, or the
 * selection reshuffles on every state change.
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
