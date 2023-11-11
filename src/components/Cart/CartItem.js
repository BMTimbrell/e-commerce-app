import React from 'react';
import { Link } from 'react-router-dom';

function CartItem({ id, name, image, price, quantity, size, handleChange, handleRemove }) {
    return (
        <div>
            <p>Name: { name }</p>
            <Link to={ `/products/${id}` }>
                <img src={ image } alt="product" />
            </Link>
            <p>Price: { price }</p>
            <p>Size: { size }</p>
            <label htmlFor="quantity">Quantity: </label>
            <input type="number" id="quantity" value={ quantity } name="quantity" min="1" max="10" onChange={ e => handleChange(id, size, e) } />
            <button onClick={ e => handleRemove(id, size) }>Remove Item</button>
        </div>
    );
}

export default CartItem;