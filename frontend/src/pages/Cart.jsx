import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Cart = (props) => {
  const sumPrices = (items) => {
    return items.reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0);
  };
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(sumPrices(props.cart).toFixed(2));
  }, [props.cart])

  return (
    <div>
        <h1>Hi, {props.user}, here is your cart.</h1>
        <ul>
        {props.cart.map(item => (
            <li key={item.price}>
                {item.name} ${item.price}
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    props.removeFromCart(item.id)
                }}
                >Remove from cart</button>
            </li>
        ))}
        </ul>
        <p>Total: ${total}</p>
    </div>
  );
};

export default Cart;