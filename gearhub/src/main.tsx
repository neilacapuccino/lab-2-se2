import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppState";
import { FilterProvider } from "./context/FilterContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FilterProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </FilterProvider>
  </BrowserRouter>
);