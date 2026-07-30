import React, { createContext, useContext, useReducer, type ReactNode } from "react";
import { products } from "../data/products";
import type { State, Product, SortBy } from "../types";
import { MAX_PRICE } from "../types";

export type AppAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SORT"; payload: SortBy }
  | { type: "TOGGLE_CART"; payload?: boolean }
  | { type: "SET_MAX_PRICE"; payload: number };

const initialState: State = {
  products,
  cart: [],
  filters: {
    searchQuery: "",
    category: "All",
    maxPrice: MAX_PRICE,
    sortBy: "default",
  },
  isCartOpen: false,
};

export function appReducer(state: State, action: AppAction): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = state.cart.find((c) => c.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return state;
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === product.id ? { ...c, quantity: c.quantity + 1 } : c,
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...product, quantity: 1 }] };
    }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((c) => c.id !== action.payload) };

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) return { ...state, cart: state.cart.filter((c) => c.id !== id) };
      return {
        ...state,
        cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
      };
    }

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_SEARCH_QUERY":
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };

    case "SET_CATEGORY":
      return { ...state, filters: { ...state.filters, category: action.payload } };

    case "SET_SORT":
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: typeof action.payload === "boolean" ? action.payload : !state.isCartOpen,
      };

    case "SET_MAX_PRICE":
      return { ...state, filters: { ...state.filters, maxPrice: action.payload } };

    default:
      return state;
  }
}

type AppContextType = { state: State; dispatch: React.Dispatch<AppAction> };

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
