import type { Product } from '../types';
import catalogue from './products.json';

/** The catalogue exactly as authored, matching the Product interface. */
type CatalogueEntry = Omit<Product, 'stock'>;

/**
 * Rolls a stock level for one product: usually 1-10 units, occasionally none.
 *
 * Not pure — it reads Math.random. It runs once per module load, which in a
 * browser means once per page load, so every refresh gives the shop a fresh set
 * of stock levels while the numbers stay fixed for the life of the session. That
 * matters: if stock were re-rolled on render, the cart's per-product ceiling
 * would move underneath the shopper.
 */
// rollStock :: () -> Number
function rollStock(): number {
  return Math.random() < 0.12 ? 0 : 1 + Math.floor(Math.random() * 10);
}

/**
 * Product catalogue, loaded from the static JSON file next to this module and
 * given a stock level on the way through.
 *
 * The images it points at live in `public/products/`, so their paths survive the
 * production build unchanged — which is why the data can stay as plain JSON
 * rather than a module that imports each asset.
 */
export const products: Product[] = (catalogue as CatalogueEntry[]).map((entry) => {
  const stock = rollStock();
  return { ...entry, stock, inStock: stock > 0 };
});
