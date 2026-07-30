import type { ReactNode } from 'react';
import { Minus, Plus, ShoppingCart, Trash, X } from './icons';
import type { CartItem } from '../types';
import { formatPrice } from '../utils/productUtils';

interface CartDrawerProps {
  items: CartItem[];
  subtotal: number;
  grandTotal: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  /** CLEAR_CART — the design has no control for this, so one is added here. */
  onClear: () => void;
  onCheckout: () => void;
  onClose: () => void;
}

/**
 * Right cart panel — 360px wide, matching the cart-drawer frame in Figma.
 *
 * Line items are separated by hairline rules rather than boxed in cards: with a
 * thumbnail, two prices, a stepper and a delete control on every row, borders
 * around each one turn a short list into visual noise.
 */
export default function CartDrawer({
  items,
  subtotal,
  grandTotal,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
  onCheckout,
  onClose,
}: CartDrawerProps) {
  return (
    <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-[#E2E8F0] bg-white">
      <header className="flex items-center justify-between px-6 pt-6 pb-4">
        <h2 className="text-[15px] font-semibold tracking-tight text-[#0F172A]">
          Shopping Cart
          {items.length > 0 && (
            <span className="ml-2 text-[13px] font-normal text-[#94A3B8]">
              {items.length}
            </span>
          )}
        </h2>

        <div className="flex items-center gap-1">
          {items.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer rounded-md px-2 py-1 text-[12px] text-[#94A3B8] transition-colors hover:text-[#EF4444]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="cursor-pointer rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-[#F8FAFC] hover:text-[#475569]"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div className="no-scrollbar flex-1 overflow-y-auto px-6">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 pb-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-[#F8FAFC]">
              <ShoppingCart className="size-5 text-[#CBD5E1]" />
            </span>
            <p className="text-[13px] font-medium text-[#475569]">Your cart is empty</p>
            <p className="max-w-[200px] text-[12px] leading-relaxed text-[#94A3B8]">
              Items you add will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#F1F5F9]">
            {items.map((item) => (
              <li key={item.id} className="group flex gap-3 py-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F8FAFC]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="size-full rounded-xl bg-[#EEF2F7]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-[13px] font-medium text-[#0F172A]">
                      {item.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 cursor-pointer rounded p-1 text-[#CBD5E1] transition-colors hover:text-[#EF4444]"
                    >
                      <Trash className="size-3.5" />
                    </button>
                  </div>

                  <p className="mt-0.5 text-[12px] text-[#94A3B8]">
                    {formatPrice(item.price)} each
                    {item.quantity >= item.stock && (
                      <span className="ml-1.5 text-[#B45309]">max {item.stock}</span>
                    )}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-0.5 rounded-lg bg-[#F8FAFC] p-0.5">
                      <Stepper
                        label={`Decrease ${item.name}`}
                        onClick={() => onDecrement(item.id)}
                      >
                        <Minus className="size-3" />
                      </Stepper>
                      <span className="w-6 text-center text-[12px] font-semibold text-[#0F172A] tabular-nums">
                        {item.quantity}
                      </span>
                      {/* Left clickable at the ceiling on purpose: pressing it
                          explains why nothing happened, which a dead disabled
                          button cannot do. */}
                      <Stepper
                        label={`Increase ${item.name}`}
                        onClick={() => onIncrement(item.id)}
                        atLimit={item.quantity >= item.stock}
                      >
                        <Plus className="size-3" />
                      </Stepper>
                    </div>

                    <span className="text-[13px] font-semibold text-[#0F172A] tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="px-6 pt-4 pb-6">
        <dl className="mb-4 flex flex-col gap-2.5 text-[13px]">
          <div className="flex justify-between">
            <dt className="text-[#94A3B8]">Subtotal</dt>
            <dd className="text-[#475569] tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#94A3B8]">Shipping</dt>
            <dd className="text-[#16A34A]">Free</dd>
          </div>
          <div className="mt-1 flex items-baseline justify-between border-t border-[#F1F5F9] pt-3">
            <dt className="text-[14px] font-semibold text-[#0F172A]">Total</dt>
            <dd className="text-[18px] font-bold text-[#0F172A] tabular-nums">
              {formatPrice(grandTotal)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full cursor-pointer rounded-xl bg-[#2563EB] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
        >
          Checkout
        </button>
      </footer>
    </aside>
  );
}

function Stepper({
  label,
  onClick,
  atLimit = false,
  children,
}: {
  label: string;
  onClick: () => void;
  /** Styled as unavailable, but still clickable so it can explain itself. */
  atLimit?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-disabled={atLimit || undefined}
      className={`flex size-6 items-center justify-center rounded-md transition-colors ${
        atLimit
          ? 'cursor-not-allowed text-[#CBD5E1]'
          : 'cursor-pointer text-[#475569] hover:bg-white hover:text-[#0F172A] hover:shadow-sm'
      }`}
    >
      {children}
    </button>
  );
}
