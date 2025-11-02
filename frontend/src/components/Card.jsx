import './Card.css'

const Card = (props) => {
  return (
    <div className='card'>
      <img src={props.img} alt="" />
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <i>Location: {props.loc}</i>
    </div>
  );
};

export default Card;