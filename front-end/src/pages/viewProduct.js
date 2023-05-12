import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/viewProduct.css'

function ViewProduct() {

    const navigate = useNavigate();
    // const [successMessage, setSuccessMessage] = useState('');

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
                    // setErrorMessage('Updating product failed');
                }
                // Clear success message
                console.log('Error updating product:', error);
            });
    };

    return (
        <>
            <div className='viewProduct'>
                <img src={product.image} alt={product.name} />
                <h1>Name: {product.name}</h1>
                <p>Description{product.description}</p>
                <p>Price{product.price}</p>
                <p>Category{product.category}</p>
                <p>CountInStock{product.countInStock}</p>
            </div>
            <div>
                <button onClick={handleUpdateClick}>Update</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </>
    );
}

export default ViewProduct;