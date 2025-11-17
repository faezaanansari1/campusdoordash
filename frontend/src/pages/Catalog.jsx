import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Catalog.css'
import shackimg from '../assets/halalshack.png'
import api from "../lib/axios";
import Card from '../components/Card'
// import {catalogData} from '../data'

const Catalog = () => {

  const [mainVendors, setMainVendors] = useState([]);
  const [searchedVendors, setSearchedVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSelect = (location) => {
    setSelectedLocation(location);
    // console.log("Selected:", location);
  };

  // Gets all vendors (catalog data) from db
  async function getVendors() {
    try {
        const response = await api.get("/restaurants/listRestaurants");
        // console.log("Response: " + JSON.stringify(response));
        setMainVendors(response.data);
        setSearchedVendors(response.data);
    } catch (error) {
        console.log("Error getting restaurants", error);
    }
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
      {!searchedVendors ? (
        <p>Loading vendors...</p>
      ) : searchedVendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        searchedVendors
          .filter(member =>
            selectedLocation === "" || member.location === selectedLocation
          )
          .map((member, index) => (
            <Card
              key={index}
              id={member._id}
              name={member.name}
              img={shackimg}
              loc={member.location}
              desc={member.description}
            />
          ))
      )}
    </div>
  </div>
  );
};

export default Catalog;