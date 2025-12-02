import { useState } from 'react'
import './AuthPopup.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <h2>Login</h2>
                <form onSubmit={(e) => props.handleLogin(e, email, password)}>
                <label>
                    Email<span className="required">*</span>:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password<span className="required">*</span>:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                    <button type="button" onClick={props.toggle}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default Login;