import React, { useState, useEffect } from 'react';
import { loginUser } from "../../api/api";
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({email: '', password: ''});
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
            setFormData({email: '', passowrd: ''});
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
        <main className="main__login">
            <section className="login">
                <h1 className="login__heading">Login</h1>
                
                <form className="login__form" onSubmit={handleSubmit}>
                    <input 
                        required
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="Email" 
                    />
                    <input
                        required
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        placeholder="Password" 
                    />
                    <input className="btn" disabled={isPending} type="submit" value="Login" />
                </form>
                <p>{error || ''}</p>
            </section>
            <section>
                <p><Link className="register__link" to="/register">Click here</Link> to register.</p>
            </section>
        </main>
    );
}

export default Login;