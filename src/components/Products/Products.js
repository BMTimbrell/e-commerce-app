import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../../api/api';
import Product from './Product';

function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState(null);
    const [gender, setGender] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        async function getProducts() {
            const result = await fetchProducts(category, gender);
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
    }, [setIsLoading, setError, setProducts, category, gender]);

    const handleCategoryChange = e => {
        if (e.target.value === 'all') {
            setCategory(null);
            return;
        }
        setCategory(e.target.value);
    };

    const handleGenderChange = e => {
        //Check if box is checked or unchecked and change value accordingly
        if (!e.target.checked) {
            if (gender === "Both") {
                if (e.target.value === "Men") setGender("Women");
                if (e.target.value === "Women") setGender("Men");
            } else {
                setGender(null);
            }
        } else {
            if (gender) setGender("Both");
            else setGender(e.target.value);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" onChange={ handleCategoryChange } defaultValue={ "default" }>
                <option key="default" value="default" disabled hidden>Filter by category</option>
                <option key="all" value="all">All</option>
                {
                    categories && categories.map(el => (
                        <option key={ el.category } value={ el.category }>{ el.category }</option>  
                    ))
                }
            </select>

            <input type="checkbox" id="men" name="men" value="Men" onChange={ handleGenderChange } />
            <label htmlFor="men">Men</label>
            <input type="checkbox" id="women" name="women" value="Women" onChange={ handleGenderChange } />
            <label htmlFor="women">Women</label>

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