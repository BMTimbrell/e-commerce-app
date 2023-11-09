import React from 'react';
import { Link } from 'react-router-dom';

function Product({id, name, image}) {
    return (
        <div>
            {
                name
            }
            <Link to={`${id}`}>
                <img src={ image } alt="product" />
            </Link>
            
        </div>
    );
}

export default Product;