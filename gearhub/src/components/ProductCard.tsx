import { Plus } from './icons';
import type { Product } from '../types';
import { formatPrice } from '../utils/productUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

/**
 * One product tile: image, category, stock, name, price and an add button.
 *
 * The image area is a fixed 160px box and the artwork does not scale or move on
 * hover, so rows stay aligned and nothing shifts under the cursor.
 */
export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
      <div className="flex h-[160px] items-center justify-center bg-[#F8FAFC] p-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="h-full w-full rounded-lg border border-dashed border-[#CBD5E1] bg-[#EEF2F7]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-semibold text-[#2563EB]">
            {product.category}
          </span>
          <span
            className={`text-[11px] font-semibold ${
              product.inStock ? 'text-[#16A34A]' : 'text-[#DC2626]'
            }`}
          >
            {product.inStock ? '• In Stock' : '• Out of Stock'}
          </span>
        </div>

        <h3 className="mb-1 line-clamp-2 min-h-[40px] text-[14px] font-semibold text-[#0F172A]">
          {product.name}
        </h3>

        <p className="mb-3 text-[18px] font-bold text-[#2563EB]">
          {formatPrice(product.price)}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="mt-auto flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
        >
          <Plus className="size-4" />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    </article>
  );
}
