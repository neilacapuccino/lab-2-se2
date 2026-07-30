import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import { filterReducer } from "./filterReducer";
import { MAX_PRICE } from "../types";

import type { Filters } from "../types";

const initialState: Filters = {
  searchQuery: "",
  category: "All",
  maxPrice: MAX_PRICE,
  sortBy: "default",
};

type FilterContextType = {
  filters: Filters;
  dispatch: React.Dispatch<any>;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filters, dispatch] = useReducer(
    filterReducer,
    initialState
  );

  return (
    <FilterContext.Provider
      value={{ filters, dispatch }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilters must be inside FilterProvider");
  }

  return context;
}