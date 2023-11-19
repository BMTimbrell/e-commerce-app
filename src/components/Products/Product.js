import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Product({ id, name, image, price, size, quantity }) {

    if (size && quantity)
        return (
            <section className="product checkout__product">
                <div className="product__header">{name}</div>
                <div className="product__body">
                <Link to={`/products/${id}`}>
                    <img src={image} alt="product" />
                </Link>
                    <p>Price: £{price}</p>
                    <p>Size: {size}</p>
                    <p>Quantity: {quantity}</p>
                    <Link className="link" to="/cart">Edit</Link>
                </div>
            </section>
        );

    return (
        <Link to={`/products/${id}`}>
            <section className="product">
                <div className="product__header">{name}</div>
                <div className="product__body">
                    <img src={image} alt="product" />
                    <p>Price: £{price}</p>
                </div>
            </section>
        </Link>
    );
}

export default Product;