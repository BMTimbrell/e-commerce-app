const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
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