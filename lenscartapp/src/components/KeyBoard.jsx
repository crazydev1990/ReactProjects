import React, { useState } from 'react';

function KeyBoard() {
  // ૧. બે સાદા સ્ટેટ: એક લખાણ માટે અને બીજું કીબોર્ડ બતાવવા/છુપાવવા માટે
  const [text, setText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(true);

  // ૨. A થી Z અક્ષરોનું સાદું લિસ્ટ
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // ૩. બટન દબાવતા લખાણ ઉમેરવાનું ફંક્શન
  const handleKeyClick = (char) => {
    setText(text + char);
  };

  // ૪. છેલ્લો અક્ષર ભૂંસવાનું ફંક્શન (Backspace)
  const handleBackspace = () => {
    setText(text.slice(0, -1));
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Basic Virtual Keyboard ⌨️</h3>

      {/* લખાણ દેખાડવાનું ટેક્સ્ટ બોક્સ */}
      <textarea
        value={text}
        readOnly
        rows="3"
        placeholder="Type using buttons below..."
        style={{ width: '100%', padding: '10px', fontSize: '18px', borderRadius: '8px', border: '1px solid #94a3b8', marginBottom: '15px', boxSizing: 'border-box' }}
      />

      {/* Hide / Show Toggle બટન */}
      <button
        onClick={() => setShowKeyboard(!showKeyboard)}
        style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
      >
        {showKeyboard ? 'Hide Keyboard 🔽' : 'Show Keyboard 🔼'}
      </button>

      {/* કીબોર્ડ બોક્સ (જ્યારે showKeyboard true હોય ત્યારે જ દેખાશે) */}
      {showKeyboard && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', padding: '15px', backgroundColor: '#e2e8f0', borderRadius: '10px' }}>
          
          {/* A થી Z બટનો */}
          {letters.map((char) => (
            <button
              key={char}
              onClick={() => handleKeyClick(char)}
              style={{ width: '38px', height: '38px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', border: '1px solid #94a3b8', backgroundColor: '#020617',color: '#fff'}}
            >
              {char}
            </button>
          ))}

          {/* સ્પેશિયલ બટનો (Space, Backspace, Clear) */}
          <div style={{ width: '100%', display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button onClick={() => handleKeyClick(' ')} style={{ flex: 2, padding: '10px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', border: '1px solid #94a3b8', backgroundColor: '#020617',color: '#fff' }}>
              SPACE
            </button>
            <button onClick={handleBackspace} style={{ flex: 1, padding: '10px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', border: 'none', backgroundColor: '#f59e0b', color: '#fff' }}>
              ⌫ Back
            </button>
            <button onClick={() => setText('')} style={{ flex: 1, padding: '10px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px', border: 'none', backgroundColor: '#ef4444', color: '#fff' }}>
              Clear
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default KeyBoard;
