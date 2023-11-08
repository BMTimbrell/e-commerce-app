import React from 'react';

function ProductDetails() {
    /*useEffect(() => {
        setIsLoading(true);

        async function getProducts() {
            const result = await fetchProducts();
            if (result) {
                const uniqueProducts = [];
                result.forEach(product => {
                    //check if array already has item with same image
                    if (uniqueProducts.filter( el => el.image === product.image).length === 0) {
                        const temp = product.size;
                        product.size = [];
                        product.size.push(temp);
                        uniqueProducts.push(product);
                    } else {
                        uniqueProducts.forEach(el => {
                            if (el.image === product.image) el.size.push(product.size);
                        });
                    }
                });
                setProducts(uniqueProducts);
                setIsLoading(false);
                setError(false);
            } else {
                setError(true);
                setIsLoading(false);
            }    
        }

        getProducts();      
    }, [setIsLoading, setError, setProducts]);*/
}