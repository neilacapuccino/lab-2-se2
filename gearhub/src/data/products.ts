import type { Product } from '../types';
import catalogue from './products.json';

/**
 * Product catalogue, loaded from the static JSON file next to this module.
 *
 * The images it points at live in `public/products/`, so their paths survive
 * the production build unchanged — which is why the data can stay as plain
 * JSON rather than a module that imports each asset.
 */
export const products: Product[] = catalogue;

/**
 * Stands in for a network call so the reducer can handle product loading the
 * same way it would with a real endpoint.
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(products), 300));
}
