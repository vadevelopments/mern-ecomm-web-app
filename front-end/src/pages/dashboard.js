import React, { useState, useEffect } from 'react';
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
        //   console.log(res.data);
          setUserProducts(res.data);
      })
      .catch((err) => {
          console.log('dashboard catch');
          console.log(err);
      });
  }, [token.token]);

  return (
    <div>
      <h1>Dashboard</h1>
      {userProducts.length > 0 ? (
        userProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
            countInStock={product.countInStock}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
