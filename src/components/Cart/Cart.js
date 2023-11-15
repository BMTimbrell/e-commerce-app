import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, fetchCart, createCart } from '../../api/api';
import CartItem from './CartItem';

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
    }, [navigate]);

    const handleChange = (id, size, e) => {
        //Create new cart based on changed quantity
        const newProducts = cart.products.map(product => {
            if (product.id === id && product.size === size) {
                return {
                    "id": product.id,
                    "quantity": e.target.value,
                    "image": product.image,
                    "name": product.name,
                    "size": product.size,
                    "price": product.price
                };
            } else {
                return product;
            }
        });

        let newTotalCost = 0;
        newProducts.forEach(product => 
            newTotalCost += Number(product.price) * product.quantity
        );
        
        setCart({
            products: newProducts,
            totalCost: newTotalCost
        });
    };

    const handleRemove = (id, size) => {
        const newProducts = cart.products.filter(product => 
            !(product.id === id && product.size === size)
        );

        let newTotalCost = 0;
        newProducts.forEach(product =>
            newTotalCost += Number(product.price) * product.quantity
        );

        setCart({
            products: newProducts,
            totalCost: newTotalCost
        });
    };

    const handleSubmit = async (e, submitter) => {
        e.preventDefault();
        
        if (submitter === "save") await createCart({ products: cart.products });
        if (submitter === "checkout") {
            await createCart({ products: cart.products });
            navigate('/checkout');
        }
    };

    const renderCart = () => {
        if (cart && cart.products.length) 
            return (
            <>
                {
                    cart && cart.products.map((product, index) => (
                        <CartItem
                            key={ index }
                            id={ product.id } 
                            name={ product.name } 
                            image={ product.image } 
                            price={ product.price }
                            quantity={ product.quantity }
                            size={ product.size }
                            handleChange={ handleChange }
                            handleRemove={ handleRemove }
                        />
                    ))
                }
                <p>Total Cost: { cart.totalCost }</p>
            </>
            );
        
    };

    return (
        <div>
            <form onSubmit={ e => handleSubmit(e, e.nativeEvent.submitter.name) }>
                {
                    renderCart()
                }

                {
                    (!cart || !cart.products.length) && <p>Cart is empty.</p>
                }
                <input type="submit" name="save" value="Save Changes" />
                { cart && <input type="submit" name="checkout" value="Checkout" /> }
            </form>
        </div>
    );
}

export default Cart;