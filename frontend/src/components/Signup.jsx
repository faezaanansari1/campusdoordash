import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSignup(e) {
        e.preventDefault()
        // handle signup
        props.toggle()
        props.setUser(username)
        navigate('/catalog');
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <button type="submit">Sign Up</button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;