import React from 'react';
import Order from './Order';

function Orders({ orders }) {
    const renderOrders = () => {
        return (
            <>
            {
                orders.map(order => (
                    <Order
                        key={ order[0].id + order[0].image + order[0].size}
                        order={ order }
                    />
                ))
            }
            </>
        );
    };

    return (
        <div>
            {
                orders && renderOrders()
            }
        </div>
    );
}

export default Orders;