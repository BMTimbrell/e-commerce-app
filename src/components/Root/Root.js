import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';
import { fetchUser } from '../../api/api';

function Root() {
    const [userId, setUserId] = useState(null);

    /*const updateUserId = id => {
        setUserId(id);
    };*/

    useEffect(() => {
        if (userId) {
            async function getUser() {
                const result = await fetchUser(userId);
                return result;
            }
            const user = getUser();
            if (!user) {
                setUserId(null);
            }
        }
    }, [userId]);

    return (
        <div>
            <Header userId={ userId } />
            <Outlet context={[userId, setUserId]} />
        </div>
    );
}

export default Root;