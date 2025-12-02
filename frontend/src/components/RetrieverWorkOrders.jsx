import { useState, useEffect } from 'react';
import '../pages/Menu.css'
import '../pages/Catalog.css'
import OrderItem from './OrderItem'

const RetrieverWorkOrders = (props) => {
  const [mainOrders, setMainOrders] = useState(null);

	async function fetchWorkOrders() {
		const result = await props.getWork();
		if (result.success) {
            setMainOrders([...result.data.active, ...result.data.history]);
            console.log(result);
		} else {
			console.log(result.message);
      setMainOrders([]);
		}
	}

  // completeOrder
	async function completeOrder(id) {
		const result = await props.updateOrderStatus(id);
		if (result.success) {
            // Update UI
            console.log(result.data);
		} else {
            console.log(result.message);
		}
	}

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  // claimOrder
	// async function retrieveOrder(id) {
	// 	const result = await props.claimOrder(id);
	// 	if (result.success) {
    //   // TODO UPDATE UI
	// 		console.log(result.data);
	// 	} else {
	// 		console.log(result.message);
	// 	}
	// }


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
          restaurant={item.restaurant}
          total={item.total}
          dropoffBuilding={item.dropoff.building}
          dropoffDetails={item.dropoff.details}
          items={item.items}
          status={item.status}
          getUser={props.getUserById}
        //   retrieveOrder={retrieveOrder}
          getRestaurantName={props.getRestaurantName}
          completeOrder={props.updateOrderStatus}
        />
      )))} 
    </div>
  );
};

export default RetrieverWorkOrders;