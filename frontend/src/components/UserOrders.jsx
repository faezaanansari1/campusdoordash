import { useState, useEffect } from 'react';
import '../pages/Menu.css'
import '../pages/Catalog.css'
import './AuthPopup.css'
import OrderItem from './OrderItem'

const UserOrders = (props) => {
  const [mainOrders, setMainOrders] = useState([]);

	async function fetchUsersOrders() {
		const result = await props.getMyOrders();
		if (result.success) {
				setMainOrders(result.data);
				console.log(result.data);
		} else {
				console.log(result.message);
		}
	}

  useEffect(() => {
    fetchUsersOrders();
  }, []);


  return (
    <div>
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

export default UserOrders;