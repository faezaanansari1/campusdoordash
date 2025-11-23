import './MenuItem.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const MenuItem = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className='menu-group'>
      <div className="menu-item">
        <img className="menu-item-img" src={props.img} alt="" />

        <div className="menu-item-text">
          <p>{props.name}</p>
          <p className='menu-item-desc'>{props.description}</p>
          <p className="menu-calories">{props.calories} calories</p>
        </div>

        <div className="menu-item-right">
          <p className="menu-price">${props.price.toFixed(2)}</p>
          <p className="menu-price">0 in cart</p>
          <div className='menu-buttons'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (props.user === "guest") {
                  navigate('/');
                } else {
                  props.addToCart(props.id);
                }
              }}
              className="cart-btn"
            >
              +
            </button>
            <button
            className="cart-btn"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;