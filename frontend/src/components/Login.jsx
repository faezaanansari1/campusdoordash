// Code courtesy of https://dev.to/afromatt6288/create-a-popup-form-for-login-and-then-style-it-37jl
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import './Login.css'

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
      e.preventDefault();
      // handle login
      // If field is not completed
      if (!email || !password) {
				toast.error("All fields are required");
        return;
    	}
			// Else, post to db
			try {
					const response = await api.post("/user/login", {
							email,
							password
					});
					toast.success("Successfully logged you in!");
					console.log(response.data.user.name);
					props.setUser(response.data.user.name);
					props.toggle();
					navigate('/catalog');
			} catch (error) {
					console.log("Error logging in user", error);
					toast.error("Something went wrong. Try again?");
			}
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Login</button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;