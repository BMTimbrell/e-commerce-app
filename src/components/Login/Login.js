import React, { useState, useEffect } from 'react';
import { loginUser } from "../../api/api";
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (userId) navigate('/');
    }, [userId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const result = await loginUser(email, password);
        if (result) {
            sessionStorage.setItem('id', result.id);
            setUserId(result.id);
            setPassword('');
            setEmail('');
            setIsPending(false);
            navigate('/');
        } else {
            setError('Email or password is incorrect!');
            setIsPending(false);
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
            <h2>Login</h2>
            
            <form onSubmit={ handleSubmit }>
                <input type="email" onChange={ handleEmailChange } placeholder="email" />
                <input type="password" onChange={ handlePasswordChange } placeholder="password" />
                <input disabled={ isPending } type="submit" value="Login" />
            </form>
            <p>{error || ''}</p>
            <p><Link to="/register">Click here</Link> to register.</p>
        </div>
    );
}

export default Login;