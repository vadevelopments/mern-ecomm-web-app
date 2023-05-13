import React, { useState } from 'react'
import axios from 'axios'

import '../styles/signup.css'

const API_BASE_URL = 'http://localhost:5000/api';

export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}

export function Signup({ toggleMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // handle register submission
        axios.post(`${API_BASE_URL}/users/register`, { email, password })
            .then((res) => {
                // Show success message 
                window.alert(res.data.message);
                // Clear input fields
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch(error => {
                if (error) {
                    window.alert(errorMessage);
                } else {
                    window.alert('Registration failed');
                }   
            });
    };

    return (
        <div className='signup'>
            <h2>Sign up</h2>
            {errorMessage && <p className='signup-err'>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type='email' value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={handlePasswordChange} />
                </label>
                <label>
                    <div>
                        <p>Confirm</p>
                        <p>Password:</p>
                    </div>
                    <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </label>
                <button className='signup-submit' type='submit'>Signup</button>
            </form>
            <p className='signup-switch' onClick={toggleMode}>Switch to Login</p>
        </div>
    )
}