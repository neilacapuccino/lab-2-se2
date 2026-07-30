import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import DashboardPage from "./pages/dashboardPage";
import { products } from "./data/products";
import { MAX_PRICE } from "./types";
import type { CartItem, Filters, Product, SortBy, ViewFlags } from "./types";
import { isSoldOut } from "./utils/productUtils";
import { countByCategory } from "./utils/productUtils";
import { WIDE_LAYOUT, useMediaQuery } from "./utils/useMediaQuery";

/**
 * Holds the app state for now. Every handler below already updates state
 * immutably and mirrors one of the required action types, so Part 7 can lift
 * them into `appStateReducer` with no behaviour change.
 */
function App() {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: "",
    category: "All",
    maxPrice: MAX_PRICE,
    sortBy: "default",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  /**
   * The sidebar allows several categories at once, which a single string cannot
   * express — so the multi-selection lives here and `filters.category` is kept
   * in step for the nav dropdown, leaving the specified Filters shape intact.
   * Empty means no category filter.
   */
  const [selected, setSelected] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [views, setViews] = useState<ViewFlags>({
    wishlistOnly: false,
    soldOnly: false,
  });
  /** Transient message shown when an add is refused for want of stock. */
  const [notice, setNotice] = useState<string | null>(null);
  // Both panels start closed on every load, so the featured view gets the full
  // width and nothing is open that the visitor did not open themselves.
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isWide = useMediaQuery(WIDE_LAYOUT);

  // Below the wide breakpoint there is not room for both panels and a usable
  // grid, so opening one closes the other.
  const openFilter = (next: boolean) => {
    setIsFilterOpen(next);
    if (next && !isWide) setIsCartOpen(false);
  };

  const openCart = (next: boolean) => {
    setIsCartOpen(next);
    if (next && !isWide) setIsFilterOpen(false);
  };

  // SET_SEARCH_QUERY
  const setSearchQuery = (searchQuery: string) =>
    setFilters((current) => ({ ...current, searchQuery }));

  // Mirrors the multi-selection into the single-value field the spec defines:
  // one named pick shows that category, anything else falls back to "All".
  const syncCategoryField = (next: string[]) =>
    setFilters((current) => ({
      ...current,
      category: next.length === 1 ? next[0] : "All",
    }));

  // SET_CATEGORY — from the nav dropdown, which is single-choice.
  const setCategory = (category: string) => {
    const next = [category];
    setSelected(next);
    syncCategoryField(next);
  };

  /**
   * Sidebar rows toggle in and out. "All" is exclusive: picking it drops the
   * named categories, and picking a named category drops "All".
   */
  const toggleCategory = (category: string) =>
    setSelected((current) => {
      const has = current.includes(category);
      const next =
        category === "All"
          ? has
            ? []
            : ["All"]
          : has
            ? current.filter((entry) => entry !== category)
            : [...current.filter((entry) => entry !== "All"), category];

      syncCategoryField(next);
      return next;
    });


  // SET_SORT
  const setSort = (sortBy: SortBy) =>
    setFilters((current) => ({ ...current, sortBy }));

  /**
   * ADD_TO_CART — increments when already a line item, and refuses once the
   * cart holds every unit that exists. The grid counts stock down as it fills;
   * the cart keeps showing the quantity taken.
   */
  const addToCart = (product: Product) =>
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      const held = existing?.quantity ?? 0;

      if (held >= product.stock) {
        setNotice(
          product.stock === 0
            ? `${product.name} is out of stock.`
            : `Only ${product.stock} of ${product.name} available — all of them are already in your cart.`,
        );
        return current;
      }

      return existing
        ? current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current, { ...product, quantity: 1 }];
    });

  const toggleWishlist = (id: string) =>
    setWishlist((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );

  const toggleView = (key: keyof ViewFlags) =>
    setViews((current) => ({ ...current, [key]: !current[key] }));

  // UPDATE_QUANTITY — drops the line item once the quantity reaches zero.
  const updateQuantity = (id: string, quantity: number) =>
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

  const increment = (id: string) => {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    // The same ceiling applies from inside the drawer.
    if (item.quantity >= item.stock) {
      setNotice(`Only ${item.stock} of ${item.name} available.`);
      return;
    }
    updateQuantity(id, item.quantity + 1);
  };

  const decrement = (id: string) => {
    const item = cart.find((entry) => entry.id === id);
    if (item) updateQuantity(id, item.quantity - 1);
  };

  // REMOVE_FROM_CART
  const removeFromCart = (id: string) =>
    setCart((current) => current.filter((item) => item.id !== id));

  // CLEAR_CART — the design has no control for this, so the drawer adds one.
  const clearCart = () => setCart([]);

  // Returns all three filter actions to their defaults in one step.
  const resetFilters = () => {
    setSelected([]);
    setFilters((current) => ({
      ...current,
      searchQuery: "",
      category: "All",
      sortBy: "default",
    }));
  };

  // Clicking the logo returns the page to how it looks on a fresh load: filters
  // cleared, both panels closed, featured view showing. The cart itself is left
  // alone — losing what you had added would be a nasty surprise.
  const goHome = () => {
    resetFilters();
    setIsFilterOpen(false);
    setIsCartOpen(false);
  };

  // The simulated checkout. Part 6 adds the confirmation view.
  const checkout = () => {
    clearCart();
    openCart(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categoryCounts = countByCategory(products);
  const soldCount = products.filter((product) => isSoldOut(product, cart)).length;

  // Clear the stock notice a few seconds after it appears.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        category={filters.category}
        onCategoryChange={setCategory}
        cartCount={cartCount}
        onCartClick={() => openCart(!isCartOpen)}
        isFilterOpen={isFilterOpen}
        onFilterClick={() => openFilter(!isFilterOpen)}
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
              selected={selected}
              views={views}
              wishlist={wishlist}
              soldCount={soldCount}
              onToggleWishlist={toggleWishlist}
              onToggleView={toggleView}
              isFilterOpen={isFilterOpen}
              isCartOpen={isCartOpen}
              onCategoryChange={setCategory}
              onToggleCategory={toggleCategory}
              onSortChange={setSort}
              onClearSearch={() => setSearchQuery("")}
              onAddToCart={addToCart}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={removeFromCart}
              onClearCart={clearCart}
              onResetFilters={resetFilters}
              onCheckout={checkout}
              onCloseFilter={() => openFilter(false)}
              onCloseCart={() => openCart(false)}
              onOpenFilter={() => openFilter(true)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
