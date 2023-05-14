import React, { useState } from 'react'

import { Login } from '../components/login'
import { Signup } from '../components/signup'
import { ResetPassword } from '../components/resetPassword'
import { ConfirmReset } from '../components/confirmReset'

import '../styles/auth.css'

export function Auth({ handleLogin }) {

    const [mode, setMode] = useState('login')

    // const toggleMode = () => {
    //     if (mode === 'login') {
    //         setMode('signup')
    //     } else if (mode === 'signup') {
    //         setMode('login')
    //     } else if (mode === 'resetPassword') {
    //         setMode('login')
    //     }
    // }

    const toggleMode = () => {
        if (mode === 'login') {
            setMode('signup')
        } else if (mode === 'signup') {
            setMode('login')
        } else if (mode === 'resetPassword') {
            setMode('login')
        }
    }



    return (
        <div className='auth'>


            {mode === 'login' ? <Login toggleMode={toggleMode} handleLogin={handleLogin} /> : 
            mode === 'signup' ? <Signup toggleMode={toggleMode} /> :
            <ConfirmReset toggleMode={toggleMode} />}

            {/* {mode === 'login' ? (
                <Login toggleMode={toggleMode} handleLogin={handleLogin} />
            ) : mode === 'signup' ? (
                <Signup toggleMode={toggleMode} />
            ) : mode === 'resetPassword' ? (
                <ResetPassword toggleMode={toggleMode} />
            ) : null} */}


        </div>
    )
}