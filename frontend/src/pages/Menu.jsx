import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Menu.css'
import MenuItem from '../components/MenuItem'
import shackimg from '../assets/halalshack.png'

const Menu = (props) => {
  const location = useLocation();
  const stateData = location.state;
  const [mainMenuItems, setMainMenuItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchMenu() {
      const result = await props.getMenuItems(stateData.restaurantId);
      if (result.success) {
        setMainMenuItems(result.data);
      } else {
        console.log(result.message);
      }
    }

    fetchMenu();
  }, [stateData.restaurantId, props]);

  // Recalculate searchedItems when searchTerm changes, which occurs when user types something in search box
  useEffect(() => {
    console.log("Recalculating searchedItems");
    // If no search term, searchedItems=mainMenuItems.
    if (!searchTerm) {
      setSearchedItems(mainMenuItems);
    // If search term, then searchedVendors is set to all vendors matching the search
    } else {
      const results = mainMenuItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedItems(results);
    }
  }, [searchTerm, mainMenuItems]);

  return (
    <div className='menu'>
      <h1>{stateData.name} Menu</h1>

      <div className='filters'>
        <div className="search-box">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for an item"
          />
        </div>
      </div>

      {!searchedItems ? (
        <p>Loading menu items...</p>
      ) : searchedItems.length === 0 ? (
        <p>No menu items found.</p>
      ) : (
      searchedItems
      .map((item, index) => (
        <MenuItem
          key={index}
          user={props.user}
          name={item.name}
          img={shackimg}
          price={item.price}
          id={item._id}
        //   image_url={item.image_url}
          calories={item.calories}
          description={item.description}
          getCart={props.getCart}
          updCartItemQty={props.updCartItemQty}
          logInUser={props.logInUser} 
          signUpUser={props.signUpUser}
        />
      )))}
    </div>
  );
};

export default Menu;