import { useMemo } from 'react';
import type { ComponentType, SVGProps } from 'react';
import ProductCard from './ProductCard';
import {
  BatteryCharging,
  Headphones,
  Keyboard,
  Microphone,
  Mouse,
  Router,
  Speaker,
  Webcam,
} from './icons';
import type { CartItem, Product } from '../types';
import { pickFeatured } from '../utils/productUtils';

interface FeaturedSectionProps {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  onCategoryChange: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onOpenFilters: () => void;
}

/** Category tiles reuse the local icon set, one glyph per category. */
const CATEGORY_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Headphones,
  Chargers: BatteryCharging,
  Speakers: Speaker,
  Keyboards: Keyboard,
  Mice: Mouse,
  Microphones: Microphone,
  Webcams: Webcam,
  Routers: Router,
};

/**
 * The landing view, shown until the shopper picks a category or searches.
 *
 * Products come from the same catalogue the search results use, so adding to the
 * cart works identically here.
 */
export default function FeaturedSection({
  products,
  cart,
  wishlist,
  onCategoryChange,
  onAddToCart,
  onToggleWishlist,
  onOpenFilters,
}: FeaturedSectionProps) {
  const categories = Object.keys(CATEGORY_ICONS);

  /**
   * Eight categories and eight products both divide by four and by two, so the
   * last row of each grid fills at every column count the capped width reaches.
   *
   * useMemo with an empty dependency list keeps the random pick stable for the
   * life of the page — without it the row would reshuffle on every keystroke.
   */
  const featured = useMemo(() => pickFeatured(products, 8), []);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-8 py-8">
      <section className="flex items-center justify-between gap-10 rounded-[22px] bg-white p-10 shadow-[0_10px_30px_rgba(15,23,42,0.06)] max-[1024px]:flex-col max-[1024px]:text-center">
        <div className="flex-1">
          <span className="mb-5 inline-block rounded-full bg-[#EFF6FF] px-4 py-2 text-[0.85rem] font-semibold text-[#2563EB]">
            New Arrivals Stocked Daily
          </span>

          <h1 className="mb-4 text-[2.8rem]/[1.15] font-extrabold text-[#0F172A] max-[768px]:text-[2.2rem]">
            Discover Premium Tech Gear
          </h1>

          <p className="mb-7 max-w-[520px] leading-[1.8] text-[#64748B] max-[1024px]:mx-auto">
            Shop the latest hand-picked, premium-grade accessories carefully crafted to
            upgrade and power up your daily devices.
          </p>

          <button
            type="button"
            onClick={onOpenFilters}
            className="cursor-pointer rounded-xl bg-[#2563EB] px-8 py-3.5 font-bold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            Shop Now
          </button>
        </div>

        <div className="flex-1">
          {/* Photo by Luke Chesser, released under CC0 via Wikimedia Commons. */}
          <img
            src="/hero.jpg"
            alt="A tidy desk with a desktop computer, keyboard and notebook"
            className="h-[300px] w-full rounded-[18px] object-cover shadow-[0_10px_30px_rgba(15,23,42,0.12)] max-[1024px]:h-[240px]"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-[1.25rem] font-bold text-[#0F172A]">
          Featured Categories
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const count = products.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 text-left transition-colors hover:border-[#2563EB] hover:bg-[#F8FAFC]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-[#0F172A]">
                    {category}
                  </span>
                  <span className="block text-[12px] text-[#94A3B8]">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-[1.25rem] font-bold text-[#0F172A]">
          Featured Products
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              wishlisted={wishlist.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
