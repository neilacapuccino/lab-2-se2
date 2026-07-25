import "../styles/school_supplies.css";

import notebook from "../assets/notebook.jpg";
import pen from "../assets/pen.jpg";
import pencil from "../assets/pencil.jpg";
import eraser from "../assets/eraser.jpg";

export default function SchoolSupplies() {
  const products = [
    {
      id: 1,
      name: "Notebook",
      price: "₱75",
      image: notebook,
    },
    {
      id: 2,
      name: "Ballpen",
      price: "₱100",
      image: pen,
    },
    {
      id: 3,
      name: "Pencil",
      price: "₱75",
      image: pencil,
    },
    {
      id: 4,
      name: "Eraser",
      price: "₱50",
      image: eraser,
    },
  ];

  return (
    <div className="school-page">
      <h1>School Supplies</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}