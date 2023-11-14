import React, { useState, useEffect } from 'react';
import { fetchUser, fetchOrders } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Orders from '../Orders/Orders';

function Profile() {
    const [name, setName] = useState('');
    const [orders, setOrders] = useState(null);
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
        console.log(newOrders);
        setOrders(newOrders);
    };

    //Check user is logged in
    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setName(result.first_name);
                } else {
                    navigate('/logout');
                }   
            } 
            async function getOrders() {
                const result = await fetchOrders();
                formatOrders(result);
            }

            getUser();
            getOrders();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h2>My Account</h2>
           {
                name
           }
           {
            <Orders orders={ orders } />
           } 
        </div>
    );
}

export default Profile;