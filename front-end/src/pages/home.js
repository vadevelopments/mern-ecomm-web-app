import React, { useEffect } from 'react';

function Home({ sessionExpired }) {

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'));

        if (token && token.expiresAt && Date.now() > token.expiresAt) {
            sessionExpired();
        }
    }, [sessionExpired]);

    return (
        <div className='home'>
            home
        </div>
    )
}

export default Home