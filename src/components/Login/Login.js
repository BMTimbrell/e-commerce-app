import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    return (
        <div>
            login
            <form onSubmit={ handleSubmit }>
                <input type="email" onChange={ handleEmailChange }/>
                <input type="password" onChange={ handlePasswordChange } />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;