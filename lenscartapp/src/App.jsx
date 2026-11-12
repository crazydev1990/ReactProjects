import React, { useState } from 'react';
import Lenscart from './components/Lenscart';
import WebApplyzer from './components/WebApplyzer';
import VirtualPiano from './components/VirtualPiano';
import KeyBoard from './components/KeyBoard';
import VirtualPet from './components/VirtualPet';
import CountryStateCityDropdowns from './components/CountryStateCityDropdowns';
import ThemeSwitcher from './components/ThemeSwitcher';       // 🌓 ફેરફાર ૧: ThemeSwitcher ઇમ્પોર્ટ કર્યું
import LanguageSwitcher from './components/LanguageSwitcher'; // 🌐 ફેરફાર ૧: LanguageSwitcher ઇમ્પોર્ટ કર્યું
import './App.css';

function App() {
  // કઈ ટૅબ ખુલ્લી રાખવી તે માટેનું સ્ટેટ
  const [activeTab, setActiveTab] = useState('theme');

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🧭 ટૅબ્સ બટન બાર */}
      <div style={{ maxWidth: '950px', margin: '0 auto 30px auto', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        <button 
          onClick={() => setActiveTab('lenscart')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'lenscart' ? '#38bdf8' : '#1e293b', color: activeTab === 'lenscart' ? '#000' : '#fff' }}
        >
          👓 Lenskart
        </button>

        <button 
          onClick={() => setActiveTab('tech')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'tech' ? '#a78bfa' : '#1e293b', color: activeTab === 'tech' ? '#000' : '#fff' }}
        >
          🔍 Tech Detector
        </button>

        <button 
          onClick={() => setActiveTab('piano')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'piano' ? '#4ade80' : '#1e293b', color: activeTab === 'piano' ? '#000' : '#fff' }}
        >
          🎹 Piano
        </button>

        <button 
          onClick={() => setActiveTab('keyboard')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'keyboard' ? '#eab308' : '#1e293b', color: activeTab === 'keyboard' ? '#000' : '#fff' }}
        >
          ⌨️ Keyboard
        </button>

        <button 
          onClick={() => setActiveTab('location')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'location' ? '#38bdf8' : '#1e293b', color: activeTab === 'location' ? '#000' : '#fff' }}
        >
          🌍 Location Search
        </button>

        <button 
          onClick={() => setActiveTab('pet')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'pet' ? '#f472b6' : '#1e293b', color: activeTab === 'pet' ? '#000' : '#fff' }}
        >
          🐾 Virtual Pet
        </button>

        {/* 🌓 ફેરફાર ૨: નવું Theme Toggle બટન ઉમેર્યું */}
        <button 
          onClick={() => setActiveTab('theme')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'theme' ? '#38bdf8' : '#1e293b', color: activeTab === 'theme' ? '#000' : '#fff' }}
        >
          🌓 Theme Switcher
        </button>

        {/* 🌐 ફેરફાર ૨: નવું Language Switcher બટન ઉમેર્યું */}
        <button 
          onClick={() => setActiveTab('language')}
          style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'language' ? '#a78bfa' : '#1e293b', color: activeTab === 'language' ? '#000' : '#fff' }}
        >
          🌐 Language Switcher
        </button>

      </div>

      {/* 🕹️ પસંદ કરેલું કમ્પોનન્ટ બતાવવાનો ભાગ */}
      <div>
        {activeTab === 'lenscart' && <Lenscart />}
        {activeTab === 'tech' && <WebApplyzer />}
        {activeTab === 'piano' && <VirtualPiano />}
        {activeTab === 'keyboard' && <KeyBoard />}
        {activeTab === 'location' && <CountryStateCityDropdowns />}
        {activeTab === 'pet' && <VirtualPet />}
        
        {/* 🌓🌐 ફેરફાર ૩: બંને નવા કમ્પોનન્ટ્સનું રેન્ડરિંગ */}
        {activeTab === 'theme' && <ThemeSwitcher />}
        {activeTab === 'language' && <LanguageSwitcher />}
      </div>

    </div>
  );
}

export default App;
