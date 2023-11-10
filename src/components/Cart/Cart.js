import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, fetchCart } from '../../api/api';

function Cart() {
    const [cart, setCart] = useState(null);
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
    }, [navigate, setCart]);

    return (
        <div>
            {
                cart && cart.products.map(product => (
                    <p>
                        { product.name } 
                        <img src={ product.image } />
                        size: { product.size }
                        price: { product.price } 
                        quantity: { product.quantity }
                    </p>
                ))
            }
            {
                cart && cart.totalCost
            }
        </div>
    );
}

export default Cart;