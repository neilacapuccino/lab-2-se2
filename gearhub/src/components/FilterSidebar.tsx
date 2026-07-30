import type { ReactNode } from 'react';
import { Check, Heart, X } from './icons';
import { CATEGORIES, MAX_PRICE } from '../types';
import type { Filters, ViewFlags } from '../types';
import { formatPrice } from '../utils/productUtils';

interface FilterSidebarProps {
  filters: Filters;
  /** Empty means no category filter, which leaves every row unlit. */
  selected: string[];
  views: ViewFlags;
  counts: Record<string, number>;
  total: number;
  wishlistCount: number;
  soldCount: number;
  onToggleCategory: (category: string) => void;
  onToggleView: (key: keyof ViewFlags) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onReset: () => void;
  onClose: () => void;
}

/**
 * The slider's fill, as a hard-stop gradient — a range track cannot be styled
 * separately from its fill in any cross-browser way.
 */
// trackFill :: Number -> String
const trackFill = (maxPrice: number): string => {
  const filled = (maxPrice / MAX_PRICE) * 100;
  return `linear-gradient(to right, #93B4FB 0%, #2563EB ${filled}%, #EEF2F7 ${filled}%, #EEF2F7 100%)`;
};

/**
 * Left filter rail — 240px wide, matching the sidebar frame in Figma. Three
 * sections only; sorting lives with the results it reorders, in the grid header.
 */
export default function FilterSidebar({
  filters,
  selected,
  views,
  counts,
  total,
  wishlistCount,
  soldCount,
  onToggleCategory,
  onToggleView,
  onMaxPriceChange,
  onReset,
  onClose,
}: FilterSidebarProps) {
  /* Zero is the off position, so the switch reads straight off the value. */
  const priceCapped = filters.maxPrice > 0;

  const isDefault =
    selected.length === 0 &&
    filters.searchQuery.trim() === '' &&
    !priceCapped &&
    !views.wishlistOnly &&
    !views.soldOnly;

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

      {/* Three rows: what it is, what it is set to, the control. The only
          saturated colour is the track fill; the rest is slate. */}
      <div className="flex items-center justify-between gap-2">
        <SectionLabel>Max Price</SectionLabel>
        <Switch
          on={priceCapped}
          label="Limit maximum price"
          onClick={() => onMaxPriceChange(priceCapped ? 0 : MAX_PRICE)}
        />
      </div>

      <p className="mt-2.5 text-[13px] tabular-nums">
        {priceCapped ? (
          <>
            <span className="text-[#94A3B8]">Up to </span>
            <span className="font-semibold text-[#334155]">
              {formatPrice(filters.maxPrice)}
            </span>
          </>
        ) : (
          <span className="text-[#94A3B8]">Any price</span>
        )}
      </p>

      <input
        type="range"
        min={0}
        max={MAX_PRICE}
        step={5}
        value={filters.maxPrice}
        onChange={(event) => onMaxPriceChange(Number(event.target.value))}
        aria-label="Maximum price"
        aria-valuetext={priceCapped ? formatPrice(filters.maxPrice) : 'Any price'}
        style={{ background: trackFill(filters.maxPrice) }}
        className={`price-slider mt-3 w-full ${priceCapped ? '' : 'price-slider--off'}`}
      />

      <Divider />

      <SectionLabel>Show</SectionLabel>
      <div className="mt-3 flex flex-col gap-0.5">
        <ViewRow
          label="Wishlist"
          count={wishlistCount}
          active={views.wishlistOnly}
          onClick={() => onToggleView('wishlistOnly')}
          icon={<Heart className="size-3.5" fill={views.wishlistOnly ? 'currentColor' : 'none'} />}
        />
        <ViewRow
          label="Sold out"
          count={soldCount}
          active={views.soldOnly}
          onClick={() => onToggleView('soldOnly')}
          icon={<X className="size-3.5" />}
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

/** Small track-and-knob switch, 32×18, for turning one filter on and off. */
function Switch({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`relative h-[18px] w-8 shrink-0 cursor-pointer rounded-full transition-colors ${
        on ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
      }`}
    >
      <span
        className={`absolute top-0.5 size-3.5 rounded-full bg-white shadow-sm transition-all ${
          on ? 'left-[16px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

function ViewRow({
  label,
  count,
  active,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
        active ? 'bg-[#EFF6FF] font-medium text-[#2563EB]' : 'text-[#475569] hover:bg-[#F8FAFC]'
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className={active ? 'text-[#2563EB]' : 'text-[#CBD5E1]'}>{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <span
        className={`text-[11px] tabular-nums ${active ? 'text-[#2563EB]' : 'text-[#CBD5E1]'}`}
      >
        {count}
      </span>
    </button>
  );
}
