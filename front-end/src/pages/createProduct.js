import React, { useState } from 'react';
import axios from 'axios'

function CreateProduct({ sessionExpired }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [message, setMessage] = useState('');

    const API_BASE_URL = 'http://localhost:5000/api';
    const token = JSON.parse(localStorage.getItem("token"));
  
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
        <div>
            <h2>Create Product</h2>
            {/* {message && <p>{message}</p>} Show success message if it exists */}
            {errorMessage && <p>{errorMessage}</p>} {/* Show error message if it exists */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="countInStock">Count in Stock:</label>
                    <input
                        type="number"
                        id="countInStock"
                        value={countInStock}
                        onChange={(event) => setCountInStock(event.target.value)}
                    />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    );  
}

export default CreateProduct