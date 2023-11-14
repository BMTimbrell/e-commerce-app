import React from 'react';
import { Link } from 'react-router-dom';

function Order({ order }) {
    return (
        <div style={{ border: '1px solid black' }}>
            {
                order.map(item => (
    
                        <Link key={ item.id + item.image + item.size } to={`order-details?id=${item.id}`}>
                            <div>
                                <p>Total: £{ item.total_cost }</p>
                                <p>{ item.name }</p>
                                <img src={ item.image } alt="product" />
                                <p>Quantity: { item.quantity }</p>
                                <p>Price: £{ item.price }</p>
                            </div>
                        </Link>
                ))
            }
            
        </div>
    );
}

export default Order;