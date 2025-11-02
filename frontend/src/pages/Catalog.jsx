import { Link } from 'react-router-dom';
import './Catalog.css'
import Card from '../components/Card'
import chickimg from "../assets/chickfila1.png"
import sbucksimg from '../assets/starbucks.jpg'
import shackimg from '../assets/halalshack.png'
import dunkinimg from '../assets/dunkin.jpg'

const Catalog = () => {
  const catalogData = [
      {
        "id": 1,
        "name": "Chick-fil-A",
        "img": chickimg,
        "loc": "University Center",
        "desc": "A campus favorite, serving classic chicken sandwiches, nuggets, waffle fries, and milkshakes."
      },
      {
        "id": 2,
        "name": "Starbucks",
        "img": sbucksimg,
        "loc": "University Center",
        "desc": "Full-service Starbucks in the University Center with all your favorite drinks, bakery items, and snacks."
      },
      {
        "id": 3,
        "name": "Halal Shack",
        "img": shackimg,
        "loc": "Commons",
        "desc": "Halal Shack is a fast-casual Middle Eastern/Mediterranean spot in The Commons food court."
      },
      {
        "id": 4,
        "name": "Dunkin' Donuts",
        "img": dunkinimg,
        "loc": "Commons",
        "desc": "Your spot for coffee/espresso drinks, donuts, bagels, and breakfast sandwiches."
      }

    ];


  return (
    <div className="catalog">
      <h1>Our Catalog</h1>
      <div className="container">
        {/* <div> */}
          {        
          catalogData.map((member, index) => (
            <Card key={index}
                id={member.id}
                name={member.name}
                img={member.img}
                loc={member.loc}
                desc={member.desc}
            />
          ))
          }      
        {/* </div> */}
      </div>
    </div>
  );
};

export default Catalog;