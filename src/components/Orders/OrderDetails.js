import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchUser, fetchOrderById } from '../../api/api';
import { formatDate } from '../../helper/helper';


function OrderDetails() {
    const [order, setOrder] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading] = useState(false);

    //Check user is logged in, and if so, fetch order
    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setOrder(await fetchOrderById(id));
                } else {
                    navigate('/logout');
                }   
            } 

            getUser();
        } else {
            navigate('/login');
        }
    }, [navigate, id]);

    if (isLoading) return <p style={{textAlign: 'center', fontWeight: 'bold'}}>Loading...</p>;

    if (order && order.length)
        return (
            <main>
                <h1>Order Details</h1>
                {
                    order.map((item, index) => (
                            <Link key={index} to={`/products/${item.shoe_id}`}>
                                <div>
                                    <p>{item.name}</p>
                                    <img src={item.image} alt="product" />
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: £{item.price}</p>
                                </div>
                            </Link>
                    ))
                }
                <p>Total: £{order[0].total_cost}</p>
                <p>Ordered on: {formatDate(order[0].order_date)}</p>
            </main>
        );
        
        return (
            <main>
                <h1>Order Details</h1>
                <p>Couldn't find order</p>
            </main>
        );
}

export default OrderDetails;