import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import './index.css'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("User");
  const [cart, setCart] = useState([]);

  const removeFromCart = (idToRemove) => {
    const prevState = cart;
    setCart(prevState => prevState.filter(item => item.id !== idToRemove));
  }

  // ROUTES
  let element = useRoutes([
    {
      path: "/",
      element:<Home setUser={setLoggedInUser} />
    },
    {
      path:"/catalog",
      element: <Catalog />
    },
    {
      path:"/catalog/:id",
      element: <Menu user={loggedInUser} cart={cart} setCart={setCart} />
    },
    {
      path:"/cart/",
      element: <Cart cart={cart} user={loggedInUser} removeFromCart={removeFromCart} />
    }
  ]);

  return ( 

    <div className="App">

        <Navbar />

        <div>
          {element}
        </div>
    </div>

  )
}

export default App