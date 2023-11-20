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
            <main className="orders">
                <h1 className="orders__heading">Order Details</h1>
                <section className="order" style={{width: '80%', margin: '0 auto'}}>
                    <div className="order__items">
                        {order.map((item, index) => (
                            <div className="order__item" key={index}>
                                <h2 className="order__item__heading">{item.name}</h2>
                                <Link to={`/products/${item.shoe_id}`}>
                                    <img src={item.image} alt="product" />
                                </Link>
                                <div className="order__item__info">
                                    <div>
                                        <p className="order__item__text">Quantity: {item.quantity}</p>
                                        <p className="order__item__text">Price: £{item.price}</p>
                                        <p className="order__item__text">Size: {item.size}</p>
                                    </div>
                                </div> 
                            </div>
                        ))}
                    </div>
                    <div className="order__footer">
                        <div>
                            <p>Total: £{order[0].total_cost}</p>
                            <p>Ordered on: {formatDate(order[0].order_date)}</p>
                        </div>
                    </div>
                </section>
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