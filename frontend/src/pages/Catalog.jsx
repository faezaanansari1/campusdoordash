import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
      },
      {
        "id": 5,
        "name": "Einstein Bros. Bagel",
        "img": dunkinimg,
        "loc": "AOK Library",
        "desc": "Bagels, sandwiches, coffee, and breakfast staples located in the AOK Library."
      }
    ];

  const [mainVendors, setMainVendors] = useState([]);
  const [searchedVendors, setSearchedVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelect = (location) => {
    setSelectedLocation(location);
    console.log("Selected:", location);
  };

  // Gets all vendors (catalog data) from db
  // TODO: Read vendors from db
  const getVendors = () => {
    setMainVendors(catalogData);
  };

  // When page initially loads, get all vendors (catalog data)
  useEffect(() => {
      getVendors();
  }, [])

  // TODO: Move search functionality to parent as search can occur on multiple pages
  // Recalculate searchedPosts when searchTerm changes, which occurs when user types something in search box
  useEffect(() => {
    console.log("Recalculating searchedPosts");
    // If no search term, searchedVendors=mainVendors.
    if (!searchTerm) {
      setSearchedVendors(mainVendors);
    // If search term, then searchedVendors is set to all vendors matching the search
    } else {
      const results = mainVendors.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedVendors(results);
    }
  }, [searchTerm, mainVendors]);

  return (
    <div className="catalog">
      <h1>The Catalog</h1>

      <div className='filters'>
        <div className="search-box">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a restaurant"
          />
        </div>

        <div className="dropdown">
          <button className="dropbtn">Filter location</button>
          <div className="dropdown-content">
            <Link to="/catalog" onClick={() => handleSelect("")}>All</Link>
            <Link to="/catalog" onClick={() => handleSelect("Commons")}>Commons</Link>
            <Link to="/catalog" onClick={() => handleSelect("University Center")}>University Center</Link>
            <Link to="/catalog" onClick={() => handleSelect("AOK Library")}>AOK Library</Link>
          </div>
        </div>
      </div>

      <div className="container">
        {        
          searchedVendors
            .filter(member =>
              selectedLocation === "" || member.loc === selectedLocation
            )
            .map((member, index) => (
            <Card key={index}
                id={member.id}
                name={member.name}
                img={member.img}
                loc={member.loc}
                desc={member.desc}
            />
          ))
        }      
      </div>
  </div>
  );
};

export default Catalog;