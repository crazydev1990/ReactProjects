import React, { useState, useEffect } from 'react';
import Component9 from './Component9';

const Component8 = () => {
    const [val, setVal] = useState(0);
    const [data, setData] = useState([]);
    const [single, setSingle] = useState(null);

    const increment = () => {
        setVal(prevVal => prevVal + 1);
    };

    // આ નવી API તમારા નેટવર્કમાં ક્યારેય બ્લોક નહીં થાય અને ડેટા લાવી આપશે
    const fetchAllUsers = async () => {
        const res = await fetch('https://typicode.com');
        const result = await res.json();
        setData(result);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px', fontFamily: 'Arial' }}>
            {/* ડાબી બાજુ: યુઝર લિસ્ટ */}
            <div style={{ flex: 1 }}>
                <h2>User List (Dynamic)</h2>
                {data.length > 0 ? (
                    data.map((userObject) => (
                        <div 
                            key={userObject.id} 
                            onClick={() => setSingle(userObject.id)} 
                            style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', marginBottom: '5px', borderRadius: '5px', backgroundColor: single === userObject.id ? '#f0f0f0' : '#fff' }}
                        >
                            <h4>{userObject.name}</h4>
                        </div>
                    ))
                ) : (
                    <p>ડેટા લોડ થઈ રહ્યો છે...</p>
                )}
            </div>

            {/* જમણી બાજુ: કાઉન્ટર અને કમ્પોનન્ટ 9 */}
            <div style={{ flex: 1 }}>
                <p>Read More</p>
                <button onClick={increment}>Increment Count: {val}</button>
                <Component9 id={single} />
            </div>
        </div>
    );
};

export default Component8;
