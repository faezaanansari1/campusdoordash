import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import MenuItem from '../components/MenuItem'
import api from "../lib/axios";
import toast from "react-hot-toast";

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
    // const addToCart = (itemToAdd) => {
    //     props.setCart([...props.cart, itemToAdd]);
    // }

    return (
    <div>
      <h1>{stateData.name} Menu</h1>
      {mainMenuItems.map((item, index) => (
        <MenuItem
          key={index}
          user={props.user}
          name={item.name}
          price={item.price}
          id={item._id}
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