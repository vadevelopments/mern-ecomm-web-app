import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios'

import '../styles/createProduct.css'

function CreateProduct({ sessionExpired }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const nameInputRef = useRef(null);

    const API_BASE_URL = 'http://localhost:5000/api';
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);
  
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        axios.post(`${API_BASE_URL}/products/`,
            { name, description, price, image, category, countInStock },
            {
                headers: {
                    "x-auth-token": token.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log('Product created successfully!');
                window.alert(res.data.message);
                // setMessage(res.data.message);
                // Clear form fields
                setName('');
                setDescription('');
                setPrice('');
                setImage('');
                setCategory('');
                setCountInStock('');
                setErrorMessage('');
            })
            .catch(error => {
                if (error) {
                    setErrorMessage('Createing product failed');
                }
                // Clear success message
                console.log('Error creating product:', error);

                if(error.response.status === 401){
                    sessionExpired();
                    window.alert(`Session expired. Please log in again.`);
                }
            });
    };
  
    return (
        <div className='createProduct'>
            <h2>Create Product</h2>
            {errorMessage && <p className='createProduct-err'>{errorMessage}</p>}
            <div className='createProduct-pos'>
                <img src={image} alt='Product image'/>
                <form className='createProduct-form' onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input 
                            type="text" value={name}
                            onChange={(event) => setName(event.target.value)}
                            ref={nameInputRef}
                        />
                    </label>
                    <label htmlFor="description">
                        Description:
                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </label>
                    <label htmlFor="price">
                        Price:
                        <input
                            type="number" value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </label>
                    <label htmlFor="image">
                        Image URL:
                        <input
                            type="text" value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </label>
                    <label htmlFor="category">
                        Category:
                        <input
                            type="text" value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </label>
                    <label htmlFor="countInStock">
                        Count in Stock:
                        <input
                            type="number" value={countInStock}
                            onChange={(event) => setCountInStock(event.target.value)}
                        />
                    </label>
                    <button type="submit">Create Product</button>
                </form>
            </div>
        </div>
    );  
}

export default CreateProduct