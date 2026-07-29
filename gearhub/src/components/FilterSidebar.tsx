import { ChevronDown, X } from './icons';
import { CATEGORIES, MAX_PRICE } from '../types';
import type { Filters } from '../types';
import { formatPrice } from '../utils/productUtils';

interface FilterSidebarProps {
  filters: Filters;
  counts: Record<string, number>;
  total: number;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: Filters['sortBy']) => void;
  /** Returns every filter to its default. Not in the design, but the three
   *  filter actions need a way to be undone in one step. */
  onReset: () => void;
  /** Shown as a close control when the panel floats over the grid. */
  onClose: () => void;
}

/**
 * Left filter rail — 240px wide with 24px insets, matching the sidebar frame in
 * the Figma file.
 *
 * The price range is presentational for now; it has no action in the reducer yet,
 * so the slider is disabled rather than silently doing nothing.
 */
export default function FilterSidebar({
  filters,
  counts,
  total,
  onCategoryChange,
  onSortChange,
  onReset,
  onClose,
}: FilterSidebarProps) {
  const isDefault =
    filters.category === 'All' &&
    filters.searchQuery.trim() === '' &&
    filters.sortBy === 'default';

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-[#E2E8F0] bg-white px-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-bold tracking-[0.08em] text-[#94A3B8] uppercase">
          Categories
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="cursor-pointer rounded-md p-1 text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569] xl:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      <ul className="flex flex-col gap-1">
        {CATEGORIES.map((category) => {
          const active = filters.category === category;
          const count = category === 'All' ? total : (counts[category] ?? 0);

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                aria-current={active ? 'true' : undefined}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? 'bg-[#EFF6FF] font-semibold text-[#2563EB]'
                    : 'text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${
                    active ? 'bg-[#2563EB] text-white' : 'text-[#94A3B8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-[#E2E8F0] pt-5">
        <h2 className="mb-3 text-[11px] font-bold tracking-[0.08em] text-[#94A3B8] uppercase">
          Price Range
        </h2>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          value={filters.maxPrice}
          disabled
          readOnly
          aria-label="Maximum price"
          className="w-full cursor-not-allowed accent-[#2563EB] opacity-60"
        />
        <div className="mt-2 flex items-center justify-between text-[12px] text-[#64748B]">
          <span>$0</span>
          <span className="font-semibold text-[#0F172A]">
            Max: {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] pt-5">
        <h2 className="mb-3 text-[11px] font-bold tracking-[0.08em] text-[#94A3B8] uppercase">
          Sort By
        </h2>
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(event) => onSortChange(event.target.value as Filters['sortBy'])}
            aria-label="Sort products"
            className="h-[37px] w-full cursor-pointer appearance-none rounded-lg border border-[#E2E8F0] bg-white pr-8 pl-3 text-[13px] text-[#475569] transition-colors hover:border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="title">Title (A-Z)</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#475569]" />
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        disabled={isDefault}
        className="mt-auto cursor-pointer rounded-lg border border-[#E2E8F0] py-2 text-[13px] font-medium text-[#475569] transition-colors hover:border-[#CBD5E1] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Reset filters
      </button>
    </aside>
  );
}
