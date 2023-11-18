import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchCart, createCart, addItemToCart } from '../../api/api';
import './ProductDetails.css';

function ProductDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState(0);
    const [sizeError, setSizeError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const errorLoadingStyle = {textAlign: 'center', fontWeight: 'bold'};

    useEffect(() => {
        setIsLoading(true);

        async function getProduct() {
            const result = await fetchProductById(id);
            
            if (result) {
                const unique = [];
                result.forEach(p => {
                    //check if array already has item
                    if (unique.length === 0) {
                        const temp = p.size;
                        p.size = [];
                        p.size.push(temp);
                        unique.push(p);
                    } else {
                        unique.forEach(el => {
                            el.size.push(p.size);
                        });
                    }
                });
                setProduct(unique[0]);
                setIsLoading(false);
                setError(false);
            } else {
                setError(true);
                setIsLoading(false);
            }    
        }

        getProduct();      
    }, [setIsLoading, setError, setProduct, id]);

    const handleChange = e => {
        setSize(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (size === 0) {
            setSizeError('You must select a shoe size');
            return;
        }
        //Check if user is logged in
        if (await fetchCart() === 401) navigate('/login');
        //If cart already exists add item
        if (await fetchCart()) {
            const result = await addItemToCart(
                product.id, 
                Number(product.price), 
                size, 
                product.name, 
                product.image
            );
            console.log(result);
            
        } else {
            const cartItems = {
                products: [{ 
                    id: product.id,
                    price: Number(product.price),
                    quantity: 1,
                    size,
                    name: product.name,
                    image: product.image
                }]
            };
            const result = await createCart(cartItems);
            console.log(result);
        }     
    };

    if (!isLoading && !error) {
        return (
            <main className="product__details">
                <h1>{product.name}</h1>
                <img src={product.image} alt="product" />
                <div className="product__details__info">
                    <p>Manufacturer: {product.manufacturer}</p>
                    <p>Price: £{product.price}</p>
                <form className="product__details__form" onSubmit={handleSubmit}>
                    <div className="size">
                        <label htmlFor="size">Size:</label>
                        <select className="sizeDropdown" name="size" id="size" onChange={handleChange} defaultValue={"default"}>
                            <option key="default" value="default" disabled hidden>Select a size</option>
                            {
                                product.size.map(el => (
                                    <option key={el} value={el}>{el}</option>  
                                ))
                            }
                        </select>
                    </div>
                    <input className="addCartBtn" type="submit" value="Add to cart" />
                </form>
                </div>
                <p>{sizeError}</p>
                
            </main>
        );
    }

    if (isLoading) return <p style={errorLoadingStyle}>Loading...</p>;
    return <p style={errorLoadingStyle}>Failed to load product!</p>;
}

export default ProductDetails;