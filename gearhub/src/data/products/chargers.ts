import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/chargers/*.jpg',
  { eager: true },
);

/** Chargers — 15 products. Drop an image in the folder and add a line below. */
export const chargers = createCategory('ch', 'Chargers', images, [
  { name: 'Anker 735 GaN 65W', price: 45.18 },
  { name: 'Belkin BoostCharge 30W', price: 77.37 },
  { name: 'UGREEN Nexode 100W', price: 22.56 },
  { name: 'Baseus GaN5 Pro 65W', price: 54.75 },
  { name: 'Aukey Omnia 61W', price: 86.94 },
  { name: 'Satechi 108W Pro Desktop', price: 32.13, inStock: false },
  { name: 'RAVPower Pioneer 90W', price: 64.32 },
  { name: 'Spigen ArcStation 40W', price: 96.51 },
  { name: 'Nekteck 60W USB-C', price: 41.7 },
  { name: 'Apple 20W USB-C Adapter', price: 73.89 },
  { name: 'Samsung 45W Super Fast', price: 19.08 },
  { name: 'Xiaomi 67W Turbo', price: 51.27, inStock: false },
  { name: 'Voltme Revo 65W', price: 83.46 },
  { name: 'INIU 100W Desktop Hub', price: 28.65 },
  { name: 'Elecom 45W Slim', price: 60.84 },
]);

