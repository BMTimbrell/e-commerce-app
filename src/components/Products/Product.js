import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Product({ id, name, image, price, size, quantity }) {
    const renderSizeAndQuantity = () => {
        if (size && quantity) {
            return (
                <>
                    <p>Size: {size}</p>
                    <p>Quantity: {quantity}</p>
                    <Link to="/cart">Edit</Link>
                </>
                
            );
        }
    }

    return (
        <Link to={`${id}`}>
            <section className="product">
                <div className="product__header">{name}</div>
                <div className="product__body">
                    <img src={image} alt="product" />
                    <p>Price: £{price}</p>
                    {renderSizeAndQuantity()}
                </div>
            </section>
        </Link>
    );
}

export default Product;