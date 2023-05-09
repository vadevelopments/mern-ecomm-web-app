import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Header from './components/header'
import Footer from './components/footer'
import Auth from './auth/auth'
import About from './pages/about'
import Home from './pages/home'

function App() {
	return (
		<div className="App">
			<Router>
				<div className="app-container">
					<Header/>
					<div className="content-container">
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route path='/auth' element={<Auth />} />
							<Route path='/about' element={<About />} />
						</Routes>
					</div>
					<Footer/>
				</div>
			</Router>
		</div>
	);
}

export default App;
