import React, { useRef, useEffect } from 'react'

import '../styles/resetPassword.css'

export function ResetPassword({ setMode }) {
    
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

    const toConfirmReset = (event) => {
        event.preventDefault();
        try {
            // API: http://localhost:5000/api/users/reset-token
            // Body: email
            setMode('confirmReset');
        } catch {

        }
    }

    return (
        <div class="reset-email-container">
            <form class="reset-email-form" onSubmit={toConfirmReset}>
                <h2 class="reset-email-title">Reset Password</h2>
                <label for="email" class="reset-email-label">Email:</label>
                <input type="email" id="email" class="reset-email-input" ref={nameInputRef} required/>
                <button type="submit" class="reset-email-button">Send Reset Link</button>
                <div className='reset-switch'>
                    <p  onClick={toLogin}>Log in</p>
                    <p  onClick={toSignup}>Sign up</p>
                </div>
            </form>
        </div>
    )
}