import React, { useState } from 'react';
import EmojiPicker from './components/EmojiPicker';
import ColorPicker from './components/ColorPicker';
import DragnDropFile from './components/DragnDropFile';
import WordGuess from './components/WordGuess';
import CurrencyConverter from './components/CurrencyConverter';
import TimeZoneClock from './components/TimeZoneClock'; 
import WeatherApp from './components/WeatherApp';
import './App.css';
import PasswordStrengthnOtp from './components/PasswordStrengthnOtp';

function App() {
  // 🧭 સુપર ટૅબ કંટ્રોલર (૧ થી ૮ ટૅબ્સ)
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🧭 PREMIUM FLAT NAVIGATION TABS BAR (UPGRADED TO 8 TABS) */}
      <div style={{ maxWidth: '900px', margin: '0 auto 30px auto', display: 'flex', backgroundColor: '#0f172a', padding: '6px', borderRadius: '30px', border: '1px solid #1e293b', gap: '4px', overflowX: 'auto' }}>
        <button onClick={() => setActiveTab(1)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 1 ? '#38bdf8' : 'transparent', color: activeTab === 1 ? '#020617' : '#94a3b8', minWidth: '85px' }}>😀 Emoji Box</button>
        <button onClick={() => setActiveTab(2)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 2 ? '#a78bfa' : 'transparent', color: activeTab === 2 ? '#020617' : '#94a3b8', minWidth: '85px' }}>🎨 Color Picker</button>
        <button onClick={() => setActiveTab(3)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 3 ? '#10b981' : 'transparent', color: activeTab === 3 ? '#020617' : '#94a3b8', minWidth: '85px' }}>📂 File Drops</button>
        <button onClick={() => setActiveTab(4)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 4 ? '#eab308' : 'transparent', color: activeTab === 4 ? '#020617' : '#94a3b8', minWidth: '85px' }}>📝 Word Guess</button>
        <button onClick={() => setActiveTab(5)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 5 ? '#10b981' : 'transparent', color: activeTab === 5 ? '#020617' : '#94a3b8', minWidth: '95px' }}>💳 Currency</button>
        <button onClick={() => setActiveTab(6)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 6 ? '#a78bfa' : 'transparent', color: activeTab === 6 ? '#020617' : '#94a3b8', minWidth: '95px' }}>⏱️ Clock Hub</button>
        <button onClick={() => setActiveTab(7)} style={{ flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 7 ? '#10b981' : 'transparent', color: activeTab === 7 ? '#020617' : '#94a3b8', minWidth: '95px' }}>🌤️ Weather</button>
        
        {/* 🔒 LINE 30: ફેરફાર ૨: નેવિગેશન બારની અંદર ૮મું નવું સિક્યોરિટી ગેટવે બટન એડ કર્યું */}
        <button 
          onClick={() => setActiveTab(8)} 
          style={{ 
            flex: 1, padding: '12px 2px', borderRadius: '25px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', minWidth: '95px', transition: 'all 0.2s',
            backgroundColor: activeTab === 8 ? '#38bdf8' : 'transparent', 
            color: activeTab === 8 ? '#020617' : '#94a3b8' 
          }}
        >
          🔒 Security
        </button>
      </div>

      {/* 🕹️ DYNAMIC CONTAINER HUB */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeTab === 1 && <EmojiPicker />}
        {activeTab === 2 && <ColorPicker />}
        {activeTab === 3 && <DragnDropFile />}
        {activeTab === 4 && <WordGuess />}
        {activeTab === 5 && <CurrencyConverter />}
        {activeTab === 6 && <TimezoneClock />}
        {activeTab === 7 && <WeatherApp />} 
        {activeTab === 8 && <PasswordStrengthnOtp />} {/* 🔒 ફેરફાર ૩: શરત મેચ થતાં સિક્યોરિટી અને લાઈવ ઓટીપી મોડ્યુલ ઓન-સ્ક્રીન રેન્ડર થશે */}
      </div>

    </div>
  );
}

export default App;
