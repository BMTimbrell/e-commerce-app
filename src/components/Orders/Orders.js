import React, { useState, useEffect } from 'react';
import Order from './Order';
import { fetchUser, fetchOrders } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const formatOrders = (arr) => {
        let newOrders = [];
        let checkUniqueId = -1;
        //Make array of items for each order
        for (const el of arr) {
            // eslint-disable-next-line
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
                setIsLoading(true);
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    formatOrders(await fetchOrders());
                } else {
                    navigate('/logout');
                }   
            } 

            getUser();
            setIsLoading(false);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const renderOrders = () => {
        return (
            <main className="orders">
                <h1 className="orders__heading">Your Orders</h1>
                <section className="orders__list">
                    {isLoading ? <h2>Loading orders...</h2>
                    : !orders.length && <p>You haven't made any orders yet</p>
                    }
                    {orders.map((order, index) => (
                        <Order
                            key={index}
                            order={order}
                        />
                    ))}
                </section>
            </main>
        );
    };

    return (
        <>
            {orders ? renderOrders()
                : <h2>Failed to load orders</h2>
            }
        </>
    );
}

export default Orders;