import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchUser, fetchCart, createCart } from '../../api/api';
import CartItem from './CartItem';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            setIsLoading(true);
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setCart(await fetchCart());
                    setIsLoading(false);
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
        
        if (submitter === "save") await createCart({products: cart.products});
        if (submitter === "checkout") {
            await createCart({products: cart.products});
            navigate('checkout');
        }
    };

    const renderCart = () => {
        if (cart && cart.products.length) 
            return (
            <>
                {
                    cart && cart.products.map((product, index) => (
                        <CartItem
                            key={index}
                            id={product.id} 
                            name={product.name} 
                            image={product.image} 
                            price={product.price}
                            quantity={product.quantity}
                            size={product.size}
                            handleChange={handleChange}
                            handleRemove={handleRemove}
                        />
                    ))
                }
                <p style={{textAlign: 'center'}}>Total Cost: £{cart.totalCost}</p>
            </>
            );
        
    };

    return (
        <main className="cart__page">
            <h1 className="cart__page__heading">Your Cart</h1>
            <form className="cart__form" onSubmit={e => handleSubmit(e, e.nativeEvent.submitter.name)}>
                {renderCart()}
                {isLoading && <h2>Loading Cart...</h2>}
                {
                    ((!cart || !cart.products.length) && !isLoading) && (
                        <>
                            <p style={{textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem'}}>
                                Cart is empty. <Link className="link" to="/products">Add items to cart.</Link>
                            </p>
                        </>
                    )
                
                }
                {cart?.products.length > 0 &&
                    <div className="cart__buttons">
                        <input className="btn" type="submit" name="save" value="Save Changes" />
                        {cart && <input className="btn" type="submit" name="checkout" value="Checkout" />}
                    </div>
                }
            </form>
        </main>
    );
}

export default Cart;