import React, { useState } from 'react';

function ThemeSwitcher() {
  // ૧. થીમ સ્ટેટ: true = Dark Mode, false = Light Mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div
      style={{
        maxWidth: '450px',
        margin: '0 auto',
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        transition: 'all 0.3s ease',
        // થીમ મુજબ બેકગ્રાઉન્ડ અને ટેક્સ્ટ કલર બદલાશે
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
        color: isDarkMode ? '#ffffff' : '#0f172a',
        border: isDarkMode ? '2px solid #38bdf8' : '2px solid #cbd5e1',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', color: isDarkMode ? '#38bdf8' : '#2563eb' }}>
        {isDarkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
      </h3>

      <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '25px', opacity: 0.85 }}>
        Click the toggle switch below to change the screen background and text contrast smoothly.
      </p>

      {/* 🔘 સ્ટાઇલિશ Toggle Switch બટન */}
      <div
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          width: '74px',
          height: '38px',
          backgroundColor: isDarkMode ? '#38bdf8' : '#cbd5e1',
          borderRadius: '30px',
          margin: '0 auto',
          padding: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isDarkMode ? 'flex-end' : 'flex-start',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
