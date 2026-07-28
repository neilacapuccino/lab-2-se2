import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/cables/*.jpg',
  { eager: true },
);

/** Cables — 14 products. Drop an image in the folder and add a line below. */
export const cables = createCategory('cb', 'Cables', images, [
  { name: 'Anker PowerLine III USB-C 1.8m', price: 20.46 },
  { name: 'Belkin BoostCharge USB-C 2m', price: 31.93 },
  { name: 'UGREEN USB-C to Lightning 1m', price: 12.4 },
  { name: 'Baseus Tungsten Gold 2m', price: 23.87 },
  { name: 'Cable Matters Thunderbolt 4', price: 35.34 },
  { name: 'Amazon Basics USB-C 3m', price: 15.81, inStock: false },
  { name: 'JSAUX Braided USB-C 1m', price: 27.28 },
  { name: 'Syncwire Nylon Lightning 2m', price: 38.75 },
  { name: 'Aukey Impulse USB-C 1.2m', price: 19.22 },
  { name: 'Spigen DuraSync 1.5m', price: 30.69 },
  { name: 'RAVPower USB-C 0.9m', price: 11.16 },
  { name: 'INIU Braided USB-C 2m', price: 22.63, inStock: false },
  { name: 'Elecom USB-C Slim 1m', price: 34.1 },
  { name: 'Nekteck 100W USB-C 3m', price: 14.57 },
]);

