import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AppStateProvider } from "./state/AppStateProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </BrowserRouter>
);
