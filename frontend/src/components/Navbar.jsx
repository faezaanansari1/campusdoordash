import { Link } from 'react-router-dom';
import './Navbar.css'
// import umbclogo from '../assets/umbclogo.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="nav-black">
        <div className="image-logo">
            {/* <img src={umbclogo} alt="" className='logo' /> */}
            <Link to="/" className="site-title">RetrieverEats</Link>
        </div>
        <ul>
          <li className="active">
            <Link to="/about">About </Link>
            <Link to="/catalog">Catalog </Link>
            <Link to="/cart">Cart </Link>
            <Link to="/contact">Profile </Link>
            <Link to="/contact">Orders </Link>
            <Link to="/contact">Contact </Link>
          </li>
        </ul>
      </nav>
      <nav className="nav"></nav>
    </div>
  );
};

export default Navbar;