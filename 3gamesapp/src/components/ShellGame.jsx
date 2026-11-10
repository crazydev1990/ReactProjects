import React, { useState } from 'react';

const ShellGame = () => {
  // Game state trackers
  const [coinPosition, setCoinPosition] = useState(null); // Real hidden target index (0, 1, or 2)
  const [shuffling, setShuffling] = useState(false);
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [logMessage, setLogMessage] = useState('Click "Shuffle Glasses" to hide the golden coin!');
  const [score, setScore] = useState(0);

  // 🎲 Shuffling simulator sequence trigger
  const startShufflingCycle = () => {
    setShuffling(true);
    setSelectedGlass(null);
    setCoinPosition(null);
    setLogMessage('Shuffling matrix containers... Keep your eyes sharp! 👀');

    // Simulate physical cup swaps duration via async intervals timeout 
    setTimeout(() => {
      const randomizedTarget = Math.floor(Math.random() * 3); // 0, 1, or 2
      setCoinPosition(randomizedTarget);
      setShuffling(false);
      setLogMessage('Shuffling completed! Click on the glass you think hides the coin. 🪙');
    }, 1500);
  };

  // Glass selection guess validator
  const guessGlassSelection = (chosenIdx) => {
    if (shuffling || coinPosition === null || selectedGlass !== null) return;

    setSelectedGlass(chosenIdx);

    if (chosenIdx === coinPosition) {
      setScore(prev => prev + 50);
      setLogMessage('🎉 PERFECT GUESS! You found the hidden golden coin! +50 Points.');
    } else {
      setLogMessage(`❌ WRONG CUP! The coin was hidden under Glass #${coinPosition + 1}. Try again!`);
    }
  };

  return (
    <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#0f172a', border: '3px solid #eab308', padding: '20px', borderRadius: '24px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box' }}>
      <h3 style={{ color: '#eab308', margin: '0 0 5px 0' }}>Shell Coin Guesser 🪙🏺</h3>
      <p style={{ margin: '0 0 15px 0', fontSize: '11px', color: '#64748b' }}>Guess which glass conceals the high-value coin</p>

      {/* Score Tracker Display */}
      <div style={{ backgroundColor: '#020617', padding: '6px 20px', borderRadius: '8px', display: 'inline-block', color: '#eab308', fontWeight: 'bold', fontSize: '18px', marginBottom: '20px', border: '1px solid #1e293b' }}>
        GUESS SCORE: {score}
      </div>

      {/* 🏺 3 GLASSES GRID DISPLAY SCREEN */}
      <div style={{ display: 'flex', justifyContext: 'center', gap: '20px', margin: '20px 0', backgroundColor: '#020617', padding: '30px 10px', borderRadius: '16px', border: '1px solid #1e293b' }}>
        {[0, 1, 2].map((idx) => {
          const isSelected = selectedGlass === idx;
          const containsCoin = coinPosition === idx;
          
          return (
            <div 
              key={idx}
              onClick={() => guessGlassSelection(idx)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: (shuffling || coinPosition === null || selectedGlass !== null) ? 'not-allowed' : 'pointer',
                opacity: shuffling ? 0.4 : 1,
                transform: shuffling ? `translateY(${idx % 2 === 0 ? '-10px' : '10px'})` : 'translateY(0)',
                transition: 'transform 0.15s ease-in-out, opacity 0.2s'
              }}
            >
              {/* The Interactive Cup Object Visual wrapper */}
              <div style={{
                fontSize: '48px',
                // Lift cup revealing target outcome if selection has executed successfully
                transform: selectedGlass !== null ? 'translateY(-20px)' : 'translateY(0)',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}>
                🥛
              </div>

              {/* Revealed Asset Tokens Overlay (Displays Coin or cross) */}
              {selectedGlass !== null && (
                <div style={{ fontSize: '24px', marginTop: '-15px', minHeight: '30px' }}>
                  {containsCoin ? '🪙' : '❌'}
                </div>
              )}
              
              <small style={{ color: isSelected ? '#eab308' : '#475569', fontWeight: 'bold', fontSize: '11px', marginTop: '5px' }}>
                Glass {idx + 1}
              </small>
            </div>
          );
        })}
      </div>

      {/* Dynamic Messaging Commentary Bar */}
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', minHeight: '38px', display: 'flex', alignItems: 'center', justifyContext: 'center', lineHeight: '1.4' }}>
        {logMessage}
      </p>

      {/* Action Controller launcher trigger */}
      <button 
        onClick={startShufflingCycle}
        disabled={shuffling}
        style={{ width: '100%', padding: '12px', backgroundColor: shuffling ? '#334155' : '#eab308', color: '#020617', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: shuffling ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(234,179,8,0.25)' }}
      >
        {shuffling ? '🔄 Shuffling Matrix...' : '🎲 Shuffle Glasses'}
      </button>
    </div>
  );
};

export default ShellGame;
