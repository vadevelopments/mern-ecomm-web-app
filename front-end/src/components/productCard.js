import React from 'react'

function ProductCard({ name, description, price, image, category, countInStock }) {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <div className="product-details">
                <h2 className="product-name">name: {name}</h2>
                <p className="product-description">description: {description}</p>
                <p className="product-price">${price}</p>
                <p className="product-category">Category: {category}</p>
                <p className="product-stock">In stock: {countInStock}</p>
            </div>
        </div>
    )
}

export default ProductCard