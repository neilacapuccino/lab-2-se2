import type { ReactNode } from 'react';
import Dropdown from './Dropdown';
import ProductCard from './ProductCard';
import { Funnel, Search, X } from './icons';
import type { CartItem, Filters, Product, SortBy } from '../types';

interface ProductGridProps {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  filters: Filters;
  selected: string[];
  /** False until something is actually narrowing the catalogue. */
  hasActiveFilter: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
  onToggleCategory: (category: string) => void;
  onSortChange: (sortBy: SortBy) => void;
  onClearSearch: () => void;
}

/** The brief's orderings, plus catalogue order. Under 'Best match' a search
    puts names beginning with the term ahead of ones merely containing it. */
const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'default', label: 'Best match' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title', label: 'Title (A–Z)' },
];

/**
 * Middle workspace: results header, filter chips and the grid. Sorting sits here
 * because it reorders this list without changing what is in it. Columns come
 * from available width, not the viewport, so the grid reflows when a panel opens.
 */
export default function ProductGrid({
  products,
  cart,
  wishlist,
  filters,
  selected,
  hasActiveFilter,
  onAddToCart,
  onToggleWishlist,
  onToggleCategory,
  onSortChange,
  onClearSearch,
}: ProductGridProps) {
  const searchTerm = filters.searchQuery.trim();

  const heading = selected.includes('All')
    ? 'All Products'
    : selected.length === 1
      ? `${selected[0]} Search Results`
      : selected.length > 1
        ? `${selected.length} Categories Selected`
        : 'Search Results';

  return (
    <section className="flex min-h-full flex-col px-8 py-6">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="text-[20px] font-bold text-[#0F172A]">{heading}</h1>
          <p className="mt-1 text-[13px] text-[#64748B]">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            {searchTerm && <> for &ldquo;{searchTerm}&rdquo;</>}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-[12px] text-[#94A3B8]">Sort</span>
          <div className="w-[168px]">
            <Dropdown
              value={filters.sortBy}
              options={SORT_OPTIONS}
              onChange={onSortChange}
              label="Sort products"
            />
          </div>
        </div>
      </header>

      {(selected.length > 0 || searchTerm) && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {selected.map((category) => (
            <FilterChip
              key={category}
              label={category}
              onRemove={() => onToggleCategory(category)}
            />
          ))}
          {searchTerm && <FilterChip label={searchTerm} onRemove={onClearSearch} />}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5 pb-4">
          {products.map((product) => (
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
      ) : hasActiveFilter ? (
        <EmptyState
          icon={<Search className="size-7 text-[#CBD5E1]" />}
          title="No products found"
          body="Nothing matches every filter at once. Try a different search term, another category, or a higher price cap."
        />
      ) : (
        /* Rail opened, nothing chosen yet. No button — the rail is on screen. */
        <EmptyState
          icon={<Funnel className="size-7 text-[#CBD5E1]" />}
          title="Choose a filter to begin"
          body="Pick a category, search for a product, or set a maximum price, and the matches will appear here."
        />
      )}
    </section>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#EFF6FF] py-1 pr-1.5 pl-3 text-[12px] font-medium text-[#2563EB]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="cursor-pointer rounded-full p-0.5 transition-colors hover:bg-[#DBEAFE]"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}

function EmptyState({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center">
      {icon}
      <p className="text-[15px] font-semibold text-[#0F172A]">{title}</p>
      <p className="max-w-[340px] text-[13px] leading-relaxed text-[#64748B]">{body}</p>
    </div>
  );
}
