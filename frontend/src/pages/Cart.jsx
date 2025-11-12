import "./Cart.css";
import { useState, useEffect } from 'react';

const Cart = (props) => {
  const sumPrices = (items) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0);
  };
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(sumPrices(props.cart).toFixed(2));
  }, [props.cart])

  return (
    <div className="cart">

      <h1>{props.user}'s cart</h1>

      <div className="cart-layout">

        <div className="cart-items">
          <ul>
          {props.cart.map(item => (
              <li key={item.price}>
                  {item.name} ${item.price}
                  <button
                  onClick={(e) => {
                      e.stopPropagation();
                      props.removeFromCart(item.id)
                  }}
                  className="pay-btn"
                  >Remove from cart</button>
              </li>
          ))}
          </ul>
          {/* {cartItems.length === 0 && (
            <p>Your cart is empty.</p>
          )} */}
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total}</span>
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
            <span>${total}</span>
          </div>

          <button className="pay-btn">Place order</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;