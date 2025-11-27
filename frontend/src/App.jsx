import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { Toaster } from "react-hot-toast";
import api from "./lib/axios";
import './index.css'

const App = () => {
  const [userInfo, setUserInfo] = useState({name: "guest"});
  const [cart, setCart] = useState([]);

  // USER OPERATIONS
  // Gets user info
  async function getUser() {
    try {
      const res = await api.get("/user/is-auth", { withCredentials: true });
      console.log(res);
      const savedUserInfoObject = res.data.user
      setUserInfo(savedUserInfoObject);
      const savedUserInfoString = JSON.stringify(savedUserInfoObject)
      localStorage.setItem("userInfo", savedUserInfoString);
    } catch (error) {
        console.log("Error fetching user", error);
    }
  }

  // Load username from localStorage on initial render
  useEffect(() => {
    const savedUserInfoString = localStorage.getItem('userInfo');
    if (savedUserInfoString) {
      const savedUserInfoObject = JSON.parse(savedUserInfoString);
      setUserInfo(savedUserInfoObject);
    } else {  // check if auth'd, and save username
      getUser();
    }
  }, []); // Runs only once on mount

  // Log in user
  async function logInUser(email, password) {
    try {
      await api.post("/user/login", { email, password });
      await getUser();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Error logging in";
      return { success: false, message: msg };    }
  }

  // Sign up user
  async function signUpUser(name, email, password, permission, phoneNumber) {
    try {
      await api.post("/user/register", { name, email, password, permission, phoneNumber });
      await getUser();
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || "Error signing up";
      return { success: false, message: msg };    }
  }

  // Log out user
  async function logOutUser() {
    try {
      await api.post("/user/logout", );
      setUserInfo({name: "guest"});
      localStorage.removeItem("userInfo");
      return { success: true }
    } catch (error) {
      const msg = error.response?.data?.message || "Error logging out";
      return { success: false, message: msg };    
    }
  }

  //MENU and CART OPERATIONS
  // Gets all vendors (catalog data) from db
  async function getVendors() {
    try {
      const response = await api.get("/restaurants/listRestaurants");
      return { success: true, data: response.data}
    } catch (error) {
      const msg = error.response?.data?.message || "Error getting vendors";
      return { success: false, message: msg };
    }
  };

  // Gets all menu items (menu data) from db
  async function getMenuItems(restaurantId) {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/menu`);
      return { success: true, data: response.data.items }
    } catch (error) {
      const msg = error.response?.data?.message || "Error getting menuitems";
      return { success: false, message: msg };
    }
  };

  // Adds item to cart
  async function addToCart(itemID) {
    try {
      await api.post("/cart/addItem", {
            menuItemId: itemID,
            quantity: 1
        });
      return { success: true }
    } catch (error) {
      const msg = error.response?.data?.message || "Error adding item to cart";
      return { success: false, message: msg };
    }
  }

  // ROUTES
  let element = useRoutes([
    {
      path: "/",
      element:<Home logInUser={logInUser} signUpUser={signUpUser} />
    },
    {
      path:"/catalog",
      element: <Catalog getVendors={getVendors} />
    },
    {
      path:"/catalog/:id",
      element: <Menu user={userInfo.name} getMenuItems={getMenuItems} addToCart={addToCart} logInUser={logInUser} signUpUser={signUpUser} cart={cart} setCart={setCart} />
    },
    {
      path:"/cart/",
      element: <Cart user={userInfo.name} />
    },
    {
      path:"/profile/",
      element: <Profile user={userInfo.name} logOutUser={logOutUser} />
    }
  ]);

  return ( 

    <div className="App">

        <Navbar user={userInfo.name} logInUser={logInUser} signUpUser={signUpUser} />
        <Toaster 
        position="top-right"
        reverseOrder={false}
        />
        <div>
          {element}
        </div>
    </div>

  )
}

export default App