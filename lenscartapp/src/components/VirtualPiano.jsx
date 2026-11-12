import React, { useState, useEffect } from 'react';

const VirtualPiano = () => {
  // Piano Keys Data (Notes, Frequencies in Hz, and Keyboard Shortcuts)
  const pianoKeys = [
    { note: 'C4 (Sa)', freq: 261.63, keyBind: 'A', type: 'white' },
    { note: 'C#4', freq: 277.18, keyBind: 'W', type: 'black' },
    { note: 'D4 (Re)', freq: 293.66, keyBind: 'S', type: 'white' },
    { note: 'D#4', freq: 311.13, keyBind: 'E', type: 'black' },
    { note: 'E4 (Ga)', freq: 329.63, keyBind: 'D', type: 'white' },
    { note: 'F4 (Ma)', freq: 349.23, keyBind: 'F', type: 'white' },
    { note: 'F#4', freq: 369.99, keyBind: 'T', type: 'black' },
    { note: 'G4 (Pa)', freq: 392.00, keyBind: 'G', type: 'white' },
    { note: 'G#4', freq: 415.30, keyBind: 'Y', type: 'black' },
    { note: 'A4 (Dha)', freq: 440.00, keyBind: 'H', type: 'white' },
    { note: 'A#4', freq: 466.16, keyBind: 'U', type: 'black' },
    { note: 'B4 (Ni)', freq: 493.88, keyBind: 'J', type: 'white' },
    { note: 'C5 (Sa)', freq: 523.25, keyBind: 'K', type: 'white' }
  ];

  const [activeNote, setActiveNote] = useState(null);
  const [waveType, setWaveType] = useState('sine'); // Sound tone style

  // 🎵 Browser Built-in Web Audio API Sound Generator (No MP3 needed)
  const playMusicalNote = (keyObj) => {
    setActiveNote(keyObj.note);

    // Create audio context
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();

    // Create oscillator (sound wave) and gain (volume)
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = waveType; // sine, triangle, square, sawtooth
    oscillator.frequency.setValueAtTime(keyObj.freq, audioCtx.currentTime);

    // Smooth fade out effect so sound feels natural
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);

    // Reset active visual highlight after 200ms
    setTimeout(() => {
      setActiveNote(null);
    }, 200);
  };

  // ⌨️ Keyboard Press Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toUpperCase();
      const matchedNote = pianoKeys.find((k) => k.keyBind === pressedKey);
      if (matchedNote) {
        playMusicalNote(matchedNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [waveType]);

  return (
    <div style={{ maxWidth: '620px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #38bdf8', padding: '25px', borderRadius: '24px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Virtual Piano Studio 🎹</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Pure Web Audio API • Click Keys or Use Keyboard (A to K)
      </p>

      {/* Sound Tone Selector */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>INSTRUMENT TONE:</label>
        <select
          value={waveType}
          onChange={(e) => setWaveType(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '13px', cursor: 'pointer', outline: 'none' }}
        >
          <option value="sine">🎹 Soft Piano (Sine)</option>
          <option value="triangle">🎸 Flute / Bell (Triangle)</option>
          <option value="square">🕹️ Retro 8-Bit Synth (Square)</option>
          <option value="sawtooth">🎻 Violin / Brass (Sawtooth)</option>
        </select>
      </div>

      {/* Now Playing Display */}
      <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '20px', fontSize: '14px', color: '#4ade80', fontWeight: 'bold' }}>
        {activeNote ? `🎵 Playing Note: ${activeNote}` : '🎶 Ready to play...'}
      </div>

      {/* 🎹 PIANO KEYBOARD LAYOUT */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', backgroundColor: '#020617', padding: '15px', borderRadius: '16px', border: '1px solid #1e293b', overflowX: 'auto' }}>
        {pianoKeys.map((item, idx) => {
          const isBlack = item.type === 'black';
          const isPlaying = activeNote === item.note;

          return (
            <button
              key={idx}
              onClick={() => playMusicalNote(item)}
              style={{
                width: isBlack ? '34px' : '48px',
                height: isBlack ? '110px' : '170px',
                backgroundColor: isPlaying ? '#38bdf8' : isBlack ? '#1e293b' : '#ffffff',
                color: isPlaying ? '#020617' : isBlack ? '#94a3b8' : '#0f172a',
                border: isBlack ? '2px solid #020617' : '1px solid #cbd5e1',
                borderRadius: '0 0 8px 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: '10px',
                fontWeight: 'bold',
                fontSize: '10px',
                transition: 'all 0.08s ease',
                transform: isPlaying ? 'translateY(4px)' : 'none',
                boxShadow: isPlaying ? '0 0 15px #38bdf8' : '0 4px 6px rgba(0,0,0,0.3)'
              }}
            >
              <span style={{ marginBottom: '4px' }}>{item.note.split(' ')}</span>
              <span style={{ backgroundColor: isBlack ? '#0f172a' : '#e2e8f0', padding: '2px 5px', borderRadius: '4px', fontSize: '9px' }}>
                {item.keyBind}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default VirtualPiano;
