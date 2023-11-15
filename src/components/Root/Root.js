import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';

function Root() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setUserId(sessionStorage.getItem('id'));
    }, []);

    return (
        <div>
            <Header userId={ userId } />
            <Outlet context={ [userId, setUserId] } />
        </div>
    );
}

export default Root;