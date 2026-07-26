import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home_page";
import SchoolSupplies from "./pages/school_supplies";
import Gadgets from "./pages/gadgets";
import Toys from "./pages/toys";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/school-supplies" element={<SchoolSupplies />} />
        <Route path="/gadgets" element={<Gadgets />} />
        <Route path="/toys" element={<Toys />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;