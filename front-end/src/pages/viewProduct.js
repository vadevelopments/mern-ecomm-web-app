import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import formatTime  from '../modules/formatTime';

import '../styles/viewProduct.css';

function ViewProduct() {
	const navigate = useNavigate();
	const [owner, setOwner] = useState(false);
	const [quantity, setQuantity] = useState(0);

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

	const addQuantity = (event) => {
		event.preventDefault();
		setQuantity(quantity+1);
	}

	const minusQuantity = (event) => {
		event.preventDefault()
		if(quantity > 0){
			setQuantity(quantity-1);
		}
	}

	const addToCart = (event) => {
		event.preventDefault()
		if (token && quantity > 0){
			axios
			.post(`${API_BASE_URL}/cart/add`,
				{
					quantity: quantity,
					productId: product._id,
					userId: token.user.id
				},
				{
					headers: {
						'x-auth-token': token.token,
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				window.alert(res.data.message);
				// navigate(`/dashboard`);
			})
			.catch((error) => {
				if (error.response) {
					window.alert(error.response.data.error);
				}
				console.log(error.response.data.error);
			});
		} else if (token && quantity === 0){
			window.alert("Quantity must be greater than zero.");
		} else {
			navigate(`/dashboard`);
		}
	}
	
	const buyNow = (event) => {
		event.preventDefault()
		if (token && quantity > 0){
			window.alert("To developer: Finish the back-end payment method (orderController.js.createOrder) first to create API.");
		} else if (token && quantity === 0){
			window.alert("Quantity must be greater than zero.");
		} else {
			navigate(`/dashboard`);
		}
	}

	return (
		<div className="viewProduct">

			<div className='flex_content'>
				<div className='right_content'>
					<img className='imageside' src={product.image} alt={product.name}/>
					<div className='priceside'>
						<h1 className='title'>{product.name}</h1>
						<h2>Price: ${product.price}</h2>
						<div className='ratings'>
							<div className='rating-sold'>
								<p>Sold: 100pcs</p>
								<p>Rating: 5 Star</p>
								<p>Quantity: {product.countInStock}pcs</p>
							</div>
							<div className='favs'>
								<p>Favorites (100k)</p>
								<div className='favs_img'>
									<p>Share:</p>
									<img src='https://i.ebayimg.com/images/g/XDUAAOSwQeJjwyum/s-l1600.jpg'/>
									<img src='https://i.ebayimg.com/images/g/XDUAAOSwQeJjwyum/s-l1600.jpg'/>
									<img src='https://i.ebayimg.com/images/g/XDUAAOSwQeJjwyum/s-l1600.jpg'/>
								</div>
							</div>
						</div>
						<div className='quantity_qty'>
							<div>
								<p>Select Quantity</p>
								<div className='quantity'>
									<button onClick={minusQuantity}>-</button>
									<p>{quantity}</p>
									<button onClick={addQuantity}>+</button>
								</div>
								<div className='qty-btn-buy'>
									<button className='button' onClick={buyNow}>Buy now</button>
									<button className='button'onClick={addToCart}>Add to cart</button>
								</div>	
							</div>
							{owner && (
								<div className='updel viewProduct-btn'>
									<button id="viewProduct-update" onClick={handleUpdateClick}>Update</button>
									<button id="viewProduct-delete" onClick={handleDeleteClick}>Delete</button>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='description'>
					<div>
						<p style={descriptionStyle}>{product.description}</p>
					</div>
					<div className='comments'>
						<h4>Comments</h4>
						{product.comments.length > 0 &&
							product.comments.map((comment, index) => (
								<div key={index}>
									<div className='comment-user'>
										<div className='comments-img'>
											<img className='pic' src='https://i.ebayimg.com/images/g/XDUAAOSwQeJjwyum/s-l1600.jpg' alt=''/>
											<div>
												<p>{comment.name}</p>
												<p>{formatTime(comment.createdAt)}</p>
											</div>
										</div>
										<p>{comment.text}</p>
									</div>
								</div>
						))}
					</div>
				</div>
			</div>


			{/* <div className="viewProduct-info">
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
			</div> */}
		</div>
	);
}

export default ViewProduct;