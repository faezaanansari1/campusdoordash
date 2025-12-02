import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Menu.css'
import '../components/AuthPopup.css'
import UserOrders from '../components/UserOrders'
import RetrieverOrders from '../components/RetrieverOrders'
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

  return (
    <div className='menu'>
      <h1>Orders</h1>
			<div className='menu-header'>
				{mode === "user" ? <p>Your order history</p> : <p>All available orders</p>}
				<button
					className="toggle-auth-link"
					onClick={() => setMode(mode === "user" ? "retriever" : "user")}
				>
					{mode === "user" ? "View all available orders" : "View your own orders"}
				</button>
			</div>
			{mode === "user" && <UserOrders getMyOrders={props.getMyOrders} />}
			{mode === "retriever" && <RetrieverOrders getOrders={props.getOrders} />}
		</div>
  );
};

export default Orders;