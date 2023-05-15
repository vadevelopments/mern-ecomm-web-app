import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import '../styles/headers.css'

function Header({ toggleMode, isLoggedIn, handleLogout }) {

    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        {token ? setUser(`Hi ${token.user.email}`) : setUser('Hi!')}
    }, [isLoggedIn]);

    return (
        <nav>
            <div className="header-logo">
                <Link to="/">Home</Link>
                <h4 className='header-separator'>{user}</h4>
            </div>
            <ul className='header-li'>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    {isLoggedIn ? (
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    ) : (
                        <Link to="/auth">{toggleMode === "login" ? "Signup" : "Login"}</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;