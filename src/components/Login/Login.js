import React, { useState, useEffect } from 'react';
import { loginUser } from "../../api/api";
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
        const result = await loginUser(formData.email, formData.password);
        if (result) {
            sessionStorage.setItem('id', result.id);
            setUserId(result.id);
            setFormData({ email: '', passowrd: '' });
            setIsPending(false);
            navigate('/');
        } else {
            setError('Email or password is incorrect!');
            setIsPending(false);
        }  
    };

    const handleChange = e => {
        if (e.target.name === 'email') {
            setFormData(prev => (
                {
                    ...prev,
                    email: e.target.value
                }
            ));
        } else {
            setFormData(prev => (
                {
                    ...prev,
                    password: e.target.value
                }
            ));
        }
    };

    return (
        <div>
            <h2>Login</h2>
            
            <form onSubmit={ handleSubmit }>
                <input type="email" name="email" onChange={ handleChange } placeholder="email" />
                <input type="password" name="password" onChange={ handleChange } placeholder="password" />
                <input disabled={ isPending } type="submit" value="Login" />
            </form>
            <p>{error || ''}</p>
            <p><Link to="/register">Click here</Link> to register.</p>
        </div>
    );
}

export default Login;