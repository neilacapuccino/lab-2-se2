import "../homePage.css";

// Hero Image
import heroImage from "../assets/products/hero.jpg";

// Product Images
import headphone from "../assets/products/hp-01.jpg";
import charger from "../assets/products/charger.jpg";
import phoneCase from "../assets/products/phoneCase.jpg";
import cable from "../assets/products/cable.jpg";
import keyboard from "../assets/products/kb-03.jpg";
import mouse from "../assets/products/ms-02.jpg";
import FeaturedCategories from "../components/featuredCategories";

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  stock: boolean;
}

interface HomePageProps {
  searchQuery: string;
  category: string;
}

export default function HomePage({
  searchQuery,
  category,
}: HomePageProps) {
  const products: Product[] = [
    {
      id: 1,
      category: "Headphones",
      name: "Pro Wireless ANC Headphones",
      price: 189.99,
      image: headphone,
      stock: true,
    },
    {
      id: 2,
      category: "Chargers",
      name: "100W GaN Desktop Charger",
      price: 69.99,
      image: charger,
      stock: true,
    },
    {
      id: 3,
      category: "Cases",
      name: "Carbon Fiber MagSafe Case",
      price: 34.99,
      image: phoneCase,
      stock: true,
    },
    {
      id: 4,
      category: "Cables",
      name: "USB-C DisplayPort Braided Cable",
      price: 24.99,
      image: cable,
      stock: true,
    },
    {
      id: 5,
      category: "Keyboards",
      name: "Mechanical Wireless Keyboard 75%",
      price: 129.99,
      image: keyboard,
      stock: true,
    },
    {
      id: 6,
      category: "Mouse",
      name: "Precision Wireless Mouse",
      price: 89.99,
      image: mouse,
      stock: false,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="homepage">
      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">
            New Arrivals Stocked Daily
          </span>

          <h1>
            Discover Premium Tech Gear
          </h1>

          <p>
            Shop the latest hand-picked, premium-grade accessories
            carefully crafted to upgrade and power up your daily
            devices.
          </p>

          <button className="shop-btn">
            Shop Now
          </button>
        </div>

        <div className="hero-right">
          <img
            src={heroImage}
            alt="Hero"
          />
        </div>
      </section>

      {/* ================= FEATURED CATEGORIES ================= */}

      <FeaturedCategories />

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="products">
        <div className="section-header">
          <h2>Featured Products</h2>

          <button className="view-btn">
            View All Products
          </button>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
              >
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="product-info">
                  <div className="product-top">
                    <span className="category">
                      {product.category}
                    </span>

                    <span
                      className={
                        product.stock
                          ? "stock in"
                          : "stock out"
                      }
                    >
                      {product.stock
                        ? "• In Stock"
                        : "• Out of Stock"}
                    </span>
                  </div>

                  <h3>{product.name}</h3>

                  <h4>
                    ${product.price.toFixed(2)}
                  </h4>

                  <button className="cart-btn">
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h3>No products found.</h3>

              <p>
                Try another search or choose a different
                category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}