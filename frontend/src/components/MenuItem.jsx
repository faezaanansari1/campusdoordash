import { useState } from 'react';
import AuthPopup from './AuthPopup'
import './MenuItem.css'
import toast from "react-hot-toast";

const MenuItem = (props) => {
  const [popup, setPopup] = useState(false); // Tracks whether AuthPopup should be displayed
  
  function togglePopup () {
    let prev = popup;
    setPopup(!prev);
  };

  // If click on link as a guest, set popup to true to display the AuthPopup
  const handleCartBtnClick = (e) => {
    if (props.user === "guest") {
      e.preventDefault(); // Prevent navigation
      setPopup(true); // Show the AuthPopup
      toast('Please sign in first!', { icon: '🤔',});
    }
  };

  // Click on add to cart. If user == "guest", engage unauthorized access functionality
  // If user is auth'd, perform addToCart
  async function handleAddToCart(e) {
    if (props.user === "guest") {
      handleCartBtnClick(e);
    } else {
      const result = await props.addToCart(props.id);
      if (result.success) {
        toast.success("Added item to cart");
      } else {
        console.log(result.message);
        toast.error("Something went wrong. Try again?");
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
          <p className="menu-price">0 in cart</p>
          <div className='menu-buttons'>
            <button
              onClick={handleAddToCart}
              className="cart-btn"
            >
              +
            </button>
            <button
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