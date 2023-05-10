import React, { useState } from 'react'

function Auth() {
    const [mode, setMode] = useState('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // handle login or register submission
    }

  return (
        <div>
            {mode === 'login' ? (
                <div className='login'>
                    <h2>Login</h2>
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
                    <button onClick={toggleMode}>Switch to Register</button>
                </div>
            ) : (
                <div className='register'>
                    <h2>Register</h2>
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
                        <button type='submit'>Register</button>
                    </form>
                    <button onClick={toggleMode}>Switch to Login</button>
                </div>
            )}
        </div>
    )
}

export default Auth