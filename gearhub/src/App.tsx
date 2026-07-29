import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import HomePage from "./pages/homePage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      <NavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        cartCount={3}
        onCartClick={() => {}}
      />

      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} category={category} />} />
      </Routes>
      <Routes>
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;