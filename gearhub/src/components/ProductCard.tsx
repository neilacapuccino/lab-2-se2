import "../ProductCard.css";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <div className="product-top">
          <span className="product-category">
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
              ? "● In Stock"
              : "● Out of Stock"}
          </span>
        </div>

        <h3>{product.name}</h3>

        <h4>
          ${product.price.toFixed(2)}
        </h4>

        <button className="cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}