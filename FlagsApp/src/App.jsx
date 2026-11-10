import React, { useState } from 'react';
import Flags from './components/Flags';
import CatApi from './components/CatApi';
import DogApi from './components/DogApi'; // 🐶 Import the new Dog component
import './App.css';

function App() {
  // Navigation State Tab Controller (1 = World Flags, 2 = Cat Discovery, 3 = Dog Discovery)
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🧭 PREMIUM FLAT NAVIGATION TABS BAR (UPGRADED TO 3 SLOTS) */}
      <div style={{ maxWidth: '500px', margin: '0 auto 30px auto', display: 'flex', backgroundColor: '#0f172a', padding: '6px', borderRadius: '30px', border: '1px solid #1e293b', gap: '4px' }}>
        <button 
          onClick={() => setActiveTab(1)}
          style={{ 
            flex: 1, padding: '12px 4px', borderRadius: '25px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === 1 ? '#38bdf8' : 'transparent',
            color: activeTab === 1 ? '#020617' : '#94a3b8'
          }}
        >
          🗺️ World Flags
        </button>
        <button 
          onClick={() => setActiveTab(2)}
          style={{ 
            flex: 1, padding: '12px 4px', borderRadius: '25px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === 2 ? '#38bdf8' : 'transparent',
            color: activeTab === 2 ? '#020617' : '#94a3b8'
          }}
        >
          🐱 Cat Finder
        </button>
        <button 
          onClick={() => setActiveTab(3)}
          style={{ 
            flex: 1, padding: '12px 4px', borderRadius: '25px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === 3 ? '#38bdf8' : 'transparent',
            color: activeTab === 3 ? '#020617' : '#94a3b8'
          }}
        >
          🐶 Dog Finder
        </button>
      </div>

      {/* 🕹️ DYNAMIC HUB RENDER NODE */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeTab === 1 && <Flags />}
        {activeTab === 2 && <CatApi />}
        {activeTab === 3 && <DogApi />}
      </div>

    </div>
  );
}

export default App;
