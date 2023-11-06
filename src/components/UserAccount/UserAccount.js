import React, { useState, useEffect } from 'react';
import { fetchUser } from '../../api/api';
import { useOutletContext } from 'react-router-dom';

function UserAccount() {
    const [name, setName] = useState('');
    const [userId, setUserId] = useOutletContext();
    const [error, setError] = useState('');

    //Check user is logged in
    useEffect(() => {
        if (userId) {
            async function getUser() {
                const result = await fetchUser(userId);
                return result;
            }
            if (getUser()) {
                setName(getUser().first_name);
                setError('');
            } else {
                setError('You must be logged in to view this page!');
            }
        }
    }, [userId]);

    return (
        <div>
           {

           } 
        </div>
    );
}