import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function CartItem({ id, name, image, price, quantity, size, handleChange, handleRemove }) {
    return (
        <section className="cart__item">
            <h2 className="cart__item__heading">{name}</h2>
            <Link to={`/products/${id}`}>
                <img src={image} alt="product" />
            </Link>
            <p>Price: {price}</p>
            <p>Size: {size}</p>
            <div className="cart__item__quantity">
                <label htmlFor="quantity">Quantity: &nbsp;</label>
                <input type="number" onKeyDown={e => e.preventDefault()} id="quantity" value={quantity} name="quantity" min="1" max="10" onChange={e => handleChange(id, size, e)} />
            </div>
            <button className="btn" onClick={e => handleRemove(id, size)}>Remove Item</button>
        </section>
    );
}

export default CartItem;