import React from 'react';
import '../styles/viewProduct.css'

function ViewProduct() {

    const product = JSON.parse(localStorage.getItem("product"));
    console.log(product._id);

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
                <button>Update</button>
            </div>
        </>
    );
}

export default ViewProduct;