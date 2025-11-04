// import './Card.css'
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
  return (
    <div className='Menu'>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.calories}</p>
        <p>${props.price.toFixed(2)}</p>
        <button
        onClick={(e) => {
            e.stopPropagation();
            props.addToCart({"name": props.name, "price": props.price});
            console.log("added to cart");
        }}
        className="like-btn"
        >Add to cart</button>
        <br></br>
    </div>
  );
};

export default MenuItem;