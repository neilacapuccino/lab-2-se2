import { useEffect, useRef, useState } from 'react';
import { Check, Menu } from './icons';
import { CATEGORIES } from '../types';

interface CategoryMenuProps {
  category: string;
  counts: Record<string, number>;
  total: number;
  onCategoryChange: (category: string) => void;
}

/**
 * Category picker.
 *
 * A native <select> is used elsewhere for simple cases, but its dropdown is drawn
 * by the operating system and cannot be styled — so this renders its own menu to
 * match the rest of the interface. Keyboard and dismissal behaviour that the
 * native control provides for free is reimplemented below.
 */
export default function CategoryMenu({
  category,
  counts,
  total,
  onCategoryChange,
}: CategoryMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (next: string) => {
    onCategoryChange(next);
    setOpen(false);
  };

  return (
    <div ref={root} className="relative flex shrink-0">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Category: ${category}`}
        className={`flex w-[46px] cursor-pointer items-center justify-center rounded-l-[7px] transition-colors ${
          open ? 'bg-[#E2E8F0] text-[#2563EB]' : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
        }`}
      >
        <Menu aria-hidden="true" className="size-4" />
        {category !== 'All' && (
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-[#2563EB]" />
        )}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Categories"
          className="absolute top-[calc(100%+8px)] left-0 z-50 w-[220px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.14)]"
        >
          {CATEGORIES.map((option) => {
            const active = option === category;
            const count = option === 'All' ? total : (counts[option] ?? 0);

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => choose(option)}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                  active
                    ? 'bg-[#EFF6FF] font-semibold text-[#2563EB]'
                    : 'text-[#334155] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="flex w-4 shrink-0 justify-center">
                  {active && <Check className="size-3.5" />}
                </span>
                <span className="flex-1 truncate">
                  {option === 'All' ? 'All Categories' : option}
                </span>
                <span
                  className={`text-[11px] tabular-nums ${
                    active ? 'text-[#2563EB]' : 'text-[#94A3B8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
