import { useState, useEffect } from 'react';
import '../pages/Menu.css'
import '../pages/Catalog.css'
import './AuthPopup.css'
import OrderItem from './OrderItem'

const UserOrders = (props) => {
  const [mainOrders, setMainOrders] = useState(null);

	async function fetchOrders() {
		const result = await props.getOrders();
		if (result.success) {
			setMainOrders(result.data);
      console.log("get orders in retrieverorders");
			console.log(result.data);
		} else {
			console.log(result.message);
      setMainOrders([]);
		}
	}

  useEffect(() => {
    fetchOrders();
  }, []);

  // claimOrder
	async function retrieveOrder(id) {
		const result = await props.claimOrder(id);
		if (result.success) {
      // TODO UPDATE UI
			console.log(result.data);
		} else {
			console.log(result.message);
		}
	}


  return (
    <div>
      <div className='filters'>
      </div>

       {mainOrders === null ? (
        <p>Loading orders...</p>
      ) : mainOrders.length === 0 ? (
        <p>Order history is empty.</p>
      ) : (
      mainOrders
      .map((item) => (
        <OrderItem
          key={item._id}
          id={item._id}
          mode={props.mode}
          createdAt={item.createdAt}
          customer={item.customer}
          retriever={item.retriever}
          total={item.total}
          dropoffBuilding={item.dropoff.building}
          dropoffDetails={item.dropoff.details}
          items={item.items}
          status={item.status}
          getUser={props.getUserById}
          retrieveOrder={retrieveOrder}
        />
      )))} 
    </div>
  );
};

export default UserOrders;