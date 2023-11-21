import React, { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    //Check user is logged in
    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setUserData({
                        firstName: result.first_name,
                        lastName: result.last_name,
                        email: result.email
                    });
                } else {
                    navigate('/logout');
                }   
            } 

            getUser();
        } else {
            navigate('/login');
        }
    }, [navigate, isSubmitting]);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await updateUser(
            sessionStorage.getItem('id'),
            formData
        );
        setIsSubmitting(false);
        
        if (!result) {
            setError(true);
            return;
        }

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        });
        setIsEditing(false);
    };

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

    return (
        <main className="user-profile">
            <h1 className="profile__heading">
                {userData.firstName? userData.firstName + '\'s Account' : 'Your Account'}
            </h1>
            <section className="user-details">
                <h2 className="user-details__heading">User Details</h2>
            
                {!isEditing && (
                    <>
                        <p>Name: {userData.firstName + ' ' + userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                    </>
                )}

                {isEditing && (
                    <form className="form" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder={userData.firstName}
                            onChange={handleChange}
                            name="firstName"
                        />
                        <input 
                            type="text" 
                            placeholder={userData.lastName}
                            onChange={handleChange}
                            name="lastName"
                        />
                        <input 
                            type="email" 
                            placeholder={userData.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <input
                            type="password" 
                            placeholder="Password" 
                            onChange={handleChange}
                            name="password"
                        />
                        <input 
                            type="submit"
                            className="btn"
                            value={isSubmitting ? 'Saving...' : 'Save Changes'}
                            disabled={isSubmitting}
                        />
                        {error && <p>Submission failed!</p>}
                    </form>
                )}

                <button 
                    onClick={() => {
                        setIsEditing(true);
                    }}
                    className="btn"
                    style={isEditing ? {display: 'none'} : {}}
                >
                    Edit Details
                </button>
                
            </section>
            <section className="profile__orders">
                <h2 className="profile__orders__heading">Orders</h2>
                <p><Link className="link" to="orders">Click here</Link> to view your past orders.</p>
            </section>
        </main>
    );
}

export default Profile;