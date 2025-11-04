import { Link } from 'react-router-dom';

const Cart = (props) => {
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
    </div>
  );
};

export default Cart;