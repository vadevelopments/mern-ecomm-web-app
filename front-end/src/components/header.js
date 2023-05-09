import React from 'react'
import { Link } from 'react-router-dom'

function header() {
    return (
        <header>
            <div className='logo'>
                <Link to='/'> To Home </Link>
            </div>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <ul>
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                        <li>
                            <Link to='/auth'>Register</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>
    )
}

export default header