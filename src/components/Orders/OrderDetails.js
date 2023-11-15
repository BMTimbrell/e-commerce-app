import React, { useEffect } from 'react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';

function OrderDetails() {
    const [order] = useOutletContext();
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (order)
        return (
            <div>
                <h2>Order Details</h2>
                {
                    order.map((item, index) => (
        
                            <Link key={ index } to={`/products/${item.shoe_id}`}>
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
    
        return (
            <div>
                <h2>Order Details</h2>
                <p>Couldn't find order</p>
            </div>
        );
}

export default OrderDetails;