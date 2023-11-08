import React from 'react';

function Product({name, manufacturer, category, price, gender, size, image}) {
    return (
        <div>
            {
                name
            }
            <img src={ image } />

        </div>
    );
}

export default Product;