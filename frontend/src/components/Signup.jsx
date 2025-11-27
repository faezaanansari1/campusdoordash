import { useState } from 'react'
import toast from "react-hot-toast";
import './AuthPopup.css'

const Signup = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [permission, setPermission] = useState('user');

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={(e) => props.handleSignup(e, name, password, email, phoneNumber, permission)}>
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
                    <button type="submit"
                    > Sign up
                    </button>
                    <button type="button" onClick={props.toggle}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;