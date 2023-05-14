import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../components/productCard'
import FlushProduct from '../components/flashProduct'

import '../styles/home.css'

function Home() {

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
                <div className='home-cards'>
                    <FlushProduct/> <FlushProduct/> <FlushProduct/> <FlushProduct/>
                </div>
            </div>
            <div>
                <h1>All Products</h1>
                <div>
                    {products.map((product) => (
                        <ProductCard
                        key={product._id}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                        countInStock={product.countInStock}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home