import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import MenuItem from '../components/MenuItem'

import {menuData} from '../data'

const Menu = () => {
    const location = useLocation();
    const stateData = location.state;
    const [mainMenuItems, setMainMenuItems] = useState([]);

    // Gets all menu items (menu data) from db
    // TODO: Read menu items from db
    const getMenuItems = () => {
        setMainMenuItems(menuData);
    };

    // When page initially loads, get all menu items (menu data)
    useEffect(() => {
        getMenuItems();
    }, [])


    return (
    <div>
      <h1>{stateData.name} Menu</h1>
      {menuData.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          price={item.price}
        //   image_url={item.image_url}
          calories={item.calories}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Menu;