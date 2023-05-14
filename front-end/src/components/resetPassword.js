import React, { useRef, useEffect } from 'react'

import '../styles/resetPassword.css'

export function ResetPassword({ toggleMode }) {
    
    const nameInputRef = useRef(null);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    return (
        <div class="reset-email-container">
            <form class="reset-email-form">
                <h2 class="reset-email-title">Reset Password</h2>
                <label for="email" class="reset-email-label">Email:</label>
                <input type="email" id="email" class="reset-email-input" ref={nameInputRef} required/>
                <button type="submit" class="reset-email-button">Send Reset Link</button>
                <div className='reset-switch'>
                    <p  onClick={toggleMode}>Log in</p>
                    <p  onClick={toggleMode}>Sign up</p>
                </div>
            </form>
        </div>
    )
}