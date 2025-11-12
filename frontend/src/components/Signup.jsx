import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import './Login.css'

const Signup = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [permission, setPermission] = useState('user');
    const [loading, setLoading] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();

        // Signup handle
        // If field is not completed
        if (!name || !password || !email || !phoneNumber) {
            toast.error("All fields are required");
            return;
        }
        // Else, post to db
        setLoading(true);
        try {
            await api.post("/user/register", {
                name,
                email,
                password,
                permission,
                phoneNumber
            });
            toast.success("Successfully signed up and logged you in!");
            props.setUser(name);
            props.toggle();
            navigate('/catalog');
        } catch (error) {
            console.log("Error signing up user", error);
            toast.error("Something went wrong. Try again?");
        } finally {
            setLoading(false);
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
                        disabled={loading}
                        > {loading ? "Signing up..." : "Sign up"}
                        </button>
                        <button type="button" onClick={props.toggle}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;