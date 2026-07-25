import { Link } from "react-router-dom";

import "../styles/gadgets.css";
import phone from "../assets/phone.jpg";
import laptop from "../assets/laptop.jpg"
import headset from "../assets/headset.jpg";
import keyboard from "../assets/keyboard.jpg";
import mouse from "../assets/mouse.jpg";

export default function Gadgets() {
    const products = [
        {
            id: 1,
            name: "Vivo",
            price: "₱11,500",
            image: phone,
        },
        {
            id: 2,
            name: "Acer Predator Helios 300",
            price: "₱96,000",
            image: laptop,
        },{
            id: 3,
            name: "Wireless Headset",
            price: "₱999",
            image: headset,
        },
        {
            id: 4,
            name: "Mechanical Keyboard",
            price: "₱499",
            image: keyboard,
        },
        {
            id: 5,
            name: "Wireless Mouse",
            price: "₱459",
            image: mouse,
        },
    ];

    return (
        <div className="gadget-page">
            <h1>Gadgets</h1>

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