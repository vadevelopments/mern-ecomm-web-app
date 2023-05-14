import React, { useState } from 'react'

import { Login } from '../components/login'
import { Signup } from '../components/signup'
import { ResetPassword } from '../components/resetPassword'
import { ConfirmReset } from '../components/confirmReset'

import '../styles/auth.css'

export function Auth({ handleLogin }) {

    const [mode, setMode] = useState('login');

    // const toggleMode = () => {
    //     if (mode === 'login') {
    //         setMode('signup')
    //     } else if (mode === 'signup') {
    //         setMode('login')
    //     } else if (mode === 'resetPassword') {
    //         setMode('login')
    //     }
    // }

    const toSetMode = (newValue) => {
        setMode(newValue);
    }

    return (
        <div className='auth'>
            {mode === 'login' ? <Login setMode={toSetMode} handleLogin={handleLogin} /> : 
            mode === 'signup' ? <Signup setMode={toSetMode} /> :
            mode === 'resetPassword' ? <ResetPassword setMode={toSetMode} /> :
            <ConfirmReset setMode={toSetMode} />}
        </div>
    )
}