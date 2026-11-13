import React, { useState } from 'react';

import GoogleReviewRating from './components/GoogleReviewRating';
import ImageEditor from './components/ImageEditor';
import ExpenseTracker from './components/ExpenseTracker';
import MultiplicationTable from './components/MultiplicationTable';
import Tally from './components/Tally';
import './App.css';
import MultiStepSurveyForm from './components/MultiStepSurveyForm';

function App() {
  const [activeTab, setActiveTab] = useState('survey');

  const tabs = [
    { id: 'editor', label: '🎨 Image Editor', color: '#38bdf8' },
    { id: 'review', label: '⭐ Reviews', color: '#eab308' },
    { id: 'expense', label: '💰 Expense Tracker', color: '#22c55e' },
    { id: 'table', label: '✖️ Table', color: '#a78bfa' },
    { id: 'tally', label: '📊 Tally Software', color: '#f97316' },
    { id: 'survey', label: '📋 Survey Form', color: '#ec4899' } // 📋 ફેરફાર ૨: નવી Survey ટૅબ ઉમેરી
  ];

  return (
    <div style={{
      backgroundColor: '#020617',
      minHeight: '100vh',
      color: '#fff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 25px',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#0f172a',
        padding: '6px',
        borderRadius: '20px',
        border: '1px solid #1e293b',
        gap: '6px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: '1 1 140px',
              padding: '12px 8px',
              borderRadius: '15px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.id ? tab.color : 'transparent',
              color: activeTab === tab.id ? '#000' : '#94a3b8'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'editor' && <ImageEditor />}
      {activeTab === 'review' && <GoogleReviewRating />}
      {activeTab === 'expense' && <ExpenseTracker />}
      {activeTab === 'table' && <MultiplicationTable />}
      {activeTab === 'tally' && <Tally />}
      
      {/* 📋 ફેરફાર ૩: Survey ટૅબ પર ક્લિક થતા SimpleSurvey ખુલશે */}
      {activeTab === 'survey' && <MultiStepSurveyForm />}
    </div>
  );
}

export default App;
