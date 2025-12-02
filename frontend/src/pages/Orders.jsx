import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Menu.css'
import '../components/AuthPopup.css'
import UserOrders from '../components/UserOrders'
import RetrieverOrders from '../components/RetrieverOrders'
import RetrieverWorkOrders from '../components/RetrieverWorkOrders'
const Orders = (props) => {
//   const location = useLocation();
//   const stateData = location.state;
  // const [usersOrders, setUsersOrders] = useState([]);
	const [mode, setMode] = useState("user");
//   const [searchedItems, setSearchedItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (props.userInfo && props.userInfo.permission) {
      if (props.userInfo.permission === "retriever" || props.userInfo.permission === "admin") {
        setMode("retriever");
      } else {
        setMode("user");
      }
    }
  }, [props.userInfo]);

  async function handleModeChange(newMode) {
    setMode(newMode);
    console.log("new mode", newMode);
  }

  return (
    <div className='menu'>
      <h1>Orders</h1>
			<div className='menu-header'>
				{mode === "user" && <p>Your order history</p>}
        {mode === "retriever" && <p>All available orders</p>}
        {mode === "retrieverWork" && <p>Orders you have claimed</p>}
				{/* <button
					className="toggle-auth-link"
					onClick={() => setMode(mode === "user" ? "retriever" : "user")}
				>
					{mode === "user" ? "View all available orders" : "View your own orders"}
				</button> */}
          {/* {props.userInfo.permission === "retriever" && 
            <div className="dropdown-content">
              <Link to="/orders" onClick={() => handleModeChange("user")}>{props.userInfo.name}'s orders</Link>
              <Link to="/orders" onClick={() => handleModeChange("retriever")}>All available orders</Link>
              <Link to="/orders" onClick={() => handleModeChange("retrieverWork")}>Orders you have claimed</Link>
            </div>
          } */}
				<div className="dropdown">
          <button className="dropbtn">Change view</button>
          <div className="dropdown-content">
            <Link to="/orders" onClick={() => handleModeChange("user")}>{props.userInfo.name}'s orders</Link>
            {props.userInfo.permission === "retriever" && <Link to="/orders" onClick={() => handleModeChange("retriever")}>All available orders</Link>}
            {props.userInfo.permission === "retriever" && <Link to="/orders" onClick={() => handleModeChange("retrieverWork")}>Orders you have claimed</Link>}
          </div>
        </div>
			</div>
			{mode === "user" && <UserOrders mode={mode} getUserById={props.getUserById} getMyOrders={props.getMyOrders} getRestaurantName={props.getRestaurantName} />}
			{mode === "retriever" && <RetrieverOrders mode={mode} getUserById={props.getUserById} getOrders={props.getOrders} claimOrder={props.claimOrder} getRestaurantName={props.getRestaurantName} />}
      {mode === "retrieverWork" && <RetrieverWorkOrders mode={mode} getUserById={props.getUserById} getOrders={props.getOrders} claimOrder={props.claimOrder} getWork={props.getWork} getRestaurantName={props.getRestaurantName} updateOrderStatus={props.updateOrderStatus} />}
		</div>
  );
};

export default Orders;