import type { Filters, Product } from '../types';

/**
 * Pure helpers for turning the catalogue into what the grid should show.
 *
 * Every function here takes its inputs as arguments and returns a new value —
 * nothing reads outside state and nothing mutates its arguments, so each one can
 * be reasoned about and tested on its own.
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

// matchesSearch :: String -> Product -> Boolean
const matchesSearch = (query: string) => (product: Product) =>
  product.name.toLowerCase().includes(query.trim().toLowerCase());

/**
 * An empty selection means nothing has been picked yet — the landing view. The
 * literal 'All' entry is a deliberate choice that keeps every product, and any
 * other entries keep only those categories.
 */
// matchesCategories :: [String] -> Product -> Boolean
const matchesCategories = (categories: string[]) => (product: Product) =>
  categories.length === 0 ||
  categories.includes('All') ||
  categories.includes(product.category);

// withinBudget :: Number -> Product -> Boolean
const withinBudget = (maxPrice: number) => (product: Product) =>
  product.price <= maxPrice;

// filterProducts :: Filters -> [String] -> [Product] -> [Product]
export function filterProducts(
  filters: Filters,
  categories: string[],
  products: Product[],
): Product[] {
  return products
    .filter(matchesSearch(filters.searchQuery))
    .filter(matchesCategories(categories))
    .filter(withinBudget(filters.maxPrice));
}

// sortProducts :: SortBy -> [Product] -> [Product]
export function sortProducts(sortBy: Filters['sortBy'], products: Product[]): Product[] {
  // Copy first: sort() mutates in place, which would change the caller's array.
  const copy = [...products];

  switch (sortBy) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'title-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case 'stock':
      // In-stock first, then alphabetical within each group.
      return copy.sort(
        (a, b) => Number(b.inStock) - Number(a.inStock) || a.name.localeCompare(b.name),
      );
    default:
      return copy;
  }
}


/**
 * The grid stays empty until the shopper narrows things down — either by
 * picking at least one category or by typing a search term.
 */
// hasQuery :: Filters -> [String] -> Boolean
export function hasQuery(filters: Filters, categories: string[]): boolean {
  return categories.length > 0 || filters.searchQuery.trim().length > 0;
}

// visibleProducts :: Filters -> [String] -> [Product] -> [Product]
export function visibleProducts(
  filters: Filters,
  categories: string[],
  products: Product[],
): Product[] {
  if (!hasQuery(filters, categories)) return [];
  return sortProducts(filters.sortBy, filterProducts(filters, categories, products));
}

// formatPrice :: Number -> String
export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

/**
 * Picks a varied handful of products for the landing page.
 *
 * One product is taken from each category before any category is used twice, so
 * the row is a cross-section of the shop rather than the first N rows of the
 * catalogue — which would be all headphones.
 *
 * Note: this reads Math.random, so it is not pure. Call it once behind useMemo
 * rather than during render, or the selection reshuffles on every state change.
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

  // One pass taking the first of each category, then whatever is left over.
  const firstOfEach = shuffle(
    Object.values(byCategory)
      .map((group) => group[0])
      .filter(Boolean),
  );
  const remainder = available.filter((product) => !firstOfEach.includes(product));

  return [...firstOfEach, ...remainder].slice(0, count);
}
