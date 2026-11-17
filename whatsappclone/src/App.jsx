import { useState } from 'react'
import './App.css'

import WhatsAppClone from './components/WhatsAppClone'
import LinkedInClone from './components/LinkedInClone'
import GitHubClone from './components/GithubClone'
import SocialApp from './components/SocialApp'
import GitClone from './components/GitClone'

function App() {
  const [activeTab, setActiveTab] = useState('whatsapp')

  return (
    <div>
      <div className="app-tabs">
        <button
          className={activeTab === 'whatsapp' ? 'active' : ''}
          onClick={() => setActiveTab('whatsapp')}
        >
          WhatsApp
        </button>

        <button
          className={activeTab === 'linkedin' ? 'active' : ''}
          onClick={() => setActiveTab('linkedin')}
        >
          LinkedIn
        </button>
        <button
          className={activeTab === 'github' ? 'active' : ''}
          onClick={() => setActiveTab('github')}
        >
          GitHub
        </button>
        <button
          className={activeTab === 'social' ? 'active' : ''}
          onClick={() => setActiveTab('social')}
        >
          Social App
        </button>
         <button
          className={activeTab === 'git' ? 'active' : ''}
          onClick={() => setActiveTab('git')}
        >
          Git Clone
        </button>
      </div>

      <div>
        {activeTab === 'whatsapp' && <WhatsAppClone />}
        {activeTab === 'linkedin' && <LinkedInClone />}
        {activeTab === 'github' && <GitHubClone />}
        {activeTab === 'social' && <SocialApp />}
        {activeTab === 'git' && <GitClone />}
      </div>
    </div>
  )
}

export default App
