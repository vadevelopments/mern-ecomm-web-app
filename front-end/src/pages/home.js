import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ProductCard from '../components/productCard'
import FlushProduct from '../components/flashProduct'

import '../styles/home.css'

function Home() {

    const product = JSON.parse(localStorage.getItem("product"));
    const token = JSON.parse(localStorage.getItem("token"));
    // product.user === token.user.id

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='home'>
            <div className='home-flush'>
                <h1>Flush Deals</h1>
                <div>
                    <React.Fragment>
                        <Link> <FlushProduct/> </Link>
                        <Link> <FlushProduct/> </Link>
                        <Link> <FlushProduct/> </Link>
                        <Link> <FlushProduct/> </Link>
                    </React.Fragment>
                </div>
            </div>
            <div>
                <h1>All Products</h1>
                <div className='home-flush'>
                    {products.map((product) => (
                        <Link 
                            // className={token && product.user === token.user.id ? "home-owner" : ""} // add background if it's the user's product
                            to={{ pathname: `/view-product/${product._id}`}}
                            key={product._id}
                            onClick={() => localStorage.setItem("product", JSON.stringify(product))}
                        >
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                category={product.category}
                                countInStock={product.countInStock} 
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home