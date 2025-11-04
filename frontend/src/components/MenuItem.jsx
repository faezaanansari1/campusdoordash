// import './Card.css'
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
  return (
    <div className='Menu'>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.calories}</p>
        <p>${props.price.toFixed(2)}</p>
        <br></br>
    </div>
  );
};

export default MenuItem;