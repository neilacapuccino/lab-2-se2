import type { Product } from '../../types';
import { headphones } from './headphones';
import { chargers } from './chargers';
import { speakers } from './speakers';
import { keyboards } from './keyboards';
import { mice } from './mice';
import { cables } from './cables';
import { accessories } from './accessories';

export {
  headphones,
  chargers,
  speakers,
  keyboards,
  mice,
  cables,
  accessories,
};

/** Every product across all categories. */
export const products: Product[] = [
  ...headphones,
  ...chargers,
  ...speakers,
  ...keyboards,
  ...mice,
  ...cables,
  ...accessories,
];

/**
 * Stands in for a network call so the reducer can handle product loading
 * the same way it would with a real endpoint.
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(products), 300));
}

