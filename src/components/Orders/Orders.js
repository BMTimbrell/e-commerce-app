import React from 'react';
import Order from './Order';

function Orders({ orders }) {
    const renderOrders = () => {
        return (
            <>
            <h3>Your Orders</h3>
            {
                !orders.length && <p>You haven't made any orders yet</p>
            }
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