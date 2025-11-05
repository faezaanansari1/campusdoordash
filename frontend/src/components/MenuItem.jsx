import './MenuItem.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const MenuItem = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className='Menu'>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.calories}</p>
        <p>${props.price.toFixed(2)}</p>
        <button
        onClick={(e) => {
            e.stopPropagation();
            if (props.user === "User") {
                navigate('/');
            } else {
                const randNum = Math.random();
                props.addToCart({"name": props.name, "price": props.price, "id": randNum});
                console.log("added to cart");
            }
        }}
        className="cart-btn"
        >Add to cart</button>
        <br></br>
    </div>
  );
};

export default MenuItem;