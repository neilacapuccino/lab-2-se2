import "../homePage.css";
import heroImage from "../assets/products/hero.jpg";
import FeaturedCategories from "../components/featuredCategories";
import { products } from "../data/products";

interface HomePageProps {
  searchQuery: string;
  category: string;
}

export default function HomePage({
  searchQuery,
  category,
}: HomePageProps) {
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
                        product.inStock
                          ? "stock in"
                          : "stock out"
                      }
                    >
                      {product.inStock
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