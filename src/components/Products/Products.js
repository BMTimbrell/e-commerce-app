import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../../api/api';
import Product from './Product';

function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        async function getProducts() {
            const result = await fetchProducts(category);
            if (result) {
                setProducts(result);
                setIsLoading(false);
                setError(false);
            } else {
                setError(true);
                setIsLoading(false);
            }    
        }

        async function getCategories() {
            const result = await fetchCategories();
            if (result) setCategories(result);
        }

        getProducts();   
        getCategories();   
    }, [setIsLoading, setError, setProducts, category]);

    const handleChange = e => {
        if (e.target.value === 'all') {
            setCategory(null);
            return;
        }
        setCategory(e.target.value);
    };

    return (
        <div>
            <h2>Products</h2>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={ handleChange } defaultValue={ "default" }>
                <option key="default" value="default" disabled hidden>Filter by category</option>
                <option key="all" value="all">All</option>
                {
                    categories && categories.map(el => (
                        <option key={ el.category } value={ el.category }>{ el.category }</option>  
                    ))
                }
            </select>
            {
                isLoading && 'Loading...'
            }
            {
                error && 'Failed to load products!'
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