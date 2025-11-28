import { useState, useEffect } from 'react';
import AuthPopup from './AuthPopup'
import './MenuItem.css'
import toast from "react-hot-toast";

const MenuItem = (props) => {
  const [popup, setPopup] = useState(false); // Tracks whether AuthPopup should be displayed
  const [amountInCart, setAmountInCart] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function init() {
      const cartres = await props.getCart();
      if (cartres.success) {
        setCart(cartres.data.items);
        const item = cartres.data.items.find(c =>
          String(c.menuItem) === String(props.id)
        );
        console.log(item);
        setAmountInCart(item ? item.quantity : 0);
      }
    }
    init();
  }, [props.id]);

  function togglePopup () {
    let prev = popup;
    setPopup(!prev);
  };

  function incAmountInCart() {
    const newAmount = amountInCart + 1;
    setAmountInCart(newAmount);
  }

  function decAmountInCart() {
    const newAmount = amountInCart - 1;
    setAmountInCart(newAmount);
  }

  // If click on link as a guest, set popup to true to display the AuthPopup
  const handleCartBtnClick = (e) => {
    if (props.user === "guest") {
      e.preventDefault(); // Prevent navigation
      setPopup(true); // Show the AuthPopup
      toast('Please sign in first!', { icon: '🤔',});
    }
  };

  // Handle click on add to cart. If user == "guest", engage unauthorized access functionality
  // If user is auth'd, perform addToCart
  async function handleAddToCart(e) {
    if (props.user === "guest") {
      handleCartBtnClick(e);
    } else {
      const result = await props.updCartItemQty(props.id, 1);
      if (result.success) {
        toast.success("Added item to cart");
        incAmountInCart();
      } else {
        console.log(result.message);
        toast.error("Something went wrong. Try again?");
      }
    }
  };

  // Handle click on sub from cart. If user == "guest", engage unauthorized access functionality
  // If user is auth'd, perform addToCart
  async function handleSubFromCart(e) {
    if (props.user === "guest") {
      handleCartBtnClick(e);
    } else {
      if (amountInCart > 0) {
        const result = await props.updCartItemQty(props.id, -1);
        if (result.success) {
          toast.success("Removed item from cart");
          decAmountInCart();
        } else {
          console.log(result.message);
          toast.error("Something went wrong. Try again?");
        }
      }
    }

  };

  return (
    <div className='menu-group'>
      <div className="menu-item">
        <img className="menu-item-img" src={props.img} alt="" />

        <div className="menu-item-text">
          <p>{props.name}</p>
          <p className='menu-item-desc'>{props.description}</p>
          <p className="menu-calories">{props.calories} calories</p>
        </div>

        <div className="menu-item-right">
          <p className="menu-price">${props.price.toFixed(2)}</p>
          <p className="menu-price">{amountInCart} in cart</p>
          <div className='menu-buttons'>
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
          </div>
        </div>
      </div>
      {popup && (
        <AuthPopup
          useMode={"login"}
          toggle={togglePopup}
          logInUser={props.logInUser}
          signUpUser={props.signUpUser}
        />
      )}
    </div>
  );
};

export default MenuItem;