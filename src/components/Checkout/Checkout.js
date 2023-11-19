import React, { useEffect, useState } from 'react';
import { fetchCart, fetchUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import Product from '../Products/Product';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Checkout.css';

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
            <div style={{textAlign: 'center'}}>
                <h1 style={{textAlign: 'center', marginTop: '2rem', marginBottom: '1rem'}}>Payment Successful!</h1>
                <Link className="link" to="/products">Continue shopping</Link>
            </div>
        );
    }

    if (!cart || !cart.products.length) {
        return (
            <div>
                <p style={{textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem'}}>
                    Cart is empty. <Link className="link" to="/products">Add items to cart.</Link>
                </p>
            </div>
        );
    }
    return (
        <main className="checkout">
            <h1 className="checkout__heading">
                Checkout
            </h1>
            {
                 cart && cart.products.map((product, index) => (
                    <Product
                        key={index}
                        id={product.id} 
                        name={product.name} 
                        image={product.image} 
                        price={product.price}
                        quantity={product.quantity}
                        size={product.size}
                    />
                ))
            }
            <p style={{marginTop: '1rem'}}>Total to pay: £{cart.totalCost}</p>
           {

                <Elements stripe={stripePromise}>
                    <PaymentForm amount={cart.totalCost * 100} updateSuccess={updateSuccess}/>
                </Elements>
           }
           
        </main>
    );
}

export default Checkout;