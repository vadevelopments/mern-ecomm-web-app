import React, { useRef, useEffect } from 'react'


import '../styles/confirmReset.css'

export function ConfirmReset({ setMode }) {
    
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    const toLogin = () => {
        setMode('login');
    }

    const toSignup = () => {
        setMode('signup');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // check if token is valid if not go to login by calling "toLogin();"
        // API: http://localhost:5000/api/users/resetpassword
        // Body: newpassword and reset token
        try {

        } catch {

        }
    }

    return (
        <div class="confirm-reset-container">
            <form class="confirm-reset-form" onSubmit={handleSubmit}>
                <h2 class="confirm-reset-title">Reset Password</h2>
                <label for="new-password" class="confirm-reset-label">New Password:</label>
                <input type="password" id="new-password" class="confirm-reset-input" ref={nameInputRef} required/>
                <label for="confirm-password" class="confirm-reset-label">Confirm Password:</label>
                <input type="password" id="confirm-password" class="confirm-reset-input" required/>
                <button type="submit" class="confirm-reset-button">Reset Password</button>
                <div className='confirm-switch'>
                    <p onClick={toLogin}>Log in</p>
                    <p onClick={toSignup}>Sign up</p>
                </div>
            </form>
        </div>
    )
}