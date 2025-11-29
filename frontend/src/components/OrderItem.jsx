import { useState, useEffect } from 'react';
import './OrderItem.css'
// import toast from "react-hot-toast";

const OrderItem = (props) => {
//   const [popup, setPopup] = useState(false); // Tracks whether AuthPopup should be displayed
//   const [amountInCart, setAmountInCart] = useState(0);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     async function init() {
//       const cartres = await props.getCart();
//       if (cartres.success) {
//         setCart(cartres.data.items);
//         const item = cartres.data.items.find(c =>
//           String(c.menuItem) === String(props.id)
//         );
//         console.log(item);
//         setAmountInCart(item ? item.quantity : 0);
//       }
//     }
//     init();
//   }, [props.id]);

//   function togglePopup () {
//     let prev = popup;
//     setPopup(!prev);
//   };

//   function incAmountInCart() {
//     const newAmount = amountInCart + 1;
//     setAmountInCart(newAmount);
//   }

//   function decAmountInCart() {
//     const newAmount = amountInCart - 1;
//     setAmountInCart(newAmount);
//   }

  // If click on link as a guest, set popup to true to display the AuthPopup
//   const handleCartBtnClick = (e) => {
//     if (props.user === "guest") {
//       e.preventDefault(); // Prevent navigation
//       setPopup(true); // Show the AuthPopup
//       toast('Please sign in first!', { icon: '🤔',});
//     }
//   };

  // Handle click on add to cart. If user == "guest", engage unauthorized access functionality
  // If user is auth'd, perform addToCart
//   async function handleAddToCart(e) {
//     if (props.user === "guest") {
//       handleCartBtnClick(e);
//     } else {
//       const result = await props.updCartItemQty(props.id, 1);
//       if (result.success) {
//         toast.success("Added item to cart");
//         incAmountInCart();
//       } else {
//         console.log(result.message);
//         toast.error("Something went wrong. Try again?");
//       }
//     }
//   };

  console.log(props);
  return (
    <div className='order-group'>
      <div className="order-item">
        <p>{props.status}</p>

        <div className="order-item-text">
          <p>Order was made {props.createdAt}</p>
          <p className='order-item-desc'>Deliver to: {props.dropoffBuilding}</p>
          <p className="order-item-desc">{props.dropoffDetails}</p>
        </div>

        <div className="order-item-right">
          <p className="order-price">Total: ${props.total}</p>
          {/* <div className='menu-buttons'>
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
          </div> */}
        </div>
      </div>
      {/* {popup && (
        <AuthPopup
          useMode={"login"}
          toggle={togglePopup}
          logInUser={props.logInUser}
          signUpUser={props.signUpUser}
        />
      )} */}
    </div>
  );
};

export default OrderItem;