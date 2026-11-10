import React, { useState, useEffect } from 'react';

const Component9 = ({ id }) => {
    const [user, setUser] = useState(null);

    const fetchSingleUser = async () => {
        const res = await fetch(`https://typicode.com{id}`);
        const result = await res.json();
        setUser(result);
    };

    useEffect(() => {
        if (id) {
            fetchSingleUser();
        }
    }, [id]);

    if (!id || !user) {
        return <p style={{ marginTop: '10px' }}>વિગત જોવા માટે કોઈપણ યુઝર પર ક્લિક કરો.</p>;
    }

    return (
        <div style={{ border: '1px solid black', padding: '15px', marginTop: '10px', borderRadius: '5px' }}>
            <h3>Name: {user.name}</h3>
            <p><strong>Username:</strong> @{user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>City:</strong> {user.address?.city}</p>
        </div>
    );
};

export default Component9;
