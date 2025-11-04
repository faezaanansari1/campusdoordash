import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
// import Card from '../components/Card'

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
        <h1>Menu for {stateData.name}</h1>
    </div>
  );
};

export default Menu;