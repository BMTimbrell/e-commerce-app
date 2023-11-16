import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchCart, createCart, addItemToCart } from '../../api/api';

function ProductDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState(0);
    const [sizeError, setSizeError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

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
            <div>
                <p>{product.name}</p>
                <img src={product.image} alt="product" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="size">Size:</label>
                    <select name="size" id="size" onChange={handleChange} defaultValue={"default"}>
                        <option key="default" value="default" disabled hidden>Select a size</option>
                        {
                            product.size.map(el => (
                                <option key={el} value={el}>{el}</option>  
                            ))
                        }
                    </select>
                    <input type="submit" value="Add to cart" />
                </form>
                <p>{sizeError}</p>
                
            </div>
        );
    }

    if (isLoading) return <p>Loading...</p>;
    return <p>Failed to load product!</p>;
}

export default ProductDetails;