import { useState } from "react";
import "../styles/home_page.css";
import school_supplies from "../assets/school_supplies.jpg";
import gadget from "../assets/gadget.jpg";
import toys from "../assets/toys.jpg";

export default function HomePage() {
  // State
  const [search, setSearch] = useState("");

  // Products
  const products = [
    {
      name: "School Supplies",
      image: school_supplies,
    },
    {
      name: "Gadgets",
      image: gadget,
    },
    {
      name: "Toys",
      image: toys,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* Header */}
      <header className="header">
        <div className="logo">GearHub</div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="search-btn">🔍</button>
        </div>

        <div className="header-links">
          <a href="#">Cart</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to GearHub</h1>
        <p>Find the best gadgets and accessories.</p>
      </section>

      {/* Products */}
      <section className="products">
        {filteredProducts.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </section>

    </div>
  );
}