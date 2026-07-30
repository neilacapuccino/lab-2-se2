import type { ReactNode } from 'react';
import CartDrawer from '../components/CartDrawer';
import FeaturedSection from '../components/FeaturedSection';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import type { CartItem, Filters, Product, SortBy, ViewFlags } from '../types';
import { countByCategory, hasQuery, visibleProducts } from '../utils/productUtils';
import { WIDE_LAYOUT, useMediaQuery } from '../utils/useMediaQuery';

interface DashboardPageProps {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  selected: string[];
  views: ViewFlags;
  wishlist: string[];
  soldCount: number;
  onToggleWishlist: (id: string) => void;
  onToggleView: (key: keyof ViewFlags) => void;
  isFilterOpen: boolean;
  isCartOpen: boolean;
  onCategoryChange: (category: string) => void;
  onToggleCategory: (category: string) => void;
  onSortChange: (sortBy: SortBy) => void;
  onClearSearch: () => void;
  onAddToCart: (product: Product) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
  onResetFilters: () => void;
  onCheckout: () => void;
  onCloseFilter: () => void;
  onCloseCart: () => void;
  onOpenFilter: () => void;
  receipt: CartItem[] | null;
}

/**
 * The single dashboard screen: filter rail, product grid and cart drawer.
 *
 * Above 1280px all three sit side by side, as in the Figma frame (240 / flexible
 * / 360). Below that the panels float over the grid with a backdrop, so the grid
 * keeps a usable width instead of being squeezed to nothing.
 */
export default function DashboardPage({
  products,
  cart,
  filters,
  selected,
  views,
  wishlist,
  soldCount,
  onToggleWishlist,
  onToggleView,
  isFilterOpen,
  isCartOpen,
  onCategoryChange,
  onToggleCategory,
  onSortChange,
  onClearSearch,
  onAddToCart,
  onIncrement,
  onDecrement,
  onRemove,
  onClearCart,
  onResetFilters,
  onCheckout,
  onCloseFilter,
  onCloseCart,
  onOpenFilter,
  receipt,
}: DashboardPageProps) {
  const isWide = useMediaQuery(WIDE_LAYOUT);

  const counts = countByCategory(products);
  const ctx = { cart, wishlist, views };
  const visible = visibleProducts(filters, selected, ctx, products);
  const showingResults = hasQuery(filters, selected, views);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative flex h-[calc(100vh-72px)] overflow-hidden bg-[#F8FAFC]">
      <Panel
        open={isFilterOpen}
        floating={!isWide}
        side="left"
        onDismiss={onCloseFilter}
      >
        <FilterSidebar
          filters={filters}
          selected={selected}
          views={views}
          counts={counts}
          total={products.length}
          wishlistCount={wishlist.length}
          soldCount={soldCount}
          onToggleCategory={onToggleCategory}
          onToggleView={onToggleView}
          onSortChange={onSortChange}
          onReset={onResetFilters}
          onClose={onCloseFilter}
        />
      </Panel>

      <main className="min-w-0 flex-1 overflow-y-auto">
        {showingResults ? (
          <ProductGrid
            products={visible}
            cart={cart}
            wishlist={wishlist}
            filters={filters}
            selected={selected}
            hasQuery={showingResults}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onToggleCategory={onToggleCategory}
            onClearSearch={onClearSearch}
          />
        ) : (
          <FeaturedSection
            products={products}
            cart={cart}
            wishlist={wishlist}
            onCategoryChange={onCategoryChange}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onOpenFilters={onOpenFilter}
          />
        )}
      </main>

      <Panel open={isCartOpen} floating={!isWide} side="right" onDismiss={onCloseCart}>
        <CartDrawer
          items={cart}
          receipt={receipt}
          subtotal={subtotal}
          grandTotal={subtotal}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
          onClear={onClearCart}
          onCheckout={onCheckout}
          onClose={onCloseCart}
        />
      </Panel>
    </div>
  );
}

interface PanelProps {
  open: boolean;
  /** When true the panel sits above the grid instead of beside it. */
  floating: boolean;
  side: 'left' | 'right';
  onDismiss: () => void;
  children: ReactNode;
}

function Panel({ open, floating, side, onDismiss, children }: PanelProps) {
  if (!open) return null;

  if (!floating) return <>{children}</>;

  return (
    <>
      <div
        role="presentation"
        onClick={onDismiss}
        className="fixed inset-x-0 top-[72px] bottom-0 z-30 bg-[#0F172A]/40"
      />
      <div
        className={`fixed top-[72px] bottom-0 z-40 shadow-2xl ${
          side === 'left' ? 'left-0' : 'right-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
