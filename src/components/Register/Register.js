import React, { useState, useEffect } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';

function Register() {
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userId) navigate('/');
    }, [userId, navigate]);

    const handleFirstNameChange = e => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = e => {
        setLastName(e.target.value);
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await registerUser(firstName, lastName, email, password);
        if (result) {
            sessionStorage.setItem('id', result.id);
            setUserId(result.id);
            navigate('/'); 
        }
    };

    return (
        <div>
             <h2>Register</h2>
             
            <form onSubmit={ handleSubmit }>
                <input type="text" onChange={ handleFirstNameChange } placeholder="first name" />
                <input type="text" onChange={ handleLastNameChange } placeholder="last name" />
                <input type="email" onChange={ handleEmailChange } placeholder="email" />
                <input type="password" onChange={ handlePasswordChange } placeholder="password" />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login">Click here</Link> to login.</p>
        </div>
    );
}

export default Register;