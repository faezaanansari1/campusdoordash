import CartItem from '../components/CartItem'
import OrderConfirmPopup from '../components/OrderConfirmPopup'
import "./Cart.css";
import { useState, useEffect } from 'react';

const Cart = (props) => {
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState(false)

  // Gets the cart items and subtotal
  useEffect(() => {
    async function init() {
      const cartres = await props.getCart();
      if (cartres.success) {
        console.log(cartres);
        const data = cartres.data;
        setCart(data.items);
        setSubtotal(data.subtotal);
        setDeliveryFee(data.deliveryFee);
        setTax(data.tax);
        setTotal(data.total);
      }
    }
    init();
  }, []);

  function togglePopup () {
    let prev = confirmPopup;
    setConfirmPopup(!prev);
  };

  // Used in calculating total, avoids float issues
  function toCents(moneyString) {
    return Math.round(parseFloat(moneyString) * 100);
  }

  // Used in calculating total, avoids float issues
  function toDollars(cents) {
    return (cents / 100).toFixed(2);
  }

  const removeFromCartUI = (IDToRemove) => {
    setCart(prev => prev.filter(item => item._id !== IDToRemove));
  }

  const increaseTotalUI = (price) => {
    const newTotal = toCents(total) + toCents(price);
    // console.log(total, newTotal);
    setTotal(toDollars(newTotal));
  }

  const decreaseTotalUI = (price, amountInCart) => {
    const newTotal = toCents(total) - (toCents(price) * amountInCart);
    // console.log(total, newTotal);
    setTotal(toDollars(newTotal));
  }

  function clearCart () {
    setCart([]);
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
              img={item.image_url}
              price={item.price}
              idInCart={item._id}
              id={item.menuItem}
              quantity={item.quantity}
              addItem={props.addItem}
              removeItem={props.removeItem}
              removeFromCart={props.removeFromCart}
              removeFromCartUI={removeFromCartUI}
              increaseTotalUI={increaseTotalUI}
              decreaseTotalUI={decreaseTotalUI}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed ? subtotal.toFixed(2) : subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed ? deliveryFee.toFixed(2) : deliveryFee}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed ? tax.toFixed(2) : tax}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed ? total.toFixed(2) : total}</span>
          </div>

          <button 
          onClick={togglePopup}
          className="pay-btn">
          Place order
          </button>
        </div>
      </div>
      {confirmPopup ? <OrderConfirmPopup  total={total} usersEmail={props.usersEmail} clearCart={clearCart} toggle={togglePopup} createOrder={props.createOrder} /> : null}
    </div>
  );
};

export default Cart;