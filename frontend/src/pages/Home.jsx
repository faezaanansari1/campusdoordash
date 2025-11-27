import { Link } from 'react-router-dom';
import { useState } from 'react'
import './Home.css'
import AuthPopup from '../components/AuthPopup'

const Home = (props) => {
  const [loginPopup, setLoginPopup] = useState(false)
  const [signupPopup, setSignupPopup] = useState(false)

  function toggleLoginPopup () {
    let prev = loginPopup;
    setLoginPopup(!prev);
  };

  function toggleSignupPopup () {
    let prev = signupPopup;
    setSignupPopup(!prev);
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
            {loginPopup ? <AuthPopup useMode={"login"} toggle={toggleLoginPopup} logInUser={props.logInUser} /> : null}
            <button className="home-page-btns" onClick={toggleSignupPopup}>Sign up</button>
            {signupPopup ? <AuthPopup useMode={"signup"} toggle={toggleSignupPopup} signUpUser={props.signUpUser} /> : null}
        </div>
    </div>
  );
};

export default Home;