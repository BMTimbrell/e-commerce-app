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
    const [isChecked, setIsChecked] = useState({
        men: gender === "Men" || gender === "Both",
        women: gender === "Women" || gender === "Both"
    });

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

    useEffect(() => {
        setIsChecked({
            men: gender === "Men" || gender === "Both",
            women: gender === "Women" || gender === "Both"
        });
    }, [gender]);

    const handleCategoryChange = e => {
        searchParams.set('category', e.target.value);
        setSearchParams(searchParams);
    };

    const handleGenderChange = e => {
        //Check if box is checked or unchecked and change value accordingly
        const value = e.target.value;
        const checked = e.target.checked;
        let param = '';
        param = value;
        console.log (isChecked);
        if (checked && ((value === 'Men' && !isChecked.women) || (value === 'Women && !isChecked.men'))) {
            param = value;
        } else if (checked && (isChecked.women || isChecked.men)) {
            param = 'Both'
        } else if (gender === 'Both') {
            if (value === 'Men') param = 'Women';
            else param = 'Men';
        } else if (!checked) param = '';

        searchParams.set('gender', param);
        setSearchParams(searchParams);
    };

    return (
        <main className="main__products">
            <h1 className="products__heading">Products</h1>
            <section className="products__filters">
                <div className="filter__category">
                    <label htmlFor="category">Category: </label>
                    <select 
                        name="category" 
                        className="category__dropdown"
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
                </div>
                <div className="filter__gender">
                    <input 
                        type="checkbox" 
                        className="gender__checkbox"
                        id="men"
                        value="Men"
                        defaultChecked={isChecked.men} 
                        onChange={handleGenderChange} 
                    />
                    <label htmlFor="men">Men</label>
                    <input 
                        type="checkbox"
                        className="gender__checkbox"
                        id="women" 
                        value="Women"
                        defaultChecked={isChecked.women}  
                        onChange={handleGenderChange} 
                    />
                    <label htmlFor="women">Women</label>
                </div>
            </section>
            

            {
                isLoading && <h2>Loading...</h2>
            }
            {
                error && <h2>Failed to load products!</h2>
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