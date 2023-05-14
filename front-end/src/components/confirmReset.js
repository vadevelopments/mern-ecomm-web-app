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

    return (
        <div class="confirm-reset-container">
            <form class="confirm-reset-form">
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