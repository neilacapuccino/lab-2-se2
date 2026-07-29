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
 * Right cart panel — 360px wide with 24px insets, matching the cart-drawer frame
 * in Figma. Shipping is free, so the grand total equals the subtotal; it is kept
 * as its own line because the design shows it.
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
      <header className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="flex items-center gap-2 text-[16px] font-bold text-[#0F172A]">
          <ShoppingCart className="size-5 text-[#2563EB]" />
          Shopping Cart
        </h2>
        <div className="flex items-center gap-1">
          {items.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer rounded-md px-2 py-1 text-[12px] font-medium text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="cursor-pointer rounded-md p-1 text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#475569]"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <ShoppingCart className="size-7 text-[#CBD5E1]" />
            <p className="text-[14px] font-semibold text-[#0F172A]">Your cart is empty</p>
            <p className="max-w-[220px] text-[13px] text-[#64748B]">
              Add something from the grid and it will show up here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 rounded-lg border border-[#E2E8F0] p-3"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#F8FAFC]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="size-full rounded-md border border-dashed border-[#CBD5E1]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#0F172A]">
                    {item.name}
                  </p>
                  <div className="mt-0.5 flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#2563EB]">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-[#64748B]">
                      Total: {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StepperButton
                        label={`Decrease ${item.name}`}
                        onClick={() => onDecrement(item.id)}
                      >
                        <Minus className="size-3" />
                      </StepperButton>
                      <span className="w-7 text-center text-[13px] font-semibold text-[#0F172A]">
                        {item.quantity}
                      </span>
                      <StepperButton
                        label={`Increase ${item.name}`}
                        onClick={() => onIncrement(item.id)}
                      >
                        <Plus className="size-3" />
                      </StepperButton>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="cursor-pointer rounded-md p-1 text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="border-t border-[#E2E8F0] px-6 py-5">
        <dl className="mb-4 flex flex-col gap-2 text-[13px]">
          <div className="flex justify-between">
            <dt className="text-[#64748B]">Subtotal</dt>
            <dd className="font-semibold text-[#0F172A]">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[#64748B]">Shipping</dt>
            <dd className="font-semibold text-[#16A34A]">FREE</dd>
          </div>
          <div className="flex justify-between border-t border-[#E2E8F0] pt-2 text-[15px]">
            <dt className="font-bold text-[#0F172A]">Grand Total</dt>
            <dd className="font-bold text-[#2563EB]">{formatPrice(grandTotal)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={onCheckout}
          disabled={items.length === 0}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#2563EB] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
        >
          <ShoppingCart className="size-4" />
          Checkout Now
        </button>
      </footer>
    </aside>
  );
}

function StepperButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-6 cursor-pointer items-center justify-center rounded border border-[#E2E8F0] text-[#475569] transition-colors hover:bg-[#F1F5F9]"
    >
      {children}
    </button>
  );
}
