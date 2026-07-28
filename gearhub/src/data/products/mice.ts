import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/mice/*.jpg',
  { eager: true },
);

/** Mice — 15 products. Drop an image in the folder and add a line below. */
export const mice = createCategory('ms', 'Mice', images, [
  { name: 'Logitech MX Master 3S', price: 60.69 },
  { name: 'Razer DeathAdder V3', price: 101.39 },
  { name: 'SteelSeries Rival 3', price: 32.09 },
  { name: 'Corsair Dark Core RGB Pro', price: 72.79 },
  { name: 'Glorious Model O Wireless', price: 113.49 },
  { name: 'Zowie EC2-C Esports', price: 44.19, inStock: false },
  { name: 'Logitech G Pro X Superlight', price: 84.89 },
  { name: 'Roccat Kone Pro Air', price: 125.59 },
  { name: 'HyperX Pulsefire Haste 2', price: 56.29 },
  { name: 'Anker Vertical Ergonomic', price: 96.99 },
  { name: 'Microsoft Arc Mouse', price: 27.69 },
  { name: 'Apple Magic Mouse 2', price: 68.39, inStock: false },
  { name: 'Keychron M3 Wireless', price: 109.09 },
  { name: 'Pulsar X2 Mini', price: 39.79 },
  { name: 'Endgame Gear XM1r', price: 80.49 },
]);

