import React from 'react'

function ProductCard( props ) {
    const  { name, description, price, image, category, countInStock } = props;
    return (
        <div className="product-card">
            <div className='img'>
                <img src={image} alt={name} className="product-image" />
            </div>
            <div className="product-details">
                <h4 className="product-name">name: {name}</h4>
                <p className="product-description">description: {description}</p>
                <p className="product-price">${price}</p>
                <p className="product-category">Category: {category}</p>
                <p className="product-stock">In stock: {countInStock}</p>
            </div>
        </div>
    )
}
// function ProductCard(props) {
//     const { name, description, price, image, category, countInStock, onClick } = props;

//     return (
//         <div>
//             <h2>{name}</h2>
//             <p>{description}</p>
//             <p>{price}</p>
//             <img src={image} alt={name} />
//             <p>{category}</p>
//             <p>{countInStock}</p>
//             <button onClick={onClick}>Click me</button>
//         </div>
//     );
// }

export default ProductCard