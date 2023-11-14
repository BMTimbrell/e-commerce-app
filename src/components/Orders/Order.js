import React from 'react';
import { Link } from 'react-router-dom';

function Order({ order }) {
    return (
        <div style={{ border: '1px solid black' }}>
            {
                order.map(item => (
                    <div key={ item.id + item.image + item.size }>
                        <p>{ item.name }</p>
                        <p>{ item.id }</p>
                        <Link to={`${item.id}`}>
                            <img src={ item.image } alt="product" />
                        </Link>
                        
                        <p>Price: £{ item.price }</p>
                    </div>
                ))
            }
            
        </div>
    );
}

export default Order;