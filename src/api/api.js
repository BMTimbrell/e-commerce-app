const baseUrl = 'http://localhost:3001';

//Logging in and registering

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.log(error);
    }
};

export const fetchUser = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/users/${id}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.log(error);
    }
};

//Products

export const fetchProducts = async (category, gender) => {
    let url = `${baseUrl}/products`;
    if (gender === "Both") gender = null;
    if (category && gender) {
        url = `${baseUrl}/products?category=${category}&gender=${gender}`;
    } else if (category) {
        url = `${baseUrl}/products?category=${category}`;
    } else if (gender) {
        url = `${baseUrl}/products?gender=${gender}`;
    }


    try {
        const response = await fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        if (response.ok) {
            const products = await response.json();
            return products;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
    
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/products/${id}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        if (response.ok) {
            const products = await response.json();
            return products;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
    
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseUrl}/products/categories`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        const categories = await response.json();
        return categories;
    } catch (error) {
        console.log(error);
    }
};

//Cart

export const fetchCart = async () => {
    try {
        const response = await fetch(`${baseUrl}/cart`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        if (response.status === 401) return response.status;

        if (response.ok) {
            const cart = await response.json();
            return cart;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const createCart = async (products) => {
    try {
        const response = await fetch(`${baseUrl}/cart`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(products),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });
        const cart = await response.json();
        return cart;
    } catch (error) {
        console.log(error);
    }
};

export const addItemToCart = async (id, price, size, name, image) => {
    try {
        const response = await fetch(`${baseUrl}/cart`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                id,
                price,
                size,
                name,
                image
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });

        if (response.ok) {
            const cart = await response.json();
        return cart;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const makePayment = async (id, amount) => {
    try {
        const response = await fetch(`${baseUrl}/checkout`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                id,
                amount
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/",
            }
        });

        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

//Orders

export const fetchOrders = async () => {
    try {
        const response = await fetch(`${baseUrl}/orders`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/",
            }
        });

        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};