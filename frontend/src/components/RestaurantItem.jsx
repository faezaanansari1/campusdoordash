import './RestaurantItem.css'
import { Link } from 'react-router-dom';

const RestaurantItem = (props) => {
  // console.log(props);
  return (
    <div className='card'>
      <Link to={`/catalog/${props.id}`}  state={{name: props.name, restaurantId: props.id}} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={props.img} alt="" />
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <div className='card-footer'>
          <i>Location: {props.loc}</i>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantItem;