import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/headphones/*.jpg',
  { eager: true },
);

/** Headphones — 15 products. Drop an image in the folder and add a line below. */
export const headphones = createCategory('hp', 'Headphones', images, [
  { name: 'Sony WH-1000XM5 Wireless', price: 136.19 },
  { name: 'Bose QuietComfort 45', price: 232.39 },
  { name: 'Sennheiser HD 560S', price: 68.59 },
  { name: 'Audio-Technica ATH-M50x', price: 164.79 },
  { name: 'JBL Tune 760NC', price: 260.99 },
  { name: 'Beats Studio Pro', price: 97.19, inStock: false },
  { name: 'AKG K371 Studio', price: 193.39 },
  { name: 'Philips Fidelio X3', price: 289.59 },
  { name: 'Marshall Major IV', price: 125.79 },
  { name: 'Skullcandy Crusher ANC', price: 221.99 },
  { name: 'Soundcore Life Q35', price: 58.19 },
  { name: 'HyperX Cloud II Gaming', price: 154.39, inStock: false },
  { name: 'Razer BlackShark V2', price: 250.59 },
  { name: 'Jabra Elite 85h', price: 86.79 },
  { name: 'Bowers & Wilkins PX7', price: 182.99 },
]);

