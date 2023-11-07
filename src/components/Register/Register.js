import React, { useState } from 'react';
import { registerUser } from '../../api/api';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Register() {
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
             Register
            <form onSubmit={ handleSubmit }>
                <input type="text" onChange={ handleFirstNameChange } placeholder="first name" />
                <input type="text" onChange={ handleLastNameChange } placeholder="last name" />
                <input type="email" onChange={ handleEmailChange } placeholder="email" />
                <input type="password" onChange={ handlePasswordChange } placeholder="password" />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;