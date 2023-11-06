import React, { useState, useEffect } from 'react';
import { loginUser } from "../../api/api";
import { useNavigate, useOutletContext } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        if (userId) navigate('/');
    }, [userId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(email, password);
        console.log(result);
        if (result) {
            setUserId(result.id);
            setPassword('');
            setEmail('');
            navigate('/');
        } else {
            setError('Email or password is incorrect!');
        }  
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
            <p>{error || ''}</p>
        </div>
    );
}

export default Login;