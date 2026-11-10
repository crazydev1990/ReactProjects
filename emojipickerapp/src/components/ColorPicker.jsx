import React, { useState } from 'react';

const ColorPicker = () => {
  // ૧. પસંદ કરેલો કલર સાચવવાનું સાદું સ્ટેટ ખાનું
  const [color, setColor] = useState('#38bdf8');

  return (
    <div style={{ maxWidth: '380px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #a78bfa', padding: '25px', borderRadius: '20px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box', boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }}>
      
      <h3 style={{ margin: '0 0 5px 0', color: '#a78bfa', fontSize: '20px', fontWeight: 'bold' }}>Simple Color Picker 🎨</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#64748b' }}>Choose a color to see its live HEX code</p>

      {/* 📺 કલર પ્રીવ્યુ મોનિટર બોક્સ */}
      <div style={{ backgroundColor: color, height: '130px', borderRadius: '12px', border: '2px solid #fff', marginBottom: '20px', transition: 'background-color 0.1s ease', boxShadow: '0 10px 15px rgba(0,0,0,0.3)' }} />

      {/* 🏷️ ફિક્સ કરેલો ભાગ: અક્ષરોનો રંગ સફેદ (White) અને મોટો કર્યો છે જેથી મસ્ત વંચાશે */}
      <div style={{ backgroundColor: '#020617', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '20px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
        <code style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1.5px' }}>
          HEX: {color.toUpperCase()}
        </code>
      </div>

      {/* 🎛️ બ્રાઉઝરનું ઇન-બિલ્ટ કલર સ્લાઇડર પેલેટ */}
      <input 
        type="color" 
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: '100%', height: '45px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent' }}
      />

    </div>
  );
};

export default ColorPicker;
