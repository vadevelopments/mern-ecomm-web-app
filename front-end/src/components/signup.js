import React, { useState } from 'react'

export function Signup({ toggleMode }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // handle register submission
    }

    return (
        <div className='signup'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type='email' value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    </label>
                <br />
                <button type='submit'>Signup</button>
            </form>
            <button onClick={toggleMode}>Switch to Login</button>
        </div>
    )
}