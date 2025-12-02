import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Login from './Login'
import Signup from './Signup'
import './AuthPopup.css'
import toast from "react-hot-toast";

const AuthPopup = (props) => {
    const [mode, setMode] = useState("login");
    const navigate = useNavigate();

    async function handleLogin(e, email, password) {
      e.preventDefault();
      if (!email || !password) {
				toast.error("All fields are required");
				return;
    	}
        const result = await props.logInUser(email, password);
        if (!result.success) {
					console.log(result.message);
					toast.error("Something went wrong. Try again?");
        } else {
					toast.success("Successfully logged you in!");
					props.toggle();
					navigate('/catalog');
        }
    }

    async function handleSignup(e, name, email, password, permission, phoneNumber) {
        e.preventDefault();
        const trimmedName = (name || "").trim();
        const nameParts = trimmedName.split(" ").filter(Boolean);

        if (nameParts.length < 2 || !password || !email || !phoneNumber) {
					toast.error("All fields are required");
					return;
        }
        const result = await props.signUpUser(trimmedName, email, password, permission, phoneNumber);
        if (result.success) {
					toast.success("Successfully signed up and logged you in!");
					props.toggle();
					navigate('/catalog');
        } else {
					console.log("Error signing up user ", result.message);
					toast.error("Something went wrong. Try again?");
        }
    }

  // Check whether mode has been set to something; otherwise, default is Login
  useEffect(() => {
    if (props.useMode) {
        setMode(props.useMode)
    } else {
        setMode("login");
    }
  }, [props.useMode]);


    return (
        <div className="popup">
            <div className="popup-inner">
						<button
							className="toggle-auth-link"
							onClick={() => setMode(mode === "login" ? "signup" : "login")}
						>
							{mode === "login" ? "Don't have an account? Create one" : "Already have an account? Sign in"}
						</button>

							{mode === "login" && <Login handleLogin={handleLogin} toggle={props.toggle} />}
							{mode === "signup" && <Signup handleSignup={handleSignup} toggle={props.toggle} />}
            </div>
        </div>
    )
}

export default AuthPopup;