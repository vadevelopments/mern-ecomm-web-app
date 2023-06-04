import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import formatTime  from '../modules/formatTime';

import '../styles/viewProduct.css';

function ViewProduct() {
	const navigate = useNavigate();
	const [owner, setOwner] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const product = JSON.parse(localStorage.getItem('product'));
	const token = JSON.parse(localStorage.getItem('token'));
	const API_BASE_URL = 'http://localhost:5000/api';

	useEffect(() => {
		checkOwner();
	}, []);

	const checkOwner = () => {
		if (token && product.user === token.user.id) {
			setOwner(true);
		} else {
			setOwner(false);
		}
	};

	const handleUpdateClick = () => {
		navigate(`/update-product/${product._id}`);
	};

	const handleDeleteClick = (event) => {
		event.preventDefault();
		if (window.confirm(`Are you sure you want to delete?\n\n${product.name}`)) {
			confirmDelete();
		}
	};

	const confirmDelete = () => {
		axios
		.delete(`${API_BASE_URL}/products/${product._id}`, {
			headers: {
			'x-auth-token': token.token,
			'Content-Type': 'application/json',
			},
		})
		.then((res) => {
			console.log(res.data);
			window.alert(res.data.message);
			navigate(`/dashboard`);
		})
		.catch((error) => {
			if (error.response) {
			window.alert(error.response.data.message);
			}
			console.log('Error deleting product:', error);
		});
	};

	const descriptionStyle = {
		whiteSpace: 'pre-line',
	};

	const handleQuantityChange = (event) => {	
		setQuantity(event.target.value);
	};
	// useEffect(() => {
	// 	console.log(quantity);
	// }, [quantity]);

	const addToCart = (event) => {
		event.preventDefault()

	}
	
	const buyNow = (event) => {
		event.preventDefault()

	}

	return (
		<div className="viewProduct">
			<div className="viewProduct-info">
				<div className="viewProduct-det">
					<h1>{product.name}</h1>
					<p className="viewProduct-price">
						Price: <span id="viewProduct-price">${product.price}</span>
					</p>
					<p className="viewProduct-desc" style={descriptionStyle}>
						{product.description}
					</p>
					<p className="viewProduct-cat">Category: {product.category}</p>
					<p className="viewProduct-count">CountInStock: {product.countInStock}</p>
				</div>
				<div className='viewProduct-cartBtn'>
					<img src={product.image} alt={product.name} className="viewProduct-img" />
					{token && (
						<form action="#">
							<label for="quantity">Quantity:</label>
							<input className='cartInput' type="number" id="quantity" name="quantity" onChange={handleQuantityChange} min={1} value={quantity}/>
							<input className='cartBtn' type="submit" onClick={addToCart} value="Add to cart"/>
							<input className='cartBtn' type="submit" onClick={buyNow} value="Buy now"/>
						</form>
					)}
				</div>
			</div>
			{owner && (
				<div className="viewProduct-btn">
					<button id="viewProduct-update" onClick={handleUpdateClick}>
						Update
					</button>
					<button id="viewProduct-delete" onClick={handleDeleteClick}>
						Delete
					</button>
				</div>
			)}
			<div className="viewProduct-comments">
				<h4>Comments</h4>
				{product.comments.length > 0 &&
					product.comments.map((comment, index) => (
						<div key={index}>
							<p id='viewProduct-Commentor'>Commentor: {comment.name}</p>
							<p id='viewProduct-comment'>Comment Comment Comment: {comment.text}</p>
							<p id='viewProduct-created'>Created at: {formatTime(comment.createdAt)}</p>
						</div>
				))}
			</div>
		</div>
	);
}

export default ViewProduct;