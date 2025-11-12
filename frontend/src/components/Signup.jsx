import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSignup(e) {
        e.preventDefault();
        // handle signup

        if (!name || !password)

        props.toggle();
        props.setUser(name);
        navigate('/catalog');
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>
                        Full name:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        UMBC Email:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Phone number:
                        <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
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