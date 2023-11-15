import React from 'react';
import { Link } from 'react-router-dom';

function Order({ order }) {
    return (
        <div style={{ border: '1px solid black' }}>
            {
                order.map((item, index) => (
    
                        <Link key={ index } to={`order-details?id=${item.id}`}>
                            <div>
                                <p>{ item.name }</p>
                                <img src={ item.image } alt="product" />
                                <p>Quantity: { item.quantity }</p>
                                <p>Price: £{ item.price }</p>
                            </div>
                        </Link>
                ))
            }
            <p>Total: £{ order[0].total_cost }</p>
            
        </div>
    );
}

export default Order;