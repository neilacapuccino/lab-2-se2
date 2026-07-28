import { createCategory } from './createCategory';

const images = import.meta.glob<{ default: string }>(
  '../../assets/products/keyboards/*.jpg',
  { eager: true },
);

/** Keyboards — 15 products. Drop an image in the folder and add a line below. */
export const keyboards = createCategory('kb', 'Keyboards', images, [
  { name: 'Keychron K2 Wireless', price: 96.04 },
  { name: 'Logitech MX Keys Mini', price: 157.09 },
  { name: 'Razer BlackWidow V4 Pro', price: 53.14 },
  { name: 'Corsair K70 RGB Pro', price: 114.19 },
  { name: 'SteelSeries Apex Pro TKL', price: 175.24 },
  { name: 'Ducky One 3 SF', price: 71.29, inStock: false },
  { name: 'HyperX Alloy Origins Core', price: 132.34 },
  { name: 'Varmilo VA87M', price: 193.39 },
  { name: 'Anne Pro 2 Mechanical', price: 89.44 },
  { name: 'Royal Kludge RK84', price: 150.49 },
  { name: 'Akko 3068B Plus', price: 46.54 },
  { name: 'Leopold FC660M', price: 107.59, inStock: false },
  { name: 'Filco Majestouch 2', price: 168.64 },
  { name: 'Das Keyboard 4Q', price: 64.69 },
  { name: 'NuPhy Air75 Low Profile', price: 125.74 },
]);

