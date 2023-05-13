import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import '../styles/login.css'

const API_BASE_URL = 'http://localhost:5000/api';

export function loginUser(email, password) {
    return axios.post(`${API_BASE_URL}/auth/login`, { email, password })
        .then(response => {
            return response.data; // Return the token
        })
        .catch(error => {
            // Handle login error
            console.error(error);
            throw error; // Rethrow the error
        });
}

export function Login({ toggleMode, handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle login submission
        loginUser(email, password)
            .then(token => {
                // Set the token to local storage
                localStorage.setItem('token', JSON.stringify(token));
                handleLogin();
                // Redirect to the dashboard
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error);
                // TODO: show error message to the user
                setErrorMessage('Invalid email or password.')
            }
        );
    };

    return (
        <div className="login">
            <h2>Log in</h2>
            {errorMessage && <p className='login-err'>{errorMessage}</p>} {/* Show error message if it exists */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <span>Email:</span>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                </div>
                <button className='login-submit' type="submit">Login</button>
            </form>
            <p className='login-switch' onClick={toggleMode}>Switch to Signup</p>
        </div>
    );      
}