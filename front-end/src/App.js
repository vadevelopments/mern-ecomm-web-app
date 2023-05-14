import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Footer from './components/footer';
import About from './pages/about';
import Home from './pages/home';
import { Auth } from './auth/auth';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import CreateProduct from './pages/createProduct';
import ViewProduct from './pages/viewProduct';
import UpdateProduct from './pages/updateProduct';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
	const [mode, setMode] = useState('login');

	const toggleMode = () => {
		setMode(mode === 'login' ? 'signup' : 'login');
	};

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const sessionExpired = () => {
		setIsLoggedIn(false);
	};

	const handleLogout = async () => {
		try {
			// Make a GET request to the logout API
			const token = JSON.parse(localStorage.getItem("token"));
			const response = await axios.get(
				"http://localhost:5000/api/auth/logout",
				{
					headers: {
						"x-auth-token": token.token,
						"Content-Type": "application/json",
					},
				}
			);
		
			if (response.status !== 200) {
				throw new Error(`Logout Failed: ${response.status} - ${response.data.msg}`);
			}
		
			// Remove the token from local storage
			localStorage.removeItem("token");
		
			// Update the login state
			setIsLoggedIn(false);
		} catch (error) {
			console.log("Logout Failed: App.js");
			console.error(error);
		}
	};	 
	

	return (
		<div className="App">
			<Router>
				<div className="app-container">
					<Header toggleMode={toggleMode} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
					<div className="content-container">
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="/auth" element={<Auth handleLogin={handleLogin} />} />
							<Route path="/about" element={<About />} isLoggedIn={isLoggedIn} />
							<Route path="/dashboard" element={isLoggedIn ? <Dashboard sessionExpired={sessionExpired} /> : <Navigate to="/auth" />} />
							<Route path="/create-product" element={isLoggedIn ? <CreateProduct sessionExpired={sessionExpired} /> : <Navigate to="/auth" />} />
							<Route path="/view-product/:productId" element={isLoggedIn ? <ViewProduct handleLogin={handleLogin} /> : <Navigate to="/auth" />} />
							<Route path="/update-product/:productId" element={isLoggedIn ? <UpdateProduct handleLogin={handleLogin} /> : <Navigate to="/auth" />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</Router>
		</div>
	);
}

export default App;