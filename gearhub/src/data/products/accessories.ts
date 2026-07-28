import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/accessories/*.jpg',
  { eager: true },
);

/** Accessories — 15 products. Drop an image in the folder and add a line below. */
export const accessories = createCategory('ac', 'Accessories', images, [
  { name: 'Spigen Ultra Hybrid Case', price: 98.79 },
  { name: 'PopSockets PopGrip', price: 187.59 },
  { name: 'Anker MagGo Magnetic Stand', price: 36.39 },
  { name: 'ESR HaloLock Wallet', price: 125.19 },
  { name: 'Belkin Screen Protector', price: 213.99 },
  { name: 'Peak Design Mobile Tripod', price: 62.79, inStock: false },
  { name: 'MOFT Snap Phone Stand', price: 151.59 },
  { name: 'Nomad Modern Leather Case', price: 240.39 },
  { name: 'Twelve South HiRise 3', price: 89.19 },
  { name: 'Ringke Fusion-X Case', price: 177.99 },
  { name: 'JOBY GripTight Mount', price: 26.79 },
  { name: 'ZAGG InvisibleShield Glass', price: 115.59, inStock: false },
  { name: 'Native Union Drop Stand', price: 204.39 },
  { name: 'Bellroy Phone Sleeve', price: 53.19 },
  { name: 'UAG Monarch Pro Case', price: 141.99 },
]);

