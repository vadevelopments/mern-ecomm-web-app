import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import '../styles/headers.css'

function Header({ toggleMode, isLoggedIn, handleLogout }) {
    
    const navigate = useNavigate();

    const handleLogoutClick = async (event) => {
        event.preventDefault();
        try {
            // Update the isLoggedIn state
            handleLogout();

            // Redirect to the home
            navigate('/auth');
    
        } catch (error) {
            console.log("Logout Failed");
            console.error(error);
        }
    };
      
    
    return (
        <nav>
            <div className="header-logo">
                <Link to="/">Home</Link>
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
                        <Link to="/" onClick={handleLogoutClick}>Logout</Link>
                    ) : (
                        <Link to="/auth">{toggleMode === "login" ? "Signup" : "Login"}</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;