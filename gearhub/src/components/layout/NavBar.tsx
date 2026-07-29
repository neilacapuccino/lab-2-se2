import { CATEGORIES } from '../../types';

interface NavBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  /** Total item count, summing quantities rather than distinct lines. */
  cartCount: number;
  onCartClick: () => void;
}

/**
 * Top navigation: wordmark, search, category filter and cart trigger.
 *
 * Measurements follow the navigation-bar frame in the Figma file — 72px tall,
 * 40px side padding, a 320px search field beside a 148px dropdown, and a 40px
 * cart tile carrying an 18px badge.
 */
export default function NavBar({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
  cartCount,
  onCartClick,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-10">
        <a href="/" className="flex shrink-0 items-center gap-2" aria-label="GearHub home">
          <img src="/logo.svg" alt="" width={32} height={32} className="block size-8" />
          <span className="text-[18px] leading-none font-extrabold tracking-tight text-[#0F172A]">
            GearHub
          </span>
        </a>

        <div className="flex flex-1 items-center justify-center gap-3">
          <label className="relative block w-full max-w-[320px]">
            <span className="sr-only">Search products</span>
            <SearchIcon />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search premium tech gear..."
              className="h-[37px] w-full rounded-lg border border-[#E2E8F0] pr-3 pl-10 text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </label>

          <div className="relative w-[148px] shrink-0">
            <select
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              aria-label="Filter by category"
              className="h-[37px] w-full cursor-pointer appearance-none rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pr-8 pl-4 text-[14px] font-medium text-[#475569] focus:border-[#2563EB] focus:outline-none"
            >
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option === 'All' ? 'All Categories' : option}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </div>
        </div>

        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} items`}
          className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#F8FAFC] transition-colors hover:bg-[#E2E8F0]"
        >
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-[18px] items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#94A3B8]"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" />
      <path d="m11 11 3 3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-[#475569]"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m3.5 5.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="size-5 text-[#0F172A]"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M1.5 1.5h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h7.1a1.5 1.5 0 0 0 1.5-1.2L18.5 5H4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="17" r="1.4" />
      <circle cx="15" cy="17" r="1.4" />
    </svg>
  );
}
