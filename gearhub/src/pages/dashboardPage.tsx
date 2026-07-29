import type { ReactNode } from 'react';
import CartDrawer from '../components/CartDrawer';
import FeaturedSection from '../components/FeaturedSection';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import type { CartItem, Filters, Product, SortBy } from '../types';
import { countByCategory, hasQuery, visibleProducts } from '../utils/productUtils';
import { WIDE_LAYOUT, useMediaQuery } from '../utils/useMediaQuery';

interface DashboardPageProps {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isFilterOpen: boolean;
  isCartOpen: boolean;
  onCategoryChange: (category: string) => void;
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
  isFilterOpen,
  isCartOpen,
  onCategoryChange,
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
}: DashboardPageProps) {
  const isWide = useMediaQuery(WIDE_LAYOUT);

  const counts = countByCategory(products);
  const visible = visibleProducts(filters, products);
  const showingResults = hasQuery(filters);

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
          counts={counts}
          total={products.length}
          onCategoryChange={onCategoryChange}
          onSortChange={onSortChange}
          onReset={onResetFilters}
          onClose={onCloseFilter}
        />
      </Panel>

      <main className="min-w-0 flex-1 overflow-y-auto">
        {showingResults ? (
          <ProductGrid
            products={visible}
            filters={filters}
            hasQuery={showingResults}
            onAddToCart={onAddToCart}
            onClearCategory={() => onCategoryChange('All')}
            onClearSearch={onClearSearch}
          />
        ) : (
          <FeaturedSection
            products={products}
            onCategoryChange={onCategoryChange}
            onAddToCart={onAddToCart}
            onOpenFilters={onOpenFilter}
          />
        )}
      </main>

      <Panel open={isCartOpen} floating={!isWide} side="right" onDismiss={onCloseCart}>
        <CartDrawer
          items={cart}
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
