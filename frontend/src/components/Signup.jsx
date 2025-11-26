import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './Login.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [permission, setPermission] = useState('user');

    async function handleSignup(e) {
        e.preventDefault();

        // Signup handle
        // If field is not completed
        if (!name || !password || !email || !phoneNumber) {
            toast.error("All fields are required");
            return;
        }
        const result = await props.signUpUser(name, email, password, permission, phoneNumber);
        if (result.success) {
            toast.success("Successfully signed up and logged you in!");
            props.toggle();
            navigate('/catalog');
        } else {
            console.log("Error signing up user ", result.message);
            toast.error("Something went wrong. Try again?");
        }
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
                        <button type="submit"
                        > Sign up
                        </button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;