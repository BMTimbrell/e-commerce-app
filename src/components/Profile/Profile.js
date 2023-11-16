import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
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
    }, [navigate]);

    return (
        <div>
            <h2>{userData.firstName}'s Account</h2>
            <h3>User Details</h3>
            <section>
                <p>First name: {userData.firstName}</p>
                <p>Last name: {userData.lastName}</p>
                <p>Email: {userData.email}</p>
                <button onClick={() => {
                    setIsEditing(true);
                }}>
                    {isEditing ? 'Save Changes' : 'Edit Details'}
                </button>
            </section>
            <h3>Orders</h3>
            <p><Link to="orders">Click here</Link> to view your past orders.</p>
        </div>
    );
}

export default Profile;