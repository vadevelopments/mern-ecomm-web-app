import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api';

export function loginUser(email, password) {
    return axios.post(`${API_BASE_URL}/auth/login`, { email, password })
        .then(response => {
            // Handle successful login
            // console.log("response.data");
            // console.log(response.data);
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
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle login submission
        loginUser(email, password)
            .then(token => {
                // Set the token to local storage
                localStorage.setItem('token', JSON.stringify(token));
                console.log("localStorage('token'):", localStorage.getItem('token'));
                handleLogin();
                // Redirect to the dashboard
                navigate('/dashboard');
            })
            .catch(error => {
                console.error(error);
                // TODO: show error message to the user
            });
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <p>afpaduelan@gmail.com</p>
            <p>password</p>
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
                <button type='submit'>Login</button>
            </form>
            <button onClick={toggleMode}>Switch to Signup</button>
        </div>
    )
}