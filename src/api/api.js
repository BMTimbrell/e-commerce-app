export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3001/login', {
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
        const response = await fetch('http://localhost:3001/logout', {
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
        const response = await fetch('http://localhost:3001/register', {
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
        const response = await fetch(`http://localhost:3001/users/${id}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });
        const user = await response.json();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
    }
};