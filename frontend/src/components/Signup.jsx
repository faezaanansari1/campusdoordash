import { useState } from 'react'
import './AuthPopup.css'

const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [permission, setPermission] = useState('user');

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={(e) => props.handleSignup(e, (firstName + " " + lastName).trim(), email, password, permission, phoneNumber)}>
                <label>
                    First name<span className="required">*</span>:
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </label>
                <label>
                    Last name<span className="required">*</span>:
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </label>
                <label>
                    UMBC Email<span className="required">*</span>:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Phone number<span className="required">*</span>:
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </label>
                <label>
                    Password<span className="required">*</span>:
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