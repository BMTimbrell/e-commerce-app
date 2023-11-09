import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/api';
import Product from './Product';

function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        async function getProducts() {
            const result = await fetchProducts();
            if (result) {
                setProducts(result);
                setIsLoading(false);
                setError(false);
            } else {
                setError(true);
                setIsLoading(false);
            }    
        }

        getProducts();      
    }, [setIsLoading, setError, setProducts]);


    return (
        <div>
            <h2>Products</h2>
            {
                isLoading && 'Loading'
            }
            {
                error && 'Failed to load products'
            }
            {
                !isLoading && !error && products.map(
                    product => (
                        <Product 
                            key={ product.id }
                            id={ product.id }
                            name={ product.name }
                            manufacturer={ product.manufacturer }
                            category={ product.category }
                            price={ product.price }
                            gender={ product.gender }
                            image={ product.image }
                        />
                    )
                )
            }
        
        </div>
    );
}

export default Products;