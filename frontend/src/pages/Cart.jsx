import "./Cart.css";
import { useState, useEffect } from 'react';
import api from "../lib/axios";
import toast from "react-hot-toast";

const Cart = (props) => {
  // const sumPrices = (items) => {
  //   return items.reduce((total, item) => {
  //     return total + parseFloat(item.price);
  //   }, 0);
  // };
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function getCart() {
    if (refresh === true) setRefresh(false);
    try {
        const response = await api.get(`/cart/getCart`);
        console.log(response);
        setCart(response.data.items);
        setTotal(response.data.subtotal);
    } catch (error) {
        console.log("Error getting cart", error);
    }
  };

  async function updateCart(itemID, quantity) {
    try {
        const response = await api.put(`/cart/updateItemQty/${itemID}`, {
          quantity
        });
        console.log(response);
        setRefresh(true);
    } catch (error) {
        console.log("Error updating cart", error);
    }
  };

  async function removeFromCart(itemID) {
    try {
        const response = await api.delete(`/cart/removeItem/${itemID}`);
        console.log(response);
        setRefresh(true);
    } catch (error) {
        console.log("Error updating cart", error);
    }
  };

  useEffect(() => {
    // Get cart items
    getCart();
  }, [refresh])

  return (
    <div className="cart">

      <h1>{props.user}'s cart</h1>

      <div className="cart-layout">

        <div className="cart-items">
          <ul>
          {cart.map(item => (
              <li key={item.price}>
                  ${item.price} {item.name}, {item.quantity} in cart
                  <div className="buttons">
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        updateCart(item._id, item.quantity+1);
                    }}
                    className="pay-btn"
                    >Add 1</button>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        updateCart(item._id, item.quantity-1);                        
                    }}
                    className="pay-btn"
                    >Remove 1</button>
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item._id)
                    }}
                    className="pay-btn"
                    >Remove from cart</button>
                  </div>
              </li>
          ))}
          </ul>
          {cart.length === 0 && (
            <p>Your cart is empty.</p>
          )}
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

          <button
          className="pay-btn"
          onClick={(e) => {
              e.stopPropagation();
              
          }}
          >Place order</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;