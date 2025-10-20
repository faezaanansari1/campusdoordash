import React from 'react';
// import { Link } from 'react-router-dom';
import './Home.css'

const Navbar = () => {
  return (
    <div className='home'>
        <h1>Feeling hungry on campus?</h1>
        <p> Whether you're craving Halal Shack, Chick-fil-A, or another on-campus vendor, we gotchu! FetchEats, developed by students in CMSC 447, saves you time and money by delivering meals straight to your dorm, classroom, office, or other location on campus.</p>
        <p>Or, sign up to be a fetcher and make money by delivering orders to customers on campus. Set your own hours.</p>
        <p>Get on FetchEats now bro. 🤝</p>
        <div className='buttons'>
            <button>Log in</button>
            <button>Sign up</button>
        </div>
    </div>
  );
};

export default Navbar;