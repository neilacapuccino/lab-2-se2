import type { Product } from '../types';
import catalogue from './products.json';

/** The catalogue exactly as authored, matching the Product interface. */
type CatalogueEntry = Omit<Product, 'stock' | 'discount'>;

/*
 * Both rolls read Math.random, so neither is pure. They run once per module
 * load — a page refresh restocks and reprices the shop, but the figures hold
 * still during a session. A stock level that moved mid-visit would shift the
 * cart's ceiling underneath the shopper.
 */

/** 1 to 10 units, never none: everything is in stock on a fresh load. */
// rollStock :: () -> Number
function rollStock(): number {
  return 1 + Math.floor(Math.random() * 10);
}

/** 10% to 35% in steps of 5 — round numbers read as a deliberate sale. */
// rollDiscount :: () -> Number
function rollDiscount(): number {
  return 10 + 5 * Math.floor(Math.random() * 6);
}

/**
 * The catalogue, given a stock level and a discount on the way through. Its
 * images live in `public/`, so the paths survive the build and the data can
 * stay as plain JSON rather than a module importing each asset.
 */
export const products: Product[] = (catalogue as CatalogueEntry[]).map((entry) => {
  const stock = rollStock();
  return { ...entry, stock, inStock: stock > 0, discount: rollDiscount() };
});
