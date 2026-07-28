import "../styles/product.css";
import pop from "../assets/pop.jpg";
import teddy from "../assets/teddy.jpg";
import car from "../assets/car.jpg";
import barbie from "../assets/barbie.jpg";
import kitty from "../assets/kitty.jpg";

export default function Toys() {
  const products = [
    {
      id: 1,
      name: "Popping Toys",
      price: "₱75",
      image: pop,
    },
    {
      id: 2,
      name: "Giant Pink Teddy Bear",
      price: "₱250",
      image: teddy,
    },
    {
      id: 3,
      name: "Remote Control Car",
      price: "₱75",
      image: car,
    },
    {
      id: 4,
      name: "Barbie Doll",
      price: "₱120",
      image: barbie,
    },
    {
      id: 5,
      name: "Hello Kitty Plush",
      price: "₱150",
      image: kitty,
    },
  ].sort((a, b) => {
    const priceA = Number(a.price.replace(/[^\d]/g, ""));
    const priceB = Number(b.price.replace(/[^\d]/g, ""));
    return priceA - priceB;
  });

  return (

    
    <div className="school-page">
      <h1>Toys</h1>

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