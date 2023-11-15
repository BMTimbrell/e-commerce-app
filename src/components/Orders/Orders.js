import React from 'react';
import Order from './Order';

function Orders({ orders }) {
    const renderOrders = () => {
        return (
            <>
            {
                orders.map((order, index) => (
                    <Order
                        key={ index }
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