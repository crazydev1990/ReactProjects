import React, { useState } from 'react';

const TextEditor = () => {
  // Dummy Lorem Ipsum paragraph string consisting of exactly 50 words baseline
  const dummyLoremParagraph = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  // Core Style and Text Transformation State Managers
  const [editorText, setEditorText] = useState(dummyLoremParagraph);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [statusMessage, setStatusMessage] = useState('Text canvas synchronized. Ready for formatting inputs.');

  // 🧠 0-LEVEL CASE CONVERSION LOGIC MATRICES (કેસ ચેન્જર એન્જિન)
  const transformTextCase = (targetCase) => {
    if (!editorText.trim()) return;

    let updatedText = editorText;

    // Split text into arrays of words to execute precise casing structural loops cleanly
    const wordsArray = editorText.toLowerCase().split(/\s+/).filter(w => w.length > 0);

    switch (targetCase) {
      case 'uppercase':
        updatedText = editorText.toUpperCase();
        setStatusMessage('🔄 Swapped text casing layout cleanly to UPPERCASE.');
        break;
        
      case 'lowercase':
        updatedText = editorText.toLowerCase();
        setStatusMessage('🔄 Swapped text casing layout cleanly to lowercase.');
        break;

      case 'camelcase':
        // camelCase: first word lowercase, rest capitalized, no spaces
        updatedText = wordsArray.map((word, idx) => {
          if (idx === 0) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
        setStatusMessage('🔄 Swapped text casing layout cleanly to camelCase.');
        break;

      case 'snakecase':
        // snake_case: words separated by underscores
        updatedText = wordsArray.join('_');
        setStatusMessage('🔄 Swapped text casing layout cleanly to snake_case.');
        break;

      case 'kebabcase':
        // kebab-case: words separated by hyphens
        updatedText = wordsArray.join('-');
        setStatusMessage('🔄 Swapped text casing layout cleanly to kebab-case.');
        break;

      default:
        break;
    }

    setEditorText(updatedText);
  };

  // Reset function to reboot text view frame back to baseline 50-word dummy string
  const resetEditorTextCanvas = () => {
    setEditorText(dummyLoremParagraph);
    setFontFamily('Arial');
    setFontColor('#ffffff');
    setStatusMessage('Text canvas parameters reset successfully back to dummy blueprint nodes.');
  };

  return (
    <div style={{ maxWidth: '600px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #38bdf8', padding: '25px', borderRadius: '24px', boxSizing: 'border-box', textAlign: 'center', margin: '0 auto', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Ribbon Branding */}
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Advanced Text Matrix Editor 📝</h3>
      <p style={{ margin: '0 0 25px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Live Multi-Style Text Transformer Console</p>

      {/* 🎛️ TOOLBAR DASHBOARD: DROPDOWN SELECTION DESK CONTROLLERS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px solid #1e293b', marginBottom: '20px' }}>
        
        {/* Dropdown 1: Case Modification Catcher */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>CONVERT CASE:</label>
          <select
            defaultValue=""
            onChange={(e) => { if(e.target.value) transformTextCase(e.target.value); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
          >
            <option value="" disabled>Select Case...</option>
            <option value="uppercase">ABC UPPERCASE</option>
            <option value="lowercase">abc lowercase</option>
            <option value="camelcase">cC camelCase</option>
            <option value="snakecase">s_c snake_case</option>
            <option value="kebabcase">k-c kebab-case</option>
          </select>
        </div>

        {/* Dropdown 2: Font Family Catcher */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>FONT FAMILY:</label>
          <select
            value={fontFamily}
            onChange={(e) => { setFontFamily(e.target.value); setStatusMessage(`Changed active typography layout to [${e.target.value}].`); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
          >
            <option value="Arial">Arial (Clean Modern)</option>
            <option value="Georgia">Georgia (Elegant Serif)</option>
            <option value="Courier New">Courier New (Retro Code)</option>
            <option value="'Times New Roman'">Times New Roman</option>
            <option value="Impact">Impact (Heavy Bold)</option>
          </select>
        </div>

        {/* Dropdown 3: Font Color Hex Code Palette Selector */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>TEXT COLOR:</label>
          <select
            value={fontColor}
            onChange={(e) => { setFontColor(e.target.value); setStatusMessage(`Modified color channel signature hex to [${e.target.value.toUpperCase()}].`); }}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '12px', cursor: 'pointer', outline: 'none' }}
          >
            <option value="#ffffff">⚪ White Light</option>
            <option value="#38bdf8">🔵 Sky Blue</option>
            <option value="#4ade80">🟢 Neon Green</option>
            <option value="#eab308">🟡 Solar Yellow</option>
            <option value="#f43f5e">🔴 Crimson Red</option>
            <option value="#a78bfa">🟣 Magic Purple</option>
          </select>
        </div>

      </div>

      {/* 📺 CENTRAL TEXT SCREEN: ACTIVE INTERACTIVE LIVE TEXT AREA */}
      <div style={{ marginBottom: '15px' }}>
        <textarea
          value={editorText}
          onChange={(e) => setEditorText(e.target.value)}
          rows="8"
          placeholder="Type or modify your text paragraphs context metrics here..."
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#020617',
            border: '2px solid #1e293b',
            borderRadius: '12px',
            boxSizing: 'border-box',
            fontSize: '16px',
            lineHeight: '1.5',
            outline: 'none',
            transition: 'all 0.1s ease',
            // 💡 DYNAMIC DESIGN MATRIX STYLE CODES BINDING FROM STATES ABOVE
            fontFamily: fontFamily,
            color: fontColor
          }}
        />
      </div>

      {/* Live system logging commentary trace channel bar */}
      <p style={{ margin: '0 0 15px 0', fontSize: '12.5px', color: '#94a3b8', fontStyle: 'italic', minHeight: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.4' }}>
        {statusMessage}
      </p>

      {/* 🎮 REBOOT DISK LAYOUT CONTROLLER BUTTON */}
      <button
        onClick={resetEditorTextCanvas}
        style={{ width: '100%', padding: '12px', backgroundColor: '#334155', color: '#fff', border: '1px solid #475569', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.1s' }}
      >
        🧹 Reset Canvas & Load Default 50 Words Paragraph
      </button>

    </div>
  );
};

export default TextEditor;
