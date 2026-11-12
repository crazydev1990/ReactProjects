import React, { useState } from 'react';
import TeamsMeeting from './components/TeamsMeeting';
import SlackSkypeChat from './components/SlackSkypeChat'; // 💬 ફેરફાર ૧: SlackSkypeChat ઇમ્પોર્ટ કર્યું
import './App.css';

function App() {
  // કઈ એપ ખુલ્લી રાખવી તે માટેનું સ્ટેટ ('teams' અથવા 'chat')
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🧭 ફેરફાર ૨: બંને એપ્સ બદલવા માટેના ટૅબ બટનો */}
      <div style={{ maxWidth: '420px', margin: '0 auto 25px auto', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveTab('teams')}
          style={{ flex: 1, padding: '12px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'teams' ? '#4f46e5' : '#1e293b', color: '#fff' }}
        >
          📹 Teams Meeting
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          style={{ flex: 1, padding: '12px', borderRadius: '25px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'chat' ? '#38bdf8' : '#1e293b', color: activeTab === 'chat' ? '#000' : '#fff' }}
        >
          💬 Slack / Skype Chat
        </button>
      </div>

      {/* 🕹️ ફેરફાર ૩: પસંદ કરેલું કમ્પોનન્ટ બતાવવાનો ભાગ */}
      <div>
        {activeTab === 'teams' && <TeamsMeeting />}
        {activeTab === 'chat' && <SlackSkypeChat />}
      </div>

    </div>
  );
}

export default App;
