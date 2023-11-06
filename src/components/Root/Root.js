import React, { useState } from 'react';
import Header from '../Header/Header.js';
import { Outlet } from 'react-router-dom';

function Root() {
    const [userId, setUserId] = useState(null);

    const updateUserId = id => {
        setUserId(id);
    };

    return (
        <div>
            <Header updateUserId={ updateUserId } userId={ userId } />
            <Outlet context={[userId, setUserId]} />
        </div>
    );
}

export default Root;