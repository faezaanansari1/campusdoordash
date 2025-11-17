import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import MenuItem from '../components/MenuItem'
import api from "../lib/axios";
// import {menuData} from '../data'

const Menu = (props) => {
    const location = useLocation();
    const stateData = location.state;
    const [mainMenuItems, setMainMenuItems] = useState([]);
    // console.log("Restaurant id: " + stateData.restaurantId);
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

    const addToCart = (itemToAdd) => {
        props.setCart([...props.cart, itemToAdd]);
    }

    return (
    <div>
      <h1>{stateData.name} Menu</h1>
      {mainMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          user={props.user}
          name={item.name}
          price={item.price}
        //   image_url={item.image_url}
          calories={item.calories}
          description={item.description}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default Menu;