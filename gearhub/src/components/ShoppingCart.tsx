import "../ShoppingCart.css";

export default function ShoppingCart() {
  return (
    <aside className="shopping-cart">

      <h2>Shopping Cart</h2>

      <div className="empty-cart">
        <p>Your cart is empty.</p>
      </div>

      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>$0.00</strong>
        </div>

        <button>
          Checkout
        </button>
      </div>

    </aside>
  );
}