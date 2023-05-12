import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api';

export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validatePassword(password) {
    return password.length >= 6;
}

function reset_password() {
	
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

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
				setMessage(res.data.message);
				// Clear input fields
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				// Clear error message
				setErrorMessage('');
			})
			.catch(error => {
				if (error.response) {
					setErrorMessage('Registration failed');
				} else {
					setErrorMessage('Network error');
				}
				// Clear success message
				setMessage('');
			});
 	};

    return (
		<div>
			<h2>Reset Password</h2>
			<Form>
				<label>
					Email:
					<input type='email' value={email} onChange={handleEmailChange} />
                </label>
			</Form>
		</div>
    )
}

export default reset_password