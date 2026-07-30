import type { Filters, SortBy } from "../types";
import { MAX_PRICE } from "../types";

export type FilterAction =
  | { type: "SET_MAX_PRICE"; payload: number }
  | { type: "SET_SORT"; payload: SortBy }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "RESET_FILTERS" };

export function filterReducer(
  state: Filters,
  action: FilterAction
): Filters {
  switch (action.type) {
    case "SET_MAX_PRICE":
      return {
        ...state,
        maxPrice: action.payload,
      };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "RESET_FILTERS":
      return {
        ...state,
        searchQuery: "",
        category: "All",
        maxPrice: MAX_PRICE,
        sortBy: "default",
      };

    default:
      return state;
  }
}