import { Link } from 'react-router-dom';

const Cart = (props) => {
  return (
    <div>
        <h1>Hi, User, here is your cart.</h1>
        <ul>
        {props.cart.map(item => (
            <li key={item.price}>
                {item.name}
            </li>
        ))}
        </ul>
    </div>
  );
};

export default Cart;