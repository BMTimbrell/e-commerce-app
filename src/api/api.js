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

        const jsonResponse = await response.json();
        return jsonResponse;
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

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${baseUrl}/products`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });
        const products = await response.json();
        return products;
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
        const products = await response.json();
        return products;
    } catch (error) {
        console.log(error);
    }
    
};

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

export const addItemToCart = async (id, price, size) => {
    try {
        const response = await fetch(`${baseUrl}/cart`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                id,
                price,
                size
            }),
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