import React from 'react'

import '../styles/productCard.css'

function ProductCard( props ) {
    const  { name, description, price, image, category, countInStock } = props;
    return (
        <div className="productCard">
            <div className='productCard-img'>
                <img src={image} alt={name} />
            </div>
            <div className="productCard-details">
                <h4 className='productCard-div'>{name}</h4>
                <h4>Description </h4>
                <p className='productCard-div'>{description}</p>
                <h4 className='productCard-div'>Price</h4>
                <p>${price}</p>
                <h4>Category</h4>
                <p className='productCard-div'>{category}</p>
                <h4>In Stock</h4>
                <p className='productCard-div'>{countInStock}</p>
            </div>
        </div>
    )
}

export default ProductCard