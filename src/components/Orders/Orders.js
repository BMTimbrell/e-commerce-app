import React, { useState, useEffect } from 'react';
import Order from './Order';
import { fetchUser, fetchOrders } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    
    const formatOrders = (arr) => {
        let newOrders = [];
        let checkUniqueId = -1;
        //Make array of items for each order
        for (const el of arr) {
            newOrders.push(arr.filter(order => 
                el.id === order.id && el.id !== checkUniqueId
            ));
            if (checkUniqueId !== el.id) checkUniqueId = el.id;
        }

        newOrders = newOrders.filter(order => order.length > 0);
        setOrders(newOrders);
    };

    //Check user is logged in, and if so, fetch orders
    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    formatOrders(await fetchOrders());
                } else {
                    navigate('/logout');
                }   
            } 

            getUser();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const renderOrders = () => {
        return (
            <>
            <h2>Your Orders</h2>
            {
                !orders.length && <p>You haven't made any orders yet</p>
            }
            {
                orders.map((order, index) => (
                    <Order
                        key={index}
                        order={order}
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