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
			console.log(result.data);
		} else {
			console.log(result.message);
      setMainOrders([]);
		}
	}

  useEffect(() => {
    fetchOrders();
  }, []);


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