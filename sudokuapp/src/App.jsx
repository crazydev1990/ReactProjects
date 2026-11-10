import React, { useState } from 'react';
import Crossword from './components/Crossword';
import Sudoku from './components/Sudoku';
import TextEditor from './components/TextEditor'; // 📝 ફેરફાર ૧: નવું ટેક્સ્ટ એડિટર કમ્પોનન્ટ ઇમ્પોર્ટ કર્યું
import "./App.css";

function App() {
  // Navigation State Tab Selector Manager ("crossword", "sudoku", "editor")
  const [activeTab, setActiveTab] = useState("crossword");

  return (
    <div className="app-container" style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* 🧭 FLAT ARCADES SELECTION BUTTONS DECK MODULE (UPGRADED TO 3 TABS) */}
      <div className="app-tabs" style={{ display: 'flex', backgroundColor: '#0f172a', padding: '6px', borderRadius: '30px', border: '1px solid #1e293b', gap: '4px', marginBottom: '30px', maxWidth: '550px', width: '100%' }}>
        <button
          onClick={() => setActiveTab("crossword")}
          style={{ flex: 1, padding: '12px 6px', borderRadius: '25px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === "crossword" ? '#38bdf8' : 'transparent',
            color: activeTab === "crossword" ? '#020617' : '#94a3b8'
          }}
        >
          📝 Crossword Hub
        </button>

        <button
          onClick={() => setActiveTab("sudoku")}
          style={{ flex: 1, padding: '12px 6px', borderRadius: '25px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === "sudoku" ? '#10b981' : 'transparent',
            color: activeTab === "sudoku" ? '#020617' : '#94a3b8'
          }}
        >
          🎴 Sudoku Engine
        </button>

        {/* 📝 ફેરફાર ૨: નેવિગેશન ટૅબ્સ બારની અંદર ત્રીજું નવું ટેક્સ્ટ એડિટર બટન એડ કર્યું */}
        <button
          onClick={() => setActiveTab("editor")}
          style={{ flex: 1, padding: '12px 6px', borderRadius: '25px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
            backgroundColor: activeTab === "editor" ? '#a78bfa' : 'transparent',
            color: activeTab === "editor" ? '#020617' : '#94a3b8'
          }}
        >
          📝 Text Editor
        </button>
      </div>

      {/* 🕹️ ISOLATED COMPONENT HUD RENDER ROUTER LAYER */}
      <div className="app-content" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {activeTab === "crossword" && <Crossword />}
        {activeTab === "sudoku" && <Sudoku />}
        
        {/* 📝 ફેરફાર ૩: શરત મેચ થતાં કેસ ટ્રાન્સફોર્મર અને કસ્ટમ સ્ટાઇલ એડિટર વિજેટ લાઈવ લોડ થશે */}
        {activeTab === "editor" && <TextEditor />}
      </div>
      
    </div>
  );
}

export default App;
