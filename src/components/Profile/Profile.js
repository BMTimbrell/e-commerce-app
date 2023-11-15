import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    //Check user is logged in
    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            async function getUser() {
                const result = await fetchUser(sessionStorage.getItem('id'));
                if (result) {
                    setName(result.first_name);
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
            <h2>My Account</h2>
           {
                name
           }
           <h3>Orders</h3>
           <p><Link to="orders">Click here</Link> to view your past orders.</p>
        </div>
    );
}

export default Profile;