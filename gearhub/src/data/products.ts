import type { Product } from '../types';

import headset from '../assets/headset.jpg';
import keyboard from '../assets/keyboard.jpg';
import mouse from '../assets/mouse.jpg';
import phone from '../assets/phone.jpg';
import laptop from '../assets/laptop.jpg';
import gadget from '../assets/gadget.jpg';

/**
 * Mock product catalogue. Imported directly rather than fetched over the
 * network, per the requirement to source products from a static data file.
 *
 * Images are imported so Vite fingerprints them at build time; a plain .json
 * file could only hold string paths, which break in the production bundle.
 */
export const products: Product[] = [
  // Headphones — the six shown in the design, with their exact prices.
  { id: 'h1', name: 'Pro Wireless ANC Headphones', category: 'Headphones', price: 189.99, image: headset, inStock: true },
  { id: 'h2', name: 'AirFit Sport Earbuds Bluetooth', category: 'Headphones', price: 99.5, image: headset, inStock: true },
  { id: 'h3', name: 'Studio HD Wired Headset', category: 'Headphones', price: 149.0, image: headset, inStock: true },
  { id: 'h4', name: 'Compact Travel ANC Buds', category: 'Headphones', price: 79.99, image: headset, inStock: true },
  { id: 'h5', name: 'UltraBass Wireless Headset', category: 'Headphones', price: 119.99, image: headset, inStock: true },
  { id: 'h6', name: 'Pro-Streamer Gaming Mic Set', category: 'Headphones', price: 159.0, image: headset, inStock: true },

  // Chargers
  { id: 'c1', name: '100W GaN Desktop Charger', category: 'Chargers', price: 69.99, image: gadget, inStock: true },
  { id: 'c2', name: '65W Dual-Port USB-C Charger', category: 'Chargers', price: 44.99, image: gadget, inStock: true },
  { id: 'c3', name: 'MagSafe Wireless Charging Pad', category: 'Chargers', price: 39.99, image: gadget, inStock: true },
  { id: 'c4', name: '20000mAh Fast-Charge Power Bank', category: 'Chargers', price: 59.99, image: gadget, inStock: false },

  // Cases
  { id: 'k1', name: 'Carbon Fiber MagSafe Case', category: 'Cases', price: 34.99, image: phone, inStock: true },
  { id: 'k2', name: 'Rugged Armor Phone Case', category: 'Cases', price: 24.99, image: phone, inStock: true },
  { id: 'k3', name: 'Clear Slim Protective Case', category: 'Cases', price: 18.5, image: phone, inStock: false },

  // Cables
  { id: 'b1', name: 'Braided USB-C to USB-C 2m', category: 'Cables', price: 14.99, image: laptop, inStock: true },
  { id: 'b2', name: 'Thunderbolt 4 Pro Cable', category: 'Cables', price: 49.99, image: laptop, inStock: true },
  { id: 'b3', name: 'Right-Angle Lightning Cable', category: 'Cables', price: 12.99, image: laptop, inStock: false },

  // Keyboards
  { id: 'y1', name: 'Mechanical RGB Keyboard', category: 'Keyboards', price: 129.99, image: keyboard, inStock: true },
  { id: 'y2', name: 'Low-Profile Wireless Keyboard', category: 'Keyboards', price: 89.99, image: keyboard, inStock: true },
  { id: 'y3', name: 'Compact 60% Gaming Keyboard', category: 'Keyboards', price: 109.0, image: keyboard, inStock: false },

  // Mice
  { id: 'm1', name: 'Ergonomic Wireless Mouse', category: 'Mice', price: 54.99, image: mouse, inStock: true },
  { id: 'm2', name: 'Pro Gaming Mouse 16K DPI', category: 'Mice', price: 79.0, image: mouse, inStock: true },
  { id: 'm3', name: 'Slim Bluetooth Travel Mouse', category: 'Mice', price: 29.99, image: mouse, inStock: true },
];

/**
 * Stands in for a network call so the reducer can handle product loading the
 * same way it would with a real endpoint.
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => setTimeout(() => resolve(products), 300));
}
