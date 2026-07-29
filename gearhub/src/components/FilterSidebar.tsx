import type { ReactNode } from 'react';
import Dropdown from './Dropdown';
import { Check, X } from './icons';
import { CATEGORIES, MAX_PRICE } from '../types';
import type { Filters, SortBy } from '../types';
import { formatPrice } from '../utils/productUtils';

interface FilterSidebarProps {
  filters: Filters;
  /** Empty means no category filter, which lights up the All row. */
  selected: string[];
  counts: Record<string, number>;
  total: number;
  onToggleCategory: (category: string) => void;
  onSortChange: (sortBy: SortBy) => void;
  onReset: () => void;
  onClose: () => void;
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title', label: 'Name: A to Z' },
  { value: 'title-desc', label: 'Name: Z to A' },
  { value: 'stock', label: 'Availability' },
];

/**
 * Left filter rail — 240px wide, matching the sidebar frame in Figma.
 *
 * Sections are divided by hairline rules and headed by small caps dark enough to
 * scan, so the three groups read as separate without heavy chrome.
 *
 * The price range is presentational: no action feeds it yet, so it is disabled
 * rather than moving without effect.
 */
export default function FilterSidebar({
  filters,
  selected,
  counts,
  total,
  onToggleCategory,
  onSortChange,
  onReset,
  onClose,
}: FilterSidebarProps) {
  const isDefault =
    selected.length === 0 &&
    filters.searchQuery.trim() === '' &&
    filters.sortBy === 'default';

  return (
    <aside className="no-scrollbar flex h-full w-[240px] shrink-0 flex-col overflow-y-auto border-r border-[#E2E8F0] bg-white px-5 py-6">
      <div className="mb-3 flex items-center justify-between">
        <SectionLabel>Categories</SectionLabel>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="cursor-pointer rounded-md p-1 text-[#CBD5E1] transition-colors hover:bg-[#F8FAFC] hover:text-[#475569] xl:hidden"
        >
          <X className="size-4" />
        </button>
      </div>

      <ul className="flex flex-col gap-0.5">
        {CATEGORIES.map((category) => {
          const isAll = category === 'All';
          // Nothing is highlighted until something is picked; All is a real
          // choice that shows the whole catalogue, not the absence of one.
          const active = selected.includes(category);
          const count = isAll ? total : (counts[category] ?? 0);

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onToggleCategory(category)}
                aria-pressed={active}
                className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                  active
                    ? 'bg-[#EFF6FF] font-medium text-[#2563EB]'
                    : 'text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      active ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-[#CBD5E1]'
                    }`}
                  >
                    {active && <Check className="size-3" />}
                  </span>
                  <span className="truncate">{category}</span>
                </span>
                <span
                  className={`text-[11px] tabular-nums ${
                    active ? 'text-[#2563EB]' : 'text-[#CBD5E1]'
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Divider />

      <SectionLabel>Price Range</SectionLabel>
      <input
        type="range"
        min={0}
        max={MAX_PRICE}
        value={filters.maxPrice}
        disabled
        readOnly
        aria-label="Maximum price"
        className="mt-3 w-full cursor-not-allowed accent-[#2563EB] opacity-50"
      />
      <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <span>$0</span>
        <span className="tabular-nums">{formatPrice(filters.maxPrice)}</span>
      </div>

      <Divider />

      <SectionLabel>Sort By</SectionLabel>
      <div className="mt-3">
        <Dropdown
          value={filters.sortBy}
          options={SORT_OPTIONS}
          onChange={onSortChange}
          label="Sort products"
        />
      </div>

      <button
        type="button"
        onClick={onReset}
        disabled={isDefault}
        className="mt-8 cursor-pointer rounded-md border border-[#E2E8F0] py-2 text-[13px] font-medium text-[#475569] transition-colors hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A] disabled:cursor-not-allowed disabled:border-[#F1F5F9] disabled:text-[#CBD5E1] disabled:hover:bg-transparent"
      >
        Reset all
      </button>
    </aside>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.06em] text-[#475569] uppercase">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="my-5 border-0 border-t border-[#E2E8F0]" />;
}
