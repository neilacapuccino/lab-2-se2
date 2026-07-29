import ProductCard from './ProductCard';
import { Search, X } from './icons';
import type { Filters, Product } from '../types';

interface ProductGridProps {
  products: Product[];
  filters: Filters;
  /** False before the shopper has chosen a category or typed a search. */
  hasQuery: boolean;
  onAddToCart: (product: Product) => void;
  onClearCategory: () => void;
  onClearSearch: () => void;
}

/**
 * Middle workspace: results header, active filter chips and the product grid.
 *
 * Columns come from the available width rather than the viewport, so the grid
 * reflows correctly when either side panel opens.
 */
export default function ProductGrid({
  products,
  filters,
  hasQuery,
  onAddToCart,
  onClearCategory,
  onClearSearch,
}: ProductGridProps) {
  const heading =
    filters.category === 'All' ? 'Search Results' : `${filters.category} Search Results`;

  return (
    <section className="flex h-full flex-col overflow-y-auto px-8 py-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-bold text-[#0F172A]">{heading}</h1>
          <p className="mt-1 text-[13px] text-[#64748B]">
            {hasQuery
              ? `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`
              : 'Choose a category to start browsing'}
            {filters.searchQuery.trim() && (
              <> for &ldquo;{filters.searchQuery.trim()}&rdquo;</>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filters.category !== 'All' && (
            <FilterChip label={filters.category} onRemove={onClearCategory} />
          )}
          {filters.searchQuery.trim() && (
            <FilterChip label={filters.searchQuery.trim()} onRemove={onClearSearch} />
          )}
        </div>
      </header>

      {hasQuery && products.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5 pb-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      {hasQuery && products.length === 0 && (
        <EmptyState
          title="No products found"
          body="Try a different search term, or pick another category."
        />
      )}

      {!hasQuery && (
        <EmptyState
          title="Nothing to show yet"
          body="Pick a category from the filters, or search for something specific."
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

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#CBD5E1] bg-white px-6 py-16 text-center">
      <Search className="size-7 text-[#CBD5E1]" />
      <p className="text-[15px] font-semibold text-[#0F172A]">{title}</p>
      <p className="max-w-[320px] text-[13px] text-[#64748B]">{body}</p>
    </div>
  );
}
