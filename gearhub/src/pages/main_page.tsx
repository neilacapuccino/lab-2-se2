import { useState } from "react";
import "../styles/main_page.css";
import keyboard from "../assets/keyboard.jpg";
import mouse from "../assets/mouse.jpg";
import headset from "../assets/headset.jpg";

export default function MainPage() {
  // State
  const [search, setSearch] = useState("");

  // Products
  const products = [
    {
      name: "Mechanical Keyboard",
      price: "$59.99",
      image: keyboard,
    },
    {
      name: "Gaming Mouse",
      price: "$39.99",
      image: mouse,
    },
    {
      name: "Wireless Headset",
      price: "$89.99",
      image: headset,
    },
  ];

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-page">

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
            <p>{product.price}</p>
          </div>
        ))}
      </section>

    </div>
  );
}