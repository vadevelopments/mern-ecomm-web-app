import React, { useState } from 'react'

import { Login } from '../components/login'
import { Signup } from '../components/signup'

export function Auth({ handleLogin }) {

    const [mode, setMode] = useState('login')

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login')
    }

    return (
        <div className='auth'>
            {mode === 'login' ? (
                <Login toggleMode={toggleMode} handleLogin={handleLogin} />
            ) : (
                <Signup toggleMode={toggleMode} />
            )}
        </div>
    )
}