
import React, { useState } from 'react';

import XeroxMachine from './components/XeroxMachine';
import DocScanner from './components/DocScanner';
import QRScanner from './components/QRScanner';
import WebsiteCloner from './components/WebsiteCloner';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('scanner');

  const tabs = [
    {
      id: 'xerox',
      label: '🖨️ Xerox',
      component: <XeroxMachine />,
    },
    {
      id: 'scanner',
      label: '📄 Doc Scanner',
      component: <DocScanner />,
    },
    {
      id: 'qr',
      label: '📷 QR Scanner',
      component: <QRScanner />,
    },
    {
      id: 'web',
      label: '📷 Web Cloner',
      component: <WebsiteCloner />,
    },
  ];

  return (
    <div className="app-container">

      {/* Navigation Tabs */}
      <nav className="app-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`app-tab ${
              activeTab === tab.id ? 'active' : ''
            }`}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Active Component */}
      <main className="app-content">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </main>

    </div>
  );
}

export default App;
