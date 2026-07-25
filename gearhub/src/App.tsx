import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home_page";
import SchoolSupplies from "./pages/school_supplies";
import Gadgets from "./pages/gadgets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/school-supplies" element={<SchoolSupplies />} />
        <Route path="/gadgets" element={<Gadgets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;