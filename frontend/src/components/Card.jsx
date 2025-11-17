import './Card.css'
import { Link } from 'react-router-dom';

const Card = (props) => {
  // console.log(props);
  return (
    <div className='card'>
      <Link to={`/catalog/${props.id}`}  state={{name: props.name, restaurantId: props.id}} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={props.img} alt="" />
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <i>Location: {props.loc}</i>
      </Link>
    </div>
  );
};

export default Card;