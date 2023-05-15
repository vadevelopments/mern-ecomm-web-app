import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/viewProduct.css'

function ViewProduct( isLoggedIn ) {

    const navigate = useNavigate();

    const product = JSON.parse(localStorage.getItem("product"));
    const API_BASE_URL = 'http://localhost:5000/api';
    const token = JSON.parse(localStorage.getItem("token"));

    const handleUpdateClick = () => {
        navigate(`/update-product/${product._id}`);
    };

    const handleDeleteClick = (event) => {
        event.preventDefault();
        if(window.confirm(`Are you sure you want to delete?

        ${product.name}`)) {
            confirmDelete();
        };
    }

    const confirmDelete = () => {

        axios.delete(`${API_BASE_URL}/products/${product._id}`,
            {
                headers: {
                    "x-auth-token": token.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res.data.message);
                window.alert(res.data.message);
                navigate(`/dashboard`);
            })
            .catch(error => {
                if (error) {
                    window.alert(error.data.message);
                }
                // Clear success message
                console.log('Error updating product:', error);
            });
    };

    const descriptionStyle = {
        whiteSpace: 'pre-line',
    };

    return (
        <div>
            { !isLoggedIn ? (
                <div className='viewProduct'>
                    <div className='viewProduct-info'>
                        <div className='viewProduct-det'>
                            <h1>{product.name}</h1>
                            <p className='viewProduct-price'>Price: <span id='viewProduct-price'>${product.price}</span></p>
                            <p className="viewProduct-desc" style={descriptionStyle}> {product.description} </p>
                            <p className='viewProduct-cat'>Category: {product.category}</p>
                            <p className='viewProduct-caount'>CountInStock: {product.countInStock}</p>
                        </div>
                        <img src={product.image} alt={product.name} className='viewProduct-img' />
                    </div>
                    <div className='viewProduct-btn'>
                        <button id='viewProduct-update' onClick={handleUpdateClick}>Update</button>
                        <button id='viewProduct-delete' onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
                ) : (
                <div className='viewProduct'>
                    <div className='viewProduct-info'>
                        <div className='viewProduct-det'>
                            <h1>{product.name}</h1>
                            <p className='viewProduct-price'>Price: <span id='viewProduct-price'>${product.price}</span></p>
                            <p className="viewProduct-desc" style={descriptionStyle}> {product.description} </p>
                            <p className='viewProduct-cat'>Category: {product.category}</p>
                            <p className='viewProduct-caount'>CountInStock: {product.countInStock}</p>
                        </div>
                        <img src={product.image} alt={product.name} className='viewProduct-img' />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewProduct;