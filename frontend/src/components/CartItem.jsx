import { useState, useEffect } from 'react';
import './CartItem.css'
import toast from "react-hot-toast";

const MenuItem = (props) => {
  const [amountInCart, setAmountInCart] = useState(0);

	// Initialize the item's quantity
  useEffect(() => {
    async function init() {
			setAmountInCart(props.quantity);
		}
    init();
  }, [props.quantity]);

  function incAmountInCart() {
    const newAmount = amountInCart + 1;
    setAmountInCart(newAmount);
  }

  function decAmountInCart() {
    const newAmount = amountInCart - 1;
    setAmountInCart(newAmount);
  }

  // Handle click on add to cart.
  async function handleAddToCart(e) {
		e.preventDefault();
		const result = await props.updCartItemQty(props.id, 1);
		if (result.success) {
			toast.success("Added 1 item to cart");
			incAmountInCart();
      props.increaseTotalUI(props.price);
		} else {
			console.log(result.message);
			toast.error("Something went wrong. Try again?");
		}
  };

  // Handle click on sub from cart.
  async function handleSubFromCart(e) {
		e.preventDefault();
		if (amountInCart > 0) {
			const result = await props.updCartItemQty(props.id, -1);
			if (result.success) {
				toast.success("Removed item from cart");
				decAmountInCart();
        props.decreaseTotalUI(props.price, 1);
			} else {
				console.log(result.message);
				toast.error("Something went wrong. Try again?");
			}
		}
  };

  // Handle click on remove from cart (removes all item quantities)
  async function handleRemoveFromCart(e) {
		e.preventDefault();
		const result = await props.removeFromCart(props.idInCart);
		if (result.success) {
			toast('Removed from your cart', { icon: '🚮',});
			props.removeFromCartUI(props.idInCart);
      props.decreaseTotalUI(props.price, amountInCart);
		} else {
			console.log(result.message);
			toast.error("Something went wrong. Try again?");
		}
  };

  return (
    <div className='cart-group'>
      <div className="cart-item">
        <img className="cart-item-img" src={props.img} alt="" />

        <div className="cart-item-text">
          <p>{props.name}</p>
        </div>

        <div className="cart-item-right">
          <p className="cart-price">${props.price.toFixed(2)} each</p>
          <p className="cart-price">{amountInCart} in cart</p>
          <div className='cart-buttons'>
            <button
              onClick={handleAddToCart}
              className="cart-btn"
            >
              +
            </button>
            <button
            onClick={handleSubFromCart}
            className="cart-btn"
            >
              -
            </button>
            <button
              onClick={handleRemoveFromCart}
              className="cart-btn"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;