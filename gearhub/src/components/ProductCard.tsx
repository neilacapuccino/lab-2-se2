import { Check, Heart, Plus } from './icons';
import type { CartItem, Product } from '../types';
import {
  cartQuantity,
  discountPercent,
  formatPrice,
  listPrice,
  remainingStock,
} from '../utils/productUtils';

interface ProductCardProps {
  product: Product;
  cart: CartItem[];
  wishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (id: string) => void;
}

/**
 * One product tile.
 *
 * The image sits on white so cut-out product shots blend into the card instead
 * of floating on a grey panel; a hairline frame and a soft inner tint keep it
 * from reading as a blank rectangle.
 *
 * Stock is shown quietly — a small line under the price — and only turns
 * emphatic when it is nearly gone or exhausted.
 */
export default function ProductCard({
  product,
  cart,
  wishlisted,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const inCart = cartQuantity(cart, product.id);
  const left = remainingStock(product, cart);
  const soldOut = left === 0;
  const was = listPrice(product.price);
  const off = discountPercent(product.price);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:shadow-[0_10px_28px_rgba(15,23,42,0.10)]">
      <div className="relative flex h-[170px] items-center justify-center bg-white p-4">
        {/* Soft tint behind the artwork so the panel is not a plain white void. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-lg bg-gradient-to-b from-[#F8FAFC] to-white"
        />

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`relative max-h-full max-w-full object-contain transition-opacity ${
              soldOut ? 'opacity-40' : ''
            }`}
          />
        ) : (
          <div className="relative h-full w-full rounded-lg border border-dashed border-[#CBD5E1]" />
        )}

        {soldOut ? (
          <span className="absolute top-2.5 left-2.5 rounded-md bg-[#0F172A] px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            Sold
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 rounded-md bg-[#DC2626] px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
            -{off}%
          </span>
        )}

        {/* Wishlist control: hidden until the card is hovered or focused, and
            kept visible once the item is actually wishlisted. */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute bottom-2.5 left-2.5 flex size-8 cursor-pointer items-center justify-center rounded-full border transition-all focus-visible:opacity-100 ${
            wishlisted
              ? 'border-[#FECDD3] bg-white text-[#E11D48] opacity-100'
              : 'border-[#E2E8F0] bg-white/90 text-[#94A3B8] opacity-0 group-hover:opacity-100 hover:text-[#E11D48]'
          }`}
        >
          <Heart className="size-4" fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col border-t border-[#F1F5F9] p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-medium text-[#2563EB]">
            {product.category}
          </span>
          {wishlisted && (
            <span className="text-[11px] font-medium text-[#E11D48]">Wishlisted</span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[40px] text-[14px] font-semibold text-[#0F172A]">
          {product.name}
        </h3>

        <div className="mb-1 flex items-baseline gap-2">
          <span className="text-[18px] font-bold text-[#0F172A]">
            {formatPrice(product.price)}
          </span>
          <span className="text-[12px] text-[#94A3B8] line-through">
            {formatPrice(was)}
          </span>
        </div>

        <p
          className={`mb-3 text-[11px] ${
            soldOut
              ? 'font-medium text-[#DC2626]'
              : left <= 3
                ? 'font-medium text-[#B45309]'
                : 'text-[#94A3B8]'
          }`}
        >
          {soldOut
            ? inCart > 0
              ? `All ${product.stock} in your cart`
              : 'Out of stock'
            : left <= 3
              ? `Only ${left} left`
              : `${left} in stock`}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={soldOut}
          className="mt-auto flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]"
        >
          {soldOut ? (
            inCart > 0 ? (
              <>
                <Check className="size-4" />
                Max in cart
              </>
            ) : (
              'Unavailable'
            )
          ) : (
            <>
              <Plus className="size-4" />
              {inCart > 0 ? `In cart (${inCart})` : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </article>
  );
}
