import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from './icons';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label: string;
}

/**
 * Compact select.
 *
 * A native <select> would be less code, but its popup is drawn by the operating
 * system and cannot be styled, so it clashes with everything around it. This
 * renders its own panel and reimplements the dismissal behaviour the native
 * control provides for free.
 */
export default function Dropdown<T extends string>({
  value,
  options,
  onChange,
  label,
}: DropdownProps<T>) {
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

  const current = options.find((option) => option.value === value);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] transition-colors ${
          open
            ? 'bg-[#EFF6FF] text-[#2563EB]'
            : 'bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9]'
        }`}
      >
        <span className="truncate">{current?.label ?? 'Select'}</span>
        <ChevronDown
          className={`size-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute top-[calc(100%+6px)] left-0 z-50 w-full min-w-[180px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.14)]"
        >
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                  active
                    ? 'bg-[#EFF6FF] font-medium text-[#2563EB]'
                    : 'text-[#334155] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="flex w-3.5 shrink-0 justify-center">
                  {active && <Check className="size-3.5" />}
                </span>
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
