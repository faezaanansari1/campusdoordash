import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Menu.css'
import OrderItem from '../components/OrderItem'
const Orders = (props) => {
//   const location = useLocation();
//   const stateData = location.state;
  const [mainOrders, setMainOrders] = useState([]);
//   const [searchedItems, setSearchedItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      const result = await props.getMyOrders();
      if (result.success) {
        setMainOrders(result.data);
        console.log(result.data);
      } else {
        console.log(result.message);
      }
    }

    fetchOrders();
    console.log(mainOrders);
  }, []);

  return (
    <div className='menu'>
      <h1>Orders</h1>
      <p>Your order history</p>
      <div className='filters'>
      </div>

      {!mainOrders ? (
        <p>Loading orders...</p>
      ) : mainOrders.length === 0 ? (
        <p>Order history is empty.</p>
      ) : (
      mainOrders
      .map((item, index) => (
        <OrderItem
          key={index}
          createdAt={item.createdAt}
          total={item.total}
          dropoffBuilding={item.dropoff.building}
          dropoffDetails={item.dropoff.details}
          items={item.items}
          status={item.status}
        />
      )))}
    </div>
  );
};

export default Orders;