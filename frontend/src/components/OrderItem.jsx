import { useState, useEffect } from 'react';
import './OrderItem.css'
// import toast from "react-hot-toast";

const OrderItem = (props) => {
//   const [popup, setPopup] = useState(false);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [retrieverInfo, setRetrieverInfo] = useState([]);
  async function fetchCustomerInfo() {
    const result = await props.getUser(props.customer);
    if (result.success) {
      setCustomerInfo(result.data.data);
    } else {
      console.log(result.message);
    }
  }

  async function fetchRetrieverInfo() {
    const result = await props.getUser(props.retriever);
    if (result.success) {
      setRetrieverInfo(result.data.data);
    } else {
      console.log(result.message);
    }
  }

  useEffect(() => {
    fetchCustomerInfo();
    if (props.retriever){ 
      fetchRetrieverInfo();
    } else {
      setRetrieverInfo({name: "none"});
    }
  }, []);


  // When user clicks on retrieve an order
  function handleRetrieve() {
    props.retrieveOrder(props.id);
  }

  return (
    <div className='order-group'>
      <div className="order-item">
        <div className='info'>
          <p>{props.status}</p>
          <p className='order-item-desc'>Placed by: {customerInfo.name}</p>
          <p className='order-item-desc'>Retrieving: {retrieverInfo.name}</p>
        </div>

        <div className="order-item-text">
          <p>Order was made {props.createdAt}</p>
          <p className='order-item-desc'>Deliver to: {props.dropoffBuilding}</p>
          <p className="order-item-desc">{props.dropoffDetails}</p>
        </div>

        <div className="order-item-right">
          <p className="order-price">Total: ${props.total}</p>
          <div className='menu-buttons'>
            {props.mode === "retriever" ? 
              <button onClick={handleRetrieve}>Retrieve order</button> : 
              <button>Delete order</button>}
          </div>
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