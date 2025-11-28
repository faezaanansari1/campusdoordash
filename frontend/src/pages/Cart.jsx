import CartItem from '../components/CartItem'
import "./Cart.css";
import shackimg from '../assets/halalshack.png'
import { useState, useEffect } from 'react';

const Cart = (props) => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  // Gets the cart items and subtotal
  useEffect(() => {
    async function init() {
      const cartres = await props.getCart();
      if (cartres.success) {
        console.log(cartres);
        setCart(cartres.data.items);
        setTotal(cartres.data.subtotal);
      }
    }
    init();
  }, []);

  const removeFromCartUI = (IDToRemove) => {
    setCart(prev => prev.filter(item => item._id !== IDToRemove));
  }

  return (
    <div className="cart">
      <h1>{props.user}'s cart</h1>

      <div className="cart-layout">
        
        <div className="cart-items">
          {cart.map((item, index) => (
            <CartItem
              key={index}
              name={item.name}
              img={shackimg}
              price={item.price}
              idInCart={item._id}
              id={item.menuItem}
              quantity={item.quantity}
              updCartItemQty={props.updCartItemQty}
              removeFromCart={props.removeFromCart}
              removeFromCartUI={removeFromCartUI}
            />
          ))}
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