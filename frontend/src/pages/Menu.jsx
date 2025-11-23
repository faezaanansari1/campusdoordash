import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Menu.css'
import MenuItem from '../components/MenuItem'
import api from "../lib/axios";
import toast from "react-hot-toast";
import shackimg from '../assets/halalshack.png'

const Menu = (props) => {
    const location = useLocation();
    const stateData = location.state;
    const [mainMenuItems, setMainMenuItems] = useState([]);
    const [searchedItems, setSearchedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Gets all menu items (menu data) from db
    async function getMenuItems() {
      try {
          const response = await api.get(`/restaurants/${stateData.restaurantId}/menu`);
          // console.log(response.data.items);
          setMainMenuItems(response.data.items);
      } catch (error) {
          console.log("Error getting restaurants", error);
      }
    };

    // When page initially loads, get all menu items (menu data)
    useEffect(() => {
        getMenuItems();
    }, [])

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


    async function addToCart(itemID) {
      try {
          await api.post("/cart/addItem", {
                menuItemId: itemID,
                quantity: 1
            });
          // console.log("Response after adding to cart");
          // console.log(response);
          toast.success("Added item to cart");
      } catch (error) {
          console.log("Error adding to cart", error);
          toast.error("Something went wrong. Try again?");
      }
    }

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
          addToCart={addToCart}
        />
      )))}
    </div>
  );
};

export default Menu;