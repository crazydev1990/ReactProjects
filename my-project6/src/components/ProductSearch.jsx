import React, { useState, useTransition, useRef, useEffect } from 'react';

const largeSampleData = [
    { id: 'b1', title: 'Google Chrome', category: 'Browser' },
    { id: 'b2', title: 'Mozilla Firefox', category: 'Browser' },
    { id: 'b3', title: 'Apple Safari', category: 'Browser' },
    { id: 'b4', title: 'Microsoft Edge', category: 'Browser' },
    { id: 'b5', title: 'Opera Mini', category: 'Browser' },
    { id: 'b6', title: 'Brave Browser', category: 'Browser' },

    { id: 'm1', title: 'Apple iPhone 15 Pro Max', category: 'Mobile' },
    { id: 'm2', title: 'Apple iPhone 14 Plus', category: 'Mobile' },
    { id: 'm4', title: 'Motorola Edge 40 Neo', category: 'Mobile' },
    { id: 'm5', title: 'Motorola Moto G84', category: 'Mobile' },
    { id: 'm6', title: 'Motorola Razr 40 Ultra', category: 'Mobile' },
    { id: 'm7', title: 'Samsung Galaxy S24 Ultra', category: 'Mobile' },

    { id: 'p1', title: 'JavaScript (ES6+)', category: 'Language' },
    { id: 'p2', title: 'TypeScript', category: 'Language' },
    { id: 'p3', title: 'Python 3', category: 'Language' },
    { id: 'p4', title: 'Java SE', category: 'Language' },
    { id: 'p5', title: 'C++ Programming', category: 'Language' },

    { id: 'mov1', title: 'Inception (2010)', category: 'Movie' },
    { id: 'mov2', title: 'The Dark Knight', category: 'Movie' },
    { id: 'mov4', title: 'Interstellar', category: 'Movie' },
    { id: 'mov5', title: 'Oppenheimer (2023)', category: 'Movie' },
    { id: 'mov6', title: 'Avengers: Endgame', category: 'Movie' }
];

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPending, startTransition] = useTransition();
    const containerRef = useRef(null);

    // સજેશન બોક્સની બહાર ક્લિક કરવાથી તેને બંધ કરવા માટે
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredSuggestions([]);
            setShowDropdown(false);
            return;
        }

        startTransition(() => {
            const filtered = largeSampleData.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowDropdown(true);
        });
    };

    return (
        <div style={{
            fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
            minHeight: '100vh',
            backgroundColor: '#202124',
            color: '#e8eaed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '100px'
        }}>
            
            {/* ગૂગલ લોગો */}
            <div style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '30px' }}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
            </div>

            {/* સર્ચ એરિયા કન્ટેનર જે સજેશનની વિડ્થ નક્કી કરશે */}
            <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '584px' }}>
                
                {/* ગૂગલ જેવો બાર (જ્યારે સજેશન ખુલે ત્યારે નીચેના ખૂણા ચોરસ થઈ જશે) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#303134',
                    borderRadius: showDropdown && filteredSuggestions.length > 0 ? '24px 24px 0 0' : '24px',
                    border: '1px solid transparent',
                    boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
                    padding: '0 18px',
                    height: '46px',
                    position: 'relative',
                    zIndex: 12
                }}>
                    <span style={{ color: '#9aa0a6', marginRight: '12px', fontSize: '16px' }}>🔍</span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => searchTerm && setShowDropdown(true)}
                        placeholder="બ્રાઉઝર, આઇફોન, મોશન પિક્ચર કે લેંગ્વેજ સર્ચ કરો..."
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#e8eaed',
                            fontSize: '16px',
                            height: '100%'
                        }}
                    />
                    {isPending && <span style={{ color: '#888', fontSize: '14px' }}>...</span>}
                </div>

                {/* આ છે ૧૦૦% Full Width કસ્ટમ ડ્રોપડાઉન બોક્સ */}
                {showDropdown && filteredSuggestions.length > 0 && (
                    <ul style={{
                        position: 'absolute',
                        top: '45px', // બારની બરાબર નીચેથી શરૂ થશે
                        left: 0,
                        right: 0,    // આનાથી તે સર્ચ બાર જેટલી જ ૧૦૦% પહોળાઈ (Full Width) પકડશે
                        backgroundColor: '#303134',
                        margin: 0,
                        padding: '8px 0',
                        listStyle: 'none',
                        borderRadius: '0 0 24px 24px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        borderTop: '1px solid #3c4043',
                        zIndex: 11,
                        maxHeight: '280px',
                        overflowY: 'auto'
                    }}>
                        {filteredSuggestions.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => {
                                    setSearchTerm(item.title);
                                    setShowDropdown(false);
                                }}
                                style={{
                                    padding: '10px 18px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    color: '#e8eaed',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'background-color 0.1s'
                                }}
                                // માઉસ ઉપર લઈ જતાં ગૂગલ જેવો ગ્રે કલર થશે
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3c4043'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '14px', color: '#9aa0a6' }}>🕒</span>
                                    <span>{item.title}</span>
                                </div>
                                {/* બાજુમાં ઝાંખા અક્ષરે કેટેગરી બતાવશે */}
                                <span style={{ fontSize: '13px', color: '#9aa0a6', fontStyle: 'italic' }}>
                                    {item.category}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* બટનો */}
            <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                <button style={{ backgroundColor: '#303134', border: 'none', borderRadius: '4px', color: '#e8eaed', padding: '0 16px', height: '36px', cursor: 'pointer' }}>Google Search</button>
                <button style={{ backgroundColor: '#303134', border: 'none', borderRadius: '4px', color: '#e8eaed', padding: '0 16px', height: '36px', cursor: 'pointer' }}>I'm Feeling Lucky</button>
            </div>
        </div>
    );
};

export default ProductSearch;
