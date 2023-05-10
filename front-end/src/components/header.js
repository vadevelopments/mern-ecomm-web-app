import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header({ toggleMode, isLoggedIn, handleLogout }) {
    
    const navigate = useNavigate();

    const handleLogoutClick = async (event) => {
        event.preventDefault();
        try {
            // Update the isLoggedIn state
            handleLogout();

            // Redirect to the home
            navigate('/');
    
        } catch (error) {
            console.log("Logout Failed");
            console.error(error);
        }
    };
      
    
    return (
        <nav>
            <div className="logo">
                <a href="/">Home</a>
            </div>
            <ul>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    {isLoggedIn ? (
                        <a href="/" onClick={handleLogoutClick}>Logout</a>
                    ) : (
                        <a href="/auth">{toggleMode === "login" ? "Signup" : "Login"}</a>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;