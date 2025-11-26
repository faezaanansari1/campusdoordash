// Code courtesy of https://dev.to/afromatt6288/create-a-popup-form-for-login-and-then-style-it-37jl
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './Login.css'

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
		// const isAtHome = location.pathname === '/';

    async function handleLogin(e) {
      e.preventDefault();
      // handle login
      // If field is not completed
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

		// function goHome() {
		// 	props.toggle();
		// 	navigate('/');
		// }

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
												{/* {!isAtHome && (
													<button type="go-home" onClick={goHome}>
														Go home
													</button>
												)} */}
										</div>
                </form>
            </div>
        </div>
    )
}

export default Login;