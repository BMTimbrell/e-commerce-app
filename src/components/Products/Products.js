import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../../api/api';
import Product from './Product';
import { useSearchParams } from 'react-router-dom';
import './Products.css';

function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');

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
        searchParams.set('category', e.target.value);
        setSearchParams(searchParams);
    };

    const handleGenderChange = e => {
        //Check if box is checked or unchecked and change value accordingly
        let param = '';
        if (!e.target.checked) {
            if (gender === "Both") {
                if (e.target.value === "Men") param = "Women";
                if (e.target.value === "Women") param = "Men";
            } else {
                param = 'Both'
            }
        } else {
            if (gender) param = "Both";
            else param = e.target.value;
        }
        searchParams.set('gender', param);
        setSearchParams(searchParams);
    };

    return (
        <main className="main__products">
            <section>
                <h1>Products</h1>
                <label htmlFor="category">Category: </label>
                <select 
                    name="category" 
                    id="category" 
                    onChange={handleCategoryChange} 
                    defaultValue={"default"}
                >
                    <option key="default" value="default" disabled hidden>Filter by category</option>
                    <option key="all" value="all">All</option>
                    {
                        categories && categories.map(el => (
                            <option key={el.category} value={el.category}>{el.category}</option>  
                        ))
                    }
                </select>

                <input 
                    type="checkbox" 
                    id="men" 
                    name="men" 
                    value="Men" 
                    onChange={handleGenderChange} 
                />
                <label htmlFor="men">Men</label>
                <input 
                    type="checkbox" 
                    id="women" 
                    name="women" 
                    value="Women" 
                    onChange={handleGenderChange} 
                />
                <label htmlFor="women">Women</label>
            </section>
            

            {
                isLoading && 'Loading...'
            }
            {
                error && 'Failed to load products!'
            }
            <section className="products">
                {!isLoading && !error && products.map(
                    product => (
                        <Product 
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            manufacturer={product.manufacturer}
                            category={product.category}
                            price={product.price}
                            gender={product.gender}
                            image={product.image}
                        />
                    ))
                }
            </section>
        </main>
    );
}

export default Products;