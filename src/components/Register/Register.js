import React, { useState, useEffect } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import '../Login/Login.css';

function Register() {
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (userId) navigate('/');
    }, [userId, navigate]);

    const handleChange = e => {
        if (e.target.name === 'firstName') {
            setFormData(prev => (
                {
                    ...prev,
                    firstName: e.target.value
                }
            ));
        } else if (e.target.name === 'lastName') {
            setFormData(prev => (
                {
                    ...prev,
                    lastName: e.target.value
                }
            ));
        } else if (e.target.name === 'email') {
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

    const handleSubmit = async e => {
        e.preventDefault();
        setIsPending(true);
        const result = await registerUser(
            formData.firstName, formData.lastName, formData.email, formData.password
        );
        if (result) {
            sessionStorage.setItem('id', result.id);
            setUserId(result.id);
            navigate('/'); 
        }

        setError(true);
        setIsPending(false);
    };

    return (
        <main style={{padding: '2rem', textAlign: 'center'}}>
            <section className="register">
                <h1 className="form__heading">Register</h1>
                
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        required
                        name="firstName" 
                        type="text" 
                        onChange={handleChange} 
                        placeholder="First name" 
                    />
                    <input 
                        required
                        name="lastName" 
                        type="text" 
                        onChange={handleChange} 
                        placeholder="Last name" 
                    />
                    <input
                        required
                        name="email" 
                        type="email" 
                        onChange={handleChange} 
                        placeholder="Email" 
                    />
                    <input 
                        required
                        name="password" 
                        type="password" 
                        onChange={handleChange} 
                        placeholder="Password" 
                    />
                    <input 
                        disabled={isPending} 
                        type="submit" 
                        className="btn"
                        value={isPending ? "Registering..." : "Register"}
                    />
                </form>
                {
                    error && <><p>Invalid user credentials</p><br /></>
                }
            </section>
            <section>
                <p style={{textAlign: 'center'}}>
                    Already have an account? <Link className="link" to="/login">Click here</Link> to login.
                </p>
            </section>
            
        </main>
    );
}

export default Register;