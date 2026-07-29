import { ChevronDown, Search, ShoppingCart, Sliders } from '../icons';
import { CATEGORIES } from '../../types';

interface NavBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  /** Total item count, summing quantities rather than distinct lines. */
  cartCount: number;
  onCartClick: () => void;
  isFilterOpen: boolean;
  onFilterClick: () => void;
  /** Clears the filters and closes the cart, returning to the featured view. */
  onHomeClick: () => void;
}

/**
 * Top navigation: logo, search, category filter and cart trigger.
 *
 * Measurements follow the navigation-bar frame in the Figma file — 72px tall,
 * 40px side padding, a 32px logo tile 8px from the wordmark, a 320px search
 * field beside a 148px dropdown, and a 40px cart tile with an 18px badge.
 *
 * Icons come from the local set in components/icons.tsx, so the app needs no
 * icon-library dependency.
 */
export default function NavBar({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  cartCount,
  onCartClick,
  isFilterOpen,
  onFilterClick,
  onHomeClick,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-10">
        <button
          type="button"
          onClick={onHomeClick}
          aria-label="GearHub home — clear filters and cart view"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <img src="/logo.svg" alt="" width={32} height={32} className="block size-8" />
          <span className="text-[18px] leading-none font-extrabold tracking-tight text-[#0F172A]">
            GearHub
          </span>
        </button>

        <div className="flex flex-1 items-center justify-center gap-3">
          <button
            type="button"
            onClick={onFilterClick}
            aria-pressed={isFilterOpen}
            aria-label="Toggle filters"
            className={`flex h-[37px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border px-3 text-[13px] font-medium transition-colors ${
              isFilterOpen
                ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]'
                : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-[#CBD5E1]'
            }`}
          >
            <Sliders className="size-4" />
            <span className="max-[640px]:hidden">Filters</span>
          </button>

          <label className="relative block w-full max-w-[320px]">
            <span className="sr-only">Search products</span>
            <Search
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search premium tech gear..."
              className="h-[37px] w-full rounded-lg border border-[#E2E8F0] pr-3 pl-10 text-[14px] text-[#0F172A] transition-colors placeholder:text-[#94A3B8] hover:border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none"
            />
          </label>

          <div className="relative w-[148px] shrink-0">
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              aria-label="Filter by category"
              className="h-[37px] w-full cursor-pointer appearance-none rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-8 pl-4 text-[14px] font-medium text-[#475569] transition-colors hover:border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none"
            >
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All Categories' : option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#475569]"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
          className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#F8FAFC] transition-colors hover:bg-[#E2E8F0] focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ShoppingCart aria-hidden="true" strokeWidth={1.75} className="size-5 text-[#0F172A]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-[18px] items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
