import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/updateProduct.css'

function UpdateProduct() {
	
    const product = JSON.parse(localStorage.getItem("product"));
	
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);
    const [category, setCategory] = useState(product.category);
    const [countInStock, setCountInStock] = useState(product.countInStock);
	const navigate = useNavigate();

    const API_BASE_URL = 'http://localhost:5000/api';
    const token = JSON.parse(localStorage.getItem("token"));

	const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        axios.put(`${API_BASE_URL}/products/${product._id}`,
            { name, description, price, image, category, countInStock },
            {
                headers: {
                    "x-auth-token": token.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log('Product updated successfully!');
				window.alert(res.data.message)
                // Clear form fields
                setName('');
                setDescription('');
                setPrice('');
                setImage('');
                setCategory('');
                setCountInStock('');
				navigate(`/update-product/${product._id}`);
            })
            .catch(error => {
                if (error) {
					window.alert("Product Update failed")
                }
                // Clear success message
                console.log('Error updating product:', error);
            });
    };

	return (
		<div className='updateProduct'>
			<h2 >Update Product</h2>
			<div className='updateProduct-pos'>
				<img src={image} alt='Product image'/>
				<form className='createProduct-form' onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type="text" value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</label>
					<label>
						Description:
						<textarea
							id="description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</label>	
					<label>Price:
						<input
							type="number"
							id="price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
						/>
					</label>
					<label>
						Image URL:
						<input
							type="text" value={image}
							onChange={(event) => setImage(event.target.value)}
						/>
					</label>
					<label>
						Category:
						<input
							type="text" value={category}
							onChange={(event) => setCategory(event.target.value)}
						/>
					</label>
					<label>
						Count in Stock:
						<input
							type="number" value={countInStock}
							onChange={(event) => setCountInStock(event.target.value)}
						/>
					</label>	
					<button type="submit">Update Product</button>
				</form>
			</div>
		</div>
	)
}

export default UpdateProduct