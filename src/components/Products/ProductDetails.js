import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/api';

function ProductDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);

        async function getProduct() {
            const result = await fetchProductById(id);
            if (result) {
                const unique = [];
                result.forEach(p => {
                    //check if array already has item with same product id
                    if (unique.filter( el => el.id === p.id).length === 0) {
                        const temp = p.size;
                        p.size = [];
                        p.size.push(temp);
                        unique.push(p);
                    } else {
                        unique.forEach(el => {
                            if (el.id === p.id) el.size.push(p.size);
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

    if (!isLoading && !error) {
        return (
            <div>
                <p>{ product.name }</p>
                <label htmlFor="size">Size:</label>
                <select name="size">
                {
                    product.size.map(el => (
                           <option key={ el } value={ el }>{ el }</option>
                        )   
                    )
                }
                </select>
            </div>
        );
    }

    if (isLoading) return <p>Loading...</p>;
    return <p>Failed to load product!</p>;
}

export default ProductDetails;