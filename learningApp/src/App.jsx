import React, { useState } from 'react';
import GovtPortal from './components/GovtPortal';
import JanSahayakHelpDesk from './components/JanSahayakHelpDesk'; // 🤖 ફેરફાર ૧: AI Help Desk ઇમ્પોર્ટ કર્યું
import './App.css';

function App() {
  // કઈ ટૅબ ખુલ્લી રાખવી તે માટેનું સ્ટેટ ('govt' અથવા 'ai')
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🧭 ફેરફાર ૨: બંને એપ્સ બદલવા માટેના ટૅબ બટનો */}
      <div style={{ maxWidth: '460px', margin: '0 auto 25px auto', display: 'flex', backgroundColor: '#0f172a', padding: '6px', borderRadius: '30px', border: '1px solid #1e293b', gap: '6px' }}>
        
        <button
          onClick={() => setActiveTab('govt')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '13.5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: activeTab === 'govt' ? '#eab308' : 'transparent',
            color: activeTab === 'govt' ? '#000' : '#94a3b8'
          }}
        >
          🏛️ Govt Portal
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '13.5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backgroundColor: activeTab === 'ai' ? '#38bdf8' : 'transparent',
            color: activeTab === 'ai' ? '#000' : '#94a3b8'
          }}
        >
          🤖 જન-સહાયક AI
        </button>

      </div>

      {/* 🕹️ ફેરફાર ૩: પસંદ કરેલું કમ્પોનન્ટ બતાવવાનો ભાગ */}
      <div>
        {activeTab === 'govt' && <GovtPortal />}
        {activeTab === 'ai' && <JanSahayakHelpDesk />}
      </div>

    </div>
  );
}

export default App;
