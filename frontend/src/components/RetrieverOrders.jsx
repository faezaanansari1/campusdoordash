import { useState, useEffect } from 'react';
import '../pages/Menu.css'
import '../pages/Catalog.css'
import './AuthPopup.css'
import OrderItem from './OrderItem'

const UserOrders = (props) => {
  const [mainOrders, setMainOrders] = useState([]);

	async function fetchOrders() {
		const result = await props.getOrders();
		if (result.success) {
			setMainOrders(result.data);
			console.log(result.data);
		} else {
			console.log(result.message);
		}
	}

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div>
      <div className='filters'>
      </div>

      {/* {!props.mainOrders ? (
        <p>Loading orders...</p>
      ) : props.mainOrders.length === 0 ? (
        <p>Order history is empty.</p>
      ) : (
      props.mainOrders
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
      )))} */}
    </div>
  );
};

export default UserOrders;