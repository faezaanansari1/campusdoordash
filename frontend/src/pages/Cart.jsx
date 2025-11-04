import "./Cart.css";

const Cart = () => {
  const cartItems = [];     

  return (
    <div className="cart">

      <h1>Cart</h1>

      <div className="cart-layout">

        <div className="cart-items">
          {cartItems.length === 0 && (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>$0.00</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>$0.00</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>$0.00</span>
          </div>

          <button className="pay-btn">Continue to Payment</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
