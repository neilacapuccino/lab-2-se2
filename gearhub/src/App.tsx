import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import DashboardPage from "./pages/dashboardPage";
import {
  addToCart,
  checkout,
  clearCart,
  dismissNotice,
  removeFromCart,
  resetFilters,
  setCategory,
  setMaxPrice,
  setSearchQuery,
  setSort,
  toggleCart,
  toggleCategory,
  toggleFilters,
  toggleView,
  toggleWishlist,
  updateQuantity,
} from "./state/actions";
import { useAppState } from "./state/appStateContext";
import { cartCount, countByCategory, isSoldOut } from "./utils/productUtils";
import { WIDE_LAYOUT, useMediaQuery } from "./utils/useMediaQuery";

/**
 * Root component and the only place that reads the app state directly.
 *
 * Everything below receives what it needs as props, so each component below can
 * be rendered and reasoned about on its own; the reducer stays the single owner
 * of every value two components share. Each handler here is one dispatch of one
 * action creator, which keeps the mapping from interaction to action visible.
 */
function App() {
  const { state, dispatch } = useAppState();
  const {
    products,
    cart,
    filters,
    isCartOpen,
    selectedCategories,
    wishlist,
    views,
    isFilterOpen,
    receipt,
    notice,
  } = state;

  const isWide = useMediaQuery(WIDE_LAYOUT);

  /*
   * Below the wide breakpoint there is not room for both panels and a usable
   * grid, so opening one closes the other. The breakpoint is read from the
   * browser, which is why this rule lives here rather than in the pure reducer.
   */
  const openFilters = (next: boolean) => {
    dispatch(toggleFilters(next));
    if (next && !isWide) dispatch(toggleCart(false));
  };

  const openCart = (next: boolean) => {
    dispatch(toggleCart(next));
    if (next && !isWide) dispatch(toggleFilters(false));
  };

  /*
   * Clicking the logo returns the page to how it looks on a fresh load: filters
   * cleared, both panels closed, featured view showing. The cart itself is left
   * alone — losing what you had added would be a nasty surprise.
   */
  const goHome = () => {
    dispatch(resetFilters());
    dispatch(toggleFilters(false));
    dispatch(toggleCart(false));
  };

  // The stepper buttons read the current quantity, then set the next one; the
  // reducer decides what happens at either end of the range.
  const increment = (id: string) => {
    const item = cart.find((entry) => entry.id === id);
    if (item) dispatch(updateQuantity(id, item.quantity + 1));
  };

  const decrement = (id: string) => {
    const item = cart.find((entry) => entry.id === id);
    if (item) dispatch(updateQuantity(id, item.quantity - 1));
  };

  /** Total items rather than distinct line items, as the badge requires. */
  const itemCount = cartCount(cart);
  const categoryCounts = countByCategory(products);
  const soldCount = products.filter((product) => isSoldOut(product, cart)).length;

  // Clear the stock notice a few seconds after it appears.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => dispatch(dismissNotice()), 4000);
    return () => clearTimeout(timer);
  }, [notice, dispatch]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => dispatch(setSearchQuery(value))}
        category={filters.category}
        onCategoryChange={(category) => dispatch(setCategory(category))}
        cartCount={itemCount}
        onCartClick={() => openCart(!isCartOpen)}
        isFilterOpen={isFilterOpen}
        onFilterClick={() => openFilters(!isFilterOpen)}
        onHomeClick={goHome}
        categoryCounts={categoryCounts}
        totalProducts={products.length}
      />

      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#0F172A] px-4 py-3 text-[13px] font-medium text-white shadow-[0_12px_32px_rgba(15,23,42,0.28)]"
        >
          {notice}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              products={products}
              cart={cart}
              filters={filters}
              selected={selectedCategories}
              views={views}
              wishlist={wishlist}
              soldCount={soldCount}
              onToggleWishlist={(id) => dispatch(toggleWishlist(id))}
              onToggleView={(key) => dispatch(toggleView(key))}
              isFilterOpen={isFilterOpen}
              isCartOpen={isCartOpen}
              onCategoryChange={(category) => dispatch(setCategory(category))}
              onToggleCategory={(category) => dispatch(toggleCategory(category))}
              onSortChange={(sortBy) => dispatch(setSort(sortBy))}
              onMaxPriceChange={(maxPrice) => dispatch(setMaxPrice(maxPrice))}
              onClearSearch={() => dispatch(setSearchQuery(""))}
              onAddToCart={(product) => dispatch(addToCart(product))}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={(id) => dispatch(removeFromCart(id))}
              onClearCart={() => dispatch(clearCart())}
              onResetFilters={() => dispatch(resetFilters())}
              onCheckout={() => dispatch(checkout())}
              onCloseFilter={() => openFilters(false)}
              onCloseCart={() => dispatch(toggleCart(false))}
              onOpenFilter={() => openFilters(true)}
              receipt={receipt}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
