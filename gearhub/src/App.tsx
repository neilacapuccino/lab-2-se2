import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home_page";
import SchoolSupplies from "./pages/school_supplies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/school-supplies" element={<SchoolSupplies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;