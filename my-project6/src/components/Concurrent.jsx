import React, { useTransition, useState, useRef, useEffect } from 'react'

const Concurrent = () => {
    console.log("function rendered");
    
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPending, startTransition] = useTransition();
    const dropdownRef = useRef(null);

    // સજેશન માટેનો મોટો સેમ્પલ ડેટા (બ્રાઉઝર્સ, મૂવીઝ, લેંગ્વેજીસ)
    const sampleData = [
        { id: 1, title: 'Google Chrome', category: 'Browser' },
        { id: 2, title: 'Mozilla Firefox', category: 'Browser' },
        { id: 3, title: 'Apple Safari', category: 'Browser' },
        { id: 4, title: 'Microsoft Edge', category: 'Browser' },
        { id: 5, title: 'Opera Mini', category: 'Browser' },
        { id: 6, title: 'Apple iPhone 15 Pro Max', category: 'Mobile' },
        { id: 7, title: 'Motorola Edge 40 Neo', category: 'Mobile' },
        { id: 8, title: 'Samsung Galaxy S24 Ultra', category: 'Mobile' },
        { id: 9, title: 'JavaScript (ES6+)', category: 'Language' },
        { id: 10, title: 'Python 3', category: 'Language' },
        { id: 11, title: 'Inception (2010)', category: 'Movie' },
        { id: 12, title: 'Avengers: Endgame', category: 'Movie' }
    ];

    // ડ્રોપડાઉનની બહાર ક્લિક કરવાથી તેને બંધ કરવા માટે
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ગૂગલ સર્ચ ઇનપુટનું ચેન્જ હેન્ડલર (useTransition સાથે)
    function handleSearch(e) {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === '') {
            setFilteredSuggestions([]);
            setShowDropdown(false);
            return;
        }

        // ભારે ફિલ્ટરિંગ પ્રોસેસ બેકગ્રાઉન્ડમાં જશે, જેથી ટાઈપિંગ અટકે નહીં
        startTransition(() => {
            const filtered = sampleData.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowDropdown(true);
        });
    }

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            {console.log("ui rendered")}
            
            {/* ૧. કાઉન્ટર સેક્શન (ઇનપુટ બોક્સ પણ ટાઈપ કરી શકાશે) */}
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0 }}>{count}</h1>
                <input 
                    type="text" 
                    value={count} 
                    onChange={(e) => setCount(Number(e.target.value) || 0)} // ભુલ સુધારી: onChange ઉમેર્યું
                    style={{ padding: '8px', width: '60px', textAlign: 'center' }}
                />
                <button onClick={() => setCount(count + 1)} style={{ padding: '8px 15px', cursor: 'pointer' }}>+</button>
            </div>

            {/* ૨. ગૂગલ સર્ચ ફૂલ-વિડ્થ સેક્શન */}
            <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
                
                {/* મેઈન સર્ચ ઇનપુટ બાર */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <input 
                        type="text" 
                        value={search} 
                        onChange={handleSearch} 
                        placeholder="ગૂગલની જેમ સર્ચ કરો (દા.ત. Chrome, iPhone)..."
                        style={{
                            width: '100%',
                            padding: '12px 20px',
                            fontSize: '16px',
                            borderRadius: showDropdown && filteredSuggestions.length > 0 ? '24px 24px 0 0' : '24px',
                            border: '1px solid #dfe1e5',
                            outline: 'none',
                            boxShadow: '0 1px 6px rgba(32,33,36,0.28)'
                        }}
                    />
                    {isPending && <span style={{ position: 'absolute', right: '15px', color: '#9aa0a6' }}>...</span>}
                </div>

                {/* એક્ઝેક્ટ ફૂલ-વિડ્થ (Full Width) સજેશન બોક્સ */}
                {showDropdown && filteredSuggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        top: '44px',
                        left: 0,
                        right: 0, // આનાથી સર્ચ બાર જેટલી જ ૧૦０% પહોળાઈ પકડશે
                        backgroundColor: '#fff',
                        margin: 0,
                        padding: '10px 0',
                        listStyle: 'none',
                        border: '1px solid #dfe1e5',
                        borderTop: 'none',
                        borderRadius: '0 0 24px 24px',
                        boxShadow: '0 4px 6px rgba(32,33,36,0.28)',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        zIndex: 1000
                    }}>
                        {filteredSuggestions.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => {
                                    setSearch(item.title);
                                    setShowDropdown(false);
                                }}
                                style={{
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    color: '#000',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f4'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <span>🔍 {item.title}</span>
                                <span style={{ fontSize: '12px', color: '#70757a', fontStyle: 'italic' }}>{item.category}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Concurrent;
