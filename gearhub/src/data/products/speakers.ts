import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/speakers/*.jpg',
  { eager: true },
);

/** Speakers — 15 products. Drop an image in the folder and add a line below. */
export const speakers = createCategory('sp', 'Speakers', images, [
  { name: 'Sonos One SL', price: 160.99 },
  { name: 'JBL Flip 6 Portable', price: 271.99 },
  { name: 'Bose SoundLink Flex', price: 82.99 },
  { name: 'Marshall Emberton II', price: 193.99 },
  { name: 'Ultimate Ears BOOM 3', price: 304.99 },
  { name: 'Soundcore Motion Plus', price: 115.99, inStock: false },
  { name: 'Harman Kardon Onyx Studio', price: 226.99 },
  { name: 'Sony SRS-XB13 Extra Bass', price: 337.99 },
  { name: 'Beosound A1 2nd Gen', price: 148.99 },
  { name: 'Tribit StormBox Micro', price: 259.99 },
  { name: 'Edifier R1280T Bookshelf', price: 70.99 },
  { name: 'Creative Pebble V3', price: 181.99, inStock: false },
  { name: 'Logitech Z407 Bluetooth', price: 292.99 },
  { name: 'Klipsch The Fives', price: 103.99 },
  { name: 'Audioengine A2+ Wireless', price: 214.99 },
]);

