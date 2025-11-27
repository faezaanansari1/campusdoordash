import { Link } from 'react-router-dom';
import { useState } from 'react'
import AuthPopup from './AuthPopup'
import './Navbar.css'
import toast from "react-hot-toast";
// import umbclogo from '../assets/umbclogo.png'

const Navbar = (props) => {
  const [popup, setPopup] = useState(false); // Tracks whether AuthPopup should be displayed
  let profileLink;
  
  function togglePopup () {
    let prev = popup;
    setPopup(!prev);
  };

  // If click on link as a guest, set popup to true to display the AuthPopup
  const handleLinkClick = (e) => {
    if (props.user === "guest") {
      e.preventDefault(); // Prevent navigation
      setPopup(true); // Show the AuthPopup
      toast('Please sign in first!', { icon: '🤔',});
    }
  };

  // The only difference between this and handleLinkClick is that the toast is not included, since it's not necessary
  const handleLinkClickProfile = (e) => {
    if (props.user === "guest") {
      e.preventDefault(); // Prevent navigation
      setPopup(true); // Show the AuthPopup
    }
  };

  if (props.user === "guest") { 
    profileLink = <Link to="/profile" onClick={handleLinkClickProfile}>Sign In </Link>;
  } else {
    profileLink = <Link to="/profile" >Profile </Link>;
  }

  return (
    <div className="navbar">
      <nav className="nav-black">
        <div className="image-logo">
            {/* <img src={umbclogo} alt="" className='logo' /> */}
            <Link to="/" className="site-title">RetrieverEats</Link>
        </div>
        {(!(props.user === "guest")) &&
          <div>
            <p>Hello, {props.user}</p>
          </div>
        }
        <ul>
          <li className="active">
            <Link to="/about">About </Link>
            <Link to="/catalog">Catalog </Link>
            <Link to="/cart" onClick={handleLinkClick}>Cart </Link>
            {profileLink}
            <Link to="/orders" onClick={handleLinkClick}>Orders </Link>
            <Link to="/contact">Contact </Link>
          </li>
        </ul>
      </nav>
      {/* Show the AuthPopup if popup is true */}
      {popup && (
        <AuthPopup
          useMode={"login"}
          toggle={togglePopup}
          logInUser={props.logInUser}
          signUpUser={props.signUpUser}
        />
      )}
      <nav className="nav"></nav>
    </div>
  );
};

export default Navbar;