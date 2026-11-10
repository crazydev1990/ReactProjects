import React, { useState } from 'react';
import Custom from '../src/components/Custom'; // તમારો મારિયો ગેમ વાળો કમ્પોનન્ટ
import Gmail from '../src/components/Gmail'; // તમારો જીમેલ કલોન વાળો કમ્પોનન્ટ
import GitHub from '../src/components/Github'; // તમારો ગિટહબ સર્ચ કમ્પોનન્ટ
import Movies from './components/Movies'; // તમારો નવો મુવી પ્રોફાઇલ કમ્પોનન્ટ

const App = () => {
  // શરૂઆતમાં કયો પ્રોજેક્ટ બતાવવો તે નક્કી કરતી સ્ટેટ ('gmail', 'mario', 'github' અથવા 'movie')
  const [activeProject, setActiveProject] = useState('gmail');

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: 'sans-serif' }}>
      
      {/* 🚀 ટોપ નેવિગેશન બાર - ચારેય પ્રોજેક્ટ્સ સ્વિચ કરવા માટે */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '12px', backgroundColor: '#202124', color: 'white', position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10000, boxSizing: 'border-box', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveProject('gmail')} 
          style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '20px', backgroundColor: activeProject === 'gmail' ? '#c71610' : '#5f6368', color: 'white' }}
        >
          📬 Gmail Inbox Clone
        </button>

        <button 
          onClick={() => setActiveProject('mario')} 
          style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '20px', backgroundColor: activeProject === 'mario' ? '#4285F4' : '#5f6368', color: 'white' }}
        >
          🕹️ Super Mario Game
        </button>

        <button 
          onClick={() => setActiveProject('github')} 
          style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '20px', backgroundColor: activeProject === 'github' ? '#238636' : '#5f6368', color: 'white' }}
        >
          🐙 GitHub Finder
        </button>

        {/* ⚠️ નવું મુવી પ્રોફાઇલ બટન ઉમેર્યું */}
        <button 
          onClick={() => setActiveProject('movie')} 
          style={{ padding: '8px 20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '20px', backgroundColor: activeProject === 'movie' ? '#e50914' : '#5f6368', color: 'white' }}
        >
          🎬 Movie Profile
        </button>
      </div>

      {/* 🔄 કન્ડીશનલ રેન્ડરિંગ - જે બટન એક્ટિવ હશે તે પ્રોજેક્ટ નીચે લોડ થશે */}
      <div style={{ width: '100vw', height: '100vh', paddingTop: '60px', boxSizing: 'border-box' }}>
        {activeProject === 'gmail' && <Gmail />}
        {activeProject === 'mario' && <Custom />}
        {activeProject === 'github' && <GitHub />}
        {activeProject === 'movie' && <Movies />}
      </div>

    </div>
  );
};

export default App;
