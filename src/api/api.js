export const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": 'application/json'
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
        const response = await fetch('http://localhost:3001/logout');
        return response;
    } catch (error) {
        console.log(error);
    }
};