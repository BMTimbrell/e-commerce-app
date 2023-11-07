import React from 'react';

function Home() {

    return (
        <div>
            <p>Home</p>
            {
                document.cookie
            }
        </div>
    );
}

export default Home;