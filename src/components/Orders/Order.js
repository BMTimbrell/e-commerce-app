import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helper/helper';

function Order({ order }) {

    return (
        <Link to={`${order[0].id}`}>
            <section className="order">
                <div className="order__items">
                    {order.map((item, index) => (
                            <div key={index} className="order__item">
                                <h2 className="order__item__heading">{item.name}</h2>
                                <img src={item.image} alt="product" />
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
                        <p style={{marginBottom: '0.25rem'}}>Total: £{order[0].total_cost}</p>
                        <p>Ordered on: {formatDate(order[0].order_date)}</p>
                    </div>
                </div>
            </section>
        </Link>
    );
}

export default Order;