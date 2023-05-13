import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../public/logo512.png'
import '../styles/footers.css'

function footer() {
    return (
        <footer className='foot'>
            <div className='foot-inline foot-padding foot-info' >
                <img className='foot-inline' src={Logo} alt='Logo' width='80px' height='80px' />
                <h3>Team Kayod</h3>
                <p>Copyright 2023</p>
                <p>Email: afpaduelan@gmail.com</p>
                <p>Contact #: (212) 456-7890</p>
                <p>Skype: live:.cid.e2944655417a2444</p>
            </div>
            <div className='foot-inline foot-about foot-padding' >
                <p>The project aims to build a full-stack e-commerce web application with login, registration, and reset password functionality. The app will allow users to browse and purchase products, manage their user account information, including shipping and billing addresses, and payment methods. The app will also include product filtering and sorting, product reviews and ratings, shopping cart and checkout functionality, customer support, and order tracking.</p>
            </div>
            <div className='foot-inline foot-page'>
                <div className='foot-padding '>
                    <Link to='/'>Home</Link>
                    <Link to='about'>About</Link>
                    <Link to='/'>Contact Us</Link>
                </div>
                <div className=' foot-padding foot-follow'>
                    <p id='foot-follow'>Follow Us</p>
                    <div className='foot-inline'>
                        <a href='/'> <img src={Logo} alt='Logo' /> </a>
                        <p>Facebook</p>
                    </div>
                    <div className='foot-inline'>
                        <a href='/'> <img src={Logo} alt='Logo' /> </a>
                        <p>Instagram</p>
                    </div>
                    <div className='foot-inline'>
                        <a href='/'> <img src={Logo} alt='Logo' /> </a>
                        <p>Twitter</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default footer