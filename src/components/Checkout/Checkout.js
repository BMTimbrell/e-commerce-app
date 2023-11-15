import React, { useEffect, useState } from 'react';
import { fetchCart, fetchUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import Product from '../Products/Product';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_KEY);

function Checkout() {
    const [cart, setCart] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setCart(await fetchCart());
                } else {
                    navigate('/logout');
                }   
            } 
            getUser();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const updateSuccess = (value) => {
        setSuccess(value);
    };

    if (success) {
        return (
            <div>
                <p>Payment Successful!</p>
                <Link to="/products">Continue shopping</Link>
            </div>
        );
    }

    if (!cart || !cart.products.length) {
        return (
            <div>
                <p>
                    Cart is empty. <Link to="/products">Add items to cart.</Link>
                </p>
            </div>
        );
    }
    return (
        <div>
            {
                 cart && cart.products.map((product, index) => (
                    <Product
                        key={ index }
                        id={ product.id } 
                        name={ product.name } 
                        image={ product.image } 
                        price={ product.price }
                        quantity={ product.quantity }
                        size={ product.size }
                    />
                ))
            }

            <p>Total to pay: { cart.totalCost }</p>
           {

                <Elements stripe={ stripePromise }>
                    <PaymentForm amount={ cart.totalCost * 100 } updateSuccess={ updateSuccess }/>
                </Elements>
           }
           
        </div>
    );
}

export default Checkout;