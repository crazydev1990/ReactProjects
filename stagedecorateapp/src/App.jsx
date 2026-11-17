
import './App.css'
import { useState } from 'react'

import StageDecorate from './components/StageDecorate'
import DigitalLibrary from './components/DigitalLibrary'
import DigiLockerApp from './components/DigiLockerApp'

function App() {
  const [activeTab, setActiveTab] = useState('stage')

  return (
    <div className="app-container">
      <div className="tab-header">
        <button
          className={activeTab === 'stage' ? 'active' : ''}
          onClick={() => setActiveTab('stage')}
        >
          Stage Decorate
        </button>

        <button
          className={activeTab === 'lib' ? 'active' : ''}
          onClick={() => setActiveTab('lib')}
        >
          Digital Library
        </button>

        <button
          className={activeTab === 'vault' ? 'active' : ''}
          onClick={() => setActiveTab('vault')}
        >
          DigiLocker
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'stage' && <StageDecorate />}

        {activeTab === 'lib' && <DigitalLibrary />}

        {activeTab === 'vault' && <DigiLockerApp />}
      </div>
    </div>
  )
}

export default App
