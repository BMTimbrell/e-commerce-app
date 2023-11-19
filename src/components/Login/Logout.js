import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { logoutUser } from '../../api/api';

function Logout() {
    const [userId, setUserId] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function logout() {
            const result = await logoutUser();
            console.log(result);
            setUserId(null);
            sessionStorage.removeItem('id');
            navigate('/login');
        }
        logout();
    }, [userId, navigate, setUserId]);
    

    return (
        <h1 style={{textAlign: 'center', marginTop: '2rem'}}>
            Logging out...
        </h1>
    );
}

export default Logout;