import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './Home.css'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Home = (props) => {
  // TODO: These popup states and functions need to be moved somewhere more global because they can occur at different places across the app.
  const [loginPopup, setLoginPopup] = useState(false)
  const [signupPopup, setSignupPopup] = useState(false)

  function toggleLoginPopup () {
    let set = loginPopup;
    setLoginPopup(!set);
  };

  function toggleSignupPopup () {
    let set = signupPopup;
    setSignupPopup(!set);
  };

  return (
    <div className='home'>
        <h1>Feeling hungry on campus?</h1>
        <p> Whether you're craving Halal Shack, Chick-fil-A, or another on-campus vendor, we gotchu! RetreiverEats, developed by students in CMSC 447, saves you time and money by delivering meals straight to your dorm, classroom, office, or other location on campus.</p>
        <p>You can also sign up to be a fetcher and make money by delivering orders to customers on campus. Work on campus and set your own hours.</p>
        <p>Get on RetrieverEats now bro. 🤝</p>
        <div className='buttons'>
            <Link to={`/catalog/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="home-page-btns">View Catalog</button>
            </Link>
            <button className="home-page-btns" onClick={toggleLoginPopup}>Log in</button>
            {loginPopup ? <Login toggle={toggleLoginPopup} logInUser={props.logInUser} /> : null}
            <button className="home-page-btns" onClick={toggleSignupPopup}>Sign up</button>
            {signupPopup ? <Signup toggle={toggleSignupPopup} signUpUser={props.signUpUser} /> : null}
        </div>
    </div>
  );
};

export default Home;