import CategoryMenu from '../CategoryMenu';
import { Funnel, Search, ShoppingCart } from '../icons';

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
  /** Per-category totals, shown beside each option in the category menu. */
  categoryCounts: Record<string, number>;
  totalProducts: number;
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
  categoryCounts,
  totalProducts,
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

        <div className="flex flex-1 justify-center">
          {/* One unit: a single outer border, no internal dividers. The category
              end is set apart by a darker fill rather than a line. */}
          {/* No overflow-hidden here: it would clip the category dropdown.
              The end segments round their own outer corners instead. */}
          <div className="flex h-[37px] w-full max-w-[520px] items-stretch rounded-lg border border-[#E2E8F0] bg-white transition-colors focus-within:border-[#2563EB]">
            <CategoryMenu
              category={category}
              counts={categoryCounts}
              total={totalProducts}
              onCategoryChange={onCategoryChange}
            />

            <label className="relative flex min-w-0 flex-1 items-center">
              <span className="sr-only">Search products</span>
              <Search
                aria-hidden="true"
                strokeWidth={2}
                className="pointer-events-none absolute left-3 size-4 text-[#94A3B8]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search premium tech gear..."
                className="h-full w-full bg-transparent pr-3 pl-9 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
              />
            </label>

            <button
              type="button"
              onClick={onFilterClick}
              aria-pressed={isFilterOpen}
              aria-label="Toggle filters"
              className={`flex w-[44px] shrink-0 cursor-pointer items-center justify-center rounded-r-[7px] transition-colors ${
                isFilterOpen
                  ? 'text-[#2563EB]'
                  : 'text-[#94A3B8] hover:text-[#475569]'
              }`}
            >
              <Funnel className="size-4" />
            </button>
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
