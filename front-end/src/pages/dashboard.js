import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ProductCard from '../components/productCard';

import '../styles/dashboard.css'

function Dashboard({ sessionExpired }) {
    const [userProducts, setUserProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
        })
        .catch((err) => {
            console.log('dashboard catch');
            if(err.response.status === 401){
                sessionExpired();
                window.alert(`Session expired. Please log in again.`);
            }
            console.log(err);
            setIsLoading(false);
        });
    }, [token.token]);

    return (
        <div className='dashboard'>
            <div className='dashboard-productCard'>
                <h1>My Products</h1>
                {isLoading ? (
                <p>Loading...</p>
                ) : (
                <React.Fragment>
                    <Link className='dashboard-create' to="/create-product" > Create Product </Link>
                    {userProducts.length > 0 ? (
                        userProducts.map((product) => (
                            <Link 
                                to={{ pathname: `/view-product/${product._id}`}}
                                key={product._id}
                                onClick={() => localStorage.setItem("product", JSON.stringify(product))}
                                >
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
                        <p>No product</p>
                    )}
                </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default Dashboard;