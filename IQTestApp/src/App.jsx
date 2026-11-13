import React, { useState } from 'react';
import './App.css';

import QuoteOfDay from './components/QuoteOfDay';
import ProductCatalog from './components/ProductCatalog';
import CandyCrushGame from './components/CandyCrushGame'; 
import AstroApp from './components/AstroApp';
import FindCountryGame from './components/FindCountryGame';
import BiometricCheck from './components/BioMetricCheck';// 🍬 ફેરફાર ૧: CandyCrushGame ઇમ્પોર્ટ કર્યું
import PasswordValidator from './components/PasswordValidator';
import IQTest from './components/IQTest';

function App() {
  const [activeTab, setActiveTab] = useState('candy');

  const tabs = [
    { id: 'quote', label: '💡 Quote of Day' },
    { id: 'products', label: '🛍️ Product Catalog' },
    { id: 'candy', label: '🍬 Candy Crush' } ,
    { id: 'astro', label: '🍬 Astro App' },
    { id: 'findCountry', label: '🍬 Find Country Game' },
    { id: 'biometricCheck', label: '🍬 BioMetric Verification' } ,
    { id: 'passwordValidator', label: '🍬 Password Validator' },
    { id: 'iqTest', label: '🍬 IQ Test' }// 🍬 ફેરફાર ૨: નવી Candy Crush ટૅબ ઉમેરી
  ];

  return (
    <div style={{ padding: '20px' }}>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '25px'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              border: '1px solid #38bdf8',
              backgroundColor:
                activeTab === tab.id ? '#38bdf8' : '#0f172a',
              color: activeTab === tab.id ? '#000' : '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Components */}
      {activeTab === 'quote' && <QuoteOfDay />}

      {activeTab === 'products' && <ProductCatalog />}

      {/* 🍬 ફેરફાર ૩: Candy Crush ટૅબ પર ક્લિક થતા CandyCrushGame ખુલશે */}
      {activeTab === 'candy' && <CandyCrushGame />}

      {activeTab === 'astro' && <AstroApp />}
      {activeTab === 'findCountry' && <FindCountryGame />}
      {activeTab === 'biometricCheck' && <BiometricCheck />}
      {activeTab === 'passwordValidator' && <PasswordValidator />}
      {activeTab === 'iqTest' && <IQTest />}


    </div>
  );
}

export default App;
