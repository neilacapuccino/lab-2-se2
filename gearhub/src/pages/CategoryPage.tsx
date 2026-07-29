import "../CategoryPage.css";

import { useParams } from "react-router-dom";

import { products } from "../data/products";

import CategorySidebar from "../components/categorySidebar";
import ProductGrid from "../components/ProductGrid";
import ShoppingCart from "../components/ShoppingCart";

export default function CategoryPage() {
  const { category } = useParams();

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() ===
            category?.toLowerCase()
        );

  return (
    <div className="category-page">

      <div className="category-header">
        <h1>
          {category === "all"
            ? "All Products"
            : (category ?? "").charAt(0).toUpperCase() + (category ?? "").slice(1)}
        </h1>

        <p>
          {filteredProducts.length} Product
          {filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="category-layout">
        <CategorySidebar />
        <ProductGrid products={filteredProducts} />
        <ShoppingCart />
      </div>

    </div>
  );
}