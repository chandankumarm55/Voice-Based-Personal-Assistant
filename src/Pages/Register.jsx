import React, { useState } from 'react'
import toast from 'react-hot-toast'
const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const validation = () => {
        if (username.trim() == '' || email.trim() == '' || password.trim() == '') {
            to
        }
    }


    const handleSubmit = () => {

    }
    return (

        <div className='login-register'>
            <div className="auth-container">
                <h2>Register</h2>
                <form onSubmit={ handleSubmit }>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={ username }
                        onChange={ (e) => setUsername(e.target.value) }
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link>.</p>
            </div>
        </div>

    )
}

export default Register
