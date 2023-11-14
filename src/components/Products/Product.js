import React from 'react';
import { Link } from 'react-router-dom';

function Product({ id, name, image, price, size, quantity }) {
    const renderSizeAndQuantity = () => {
        if (size && quantity) {
            return (
                <>
                    <p>Size: { size }</p>
                    <p>Quantity: { quantity }</p>
                    <Link to="/cart">Edit</Link>
                </>
                
            );
        }
    }

    return (
        <div>
            {
                name
            }
            <Link to={`${id}`}>
                <img src={ image } alt="product" />
            </Link>
            
            <p>Price: £{ price }</p>
            {
               renderSizeAndQuantity()
            }
        </div>
    );
}

export default Product;