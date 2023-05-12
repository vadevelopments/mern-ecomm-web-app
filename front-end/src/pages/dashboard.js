import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../components/productCard';

function Dashboard() {
    const [userProducts, setUserProducts] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/products/userProducts',{
            headers: {
                "x-auth-token": token.token,
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log('dashboard try');
            setUserProducts(res.data);
        })
        .catch((err) => {
            console.log('dashboard catch');
            console.log(err);
        });
    }, []);

    return (
        <div>
            <div className='sidebar'>
                <Link to="/create-product">CreateProduct</Link>
            </div>
                <div className='userProdcuts'>
                <h1>My Products</h1>
                {userProducts.length > 0 ? (
                    userProducts.map((product) => (
                        <Link to={{
                                pathname:`/view-product/${product._id}`
                            }} 
                            key={product._id}
                            onClick={() => localStorage.setItem("product", JSON.stringify(product))}
                        >
                            <p>productId: {product._id}</p>
                            <ProductCard
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                countInStock={product.countInStock}
                            />
                        </Link>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;