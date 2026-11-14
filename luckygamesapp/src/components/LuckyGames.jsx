import React, { useState } from 'react';

function LuckyGames() {
  // Active game state ('draw', 'wheel', 'box')
  const [game, setGame] = useState('draw');

  // ==========================================
  // 🎟️ 1. LUCKY DRAW WINNER STATES
  // ==========================================
  const [namesInput, setNamesInput] = useState('Rahul, Priya, Meet, Sneha, Amit');
  const [winner, setWinner] = useState('');
  const [isPicking, setIsPicking] = useState(false);

  const pickLuckyWinner = () => {
    const namesList = namesInput.split(',').map((n) => n.trim()).filter((n) => n !== '');
    if (namesList.length < 2) {
      alert('Please enter at least 2 names separated by commas!');
      return;
    }

    setIsPicking(true);
    setWinner('');

    // Pick a random winner after 1.5 seconds
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * namesList.length);
      setWinner(namesList[randomIdx]);
      setIsPicking(false);
    }, 1500);
  };

  // ==========================================
  // 🎡 2. FORTUNE SPIN WHEEL STATES
  // ==========================================
  const prizes = ['🎁 iPhone 16', '💰 ₹500 Cash', '😅 Better Luck', '🎧 AirPods', '🎟️ Free Ticket', '🏆 Gold Coin'];
  const [rotation, setRotation] = useState(0);
  const [wheelPrize, setWheelPrize] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const spinFortuneWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWheelPrize('');

    // Rotate the wheel 4 to 6 full spins
    const extraSpin = Math.floor(Math.random() * 360) + 1440;
    setRotation(rotation + extraSpin);

    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setWheelPrize(randomPrize);
      setIsSpinning(false);
    }, 2000);
  };

  // ==========================================
  // 🎁 3. LUCKY MAGIC BOX STATES
  // ==========================================
  const boxRewards = ['💎 1000 Coins!', '💣 Empty Box!', '🎉 Mega Jackpot!', '🍫 Free Chocolate!', '😢 Try Again!'];
  const [openedBox, setOpenedBox] = useState(null);
  const [boxPrize, setBoxPrize] = useState('');

  const openMagicBox = (boxNumber) => {
    if (openedBox !== null) return; // Allow opening only one box per round
    const randomReward = boxRewards[Math.floor(Math.random() * boxRewards.length)];
    setOpenedBox(boxNumber);
    setBoxPrize(randomReward);
  };

  return (
    <div style={{ maxWidth: '460px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #eab308', color: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      <h2 style={{ color: '#facc15', margin: '0 0 15px 0' }}>Lucky Fun Games 🎰✨</h2>

      {/* 🧭 Simple Game Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button onClick={() => setGame('draw')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: game === 'draw' ? '#38bdf8' : '#1e293b', color: game === 'draw' ? '#000' : '#fff' }}>
          🎟️ Lucky Draw
        </button>
        <button onClick={() => setGame('wheel')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: game === 'wheel' ? '#22c55e' : '#1e293b', color: game === 'wheel' ? '#000' : '#fff' }}>
          🎡 Spin Wheel
        </button>
        <button onClick={() => setGame('box')} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: game === 'box' ? '#f472b6' : '#1e293b', color: game === 'box' ? '#000' : '#fff' }}>
          🎁 Magic Box
        </button>
      </div>

      {/* ==========================================
          GAME 1: LUCKY DRAW WINNER
         ========================================== */}
      {game === 'draw' && (
        <div style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 10px 0' }}>
            Enter participant names separated by commas (,):
          </p>
          <textarea
            rows="3"
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', fontSize: '14px', marginBottom: '15px', boxSizing: 'border-box' }}
          />
          <button onClick={pickLuckyWinner} disabled={isPicking} style={{ width: '100%', padding: '12px', backgroundColor: '#38bdf8', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            {isPicking ? '🎲 Picking Winner...' : '🏆 Pick Lucky Winner'}
          </button>

          {winner && (
            <div style={{ marginTop: '18px', padding: '15px', backgroundColor: '#064e3b', borderRadius: '12px', border: '2px solid #22c55e' }}>
              <span style={{ fontSize: '12px', color: '#a7f3d0' }}>🎉 CONGRATULATIONS WINNER 🎉</span>
              <h2 style={{ margin: '5px 0 0 0', color: '#4ade80' }}>{winner}</h2>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          GAME 2: FORTUNE SPIN WHEEL
         ========================================== */}
      {game === 'wheel' && (
        <div style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          {/* Spinning Wheel */}
          <div
            style={{
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              margin: '0 auto 20px auto',
              border: '8px solid #eab308',
              background: 'conic-gradient(#ef4444 0deg 60deg, #3b82f6 60deg 120deg, #22c55e 120deg 180deg, #a855f7 180deg 240deg, #f97316 240deg 300deg, #06b6d4 300deg 360deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 2s ease-out'
            }}
          >
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', lineHeight: '45px', fontSize: '12px' }}>
              SPIN
            </div>
          </div>

          <button onClick={spinFortuneWheel} disabled={isSpinning} style={{ width: '100%', padding: '12px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
            {isSpinning ? '🎡 Spinning Wheel...' : '🎯 Spin The Wheel'}
          </button>

          {wheelPrize && (
            <div style={{ marginTop: '18px', padding: '14px', backgroundColor: '#1e1b4b', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
              <span style={{ fontSize: '12px', color: '#c4b5fd' }}>You Won:</span>
              <h3 style={{ margin: '5px 0 0 0', color: '#facc15' }}>{wheelPrize}</h3>
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          GAME 3: LUCKY MAGIC BOX (3 Mystery Boxes)
         ========================================== */}
      {game === 'box' && (
        <div style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 18px 0' }}>
            Click on any 1 magic box to test your luck!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '18px' }}>
            {[1, 2, 3].map((boxNum) => (
              <div
                key={boxNum}
                onClick={() => openMagicBox(boxNum)}
                style={{
                  width: '95px',
                  height: '95px',
                  backgroundColor: openedBox === boxNum ? '#be185d' : '#1e293b',
                  border: openedBox === boxNum ? '3px solid #facc15' : '2px solid #334155',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '38px',
                  cursor: openedBox === null ? 'pointer' : 'default'
                }}
              >
                {openedBox === boxNum ? '🎊' : '🎁'}
                <span style={{ fontSize: '11px', marginTop: '4px', color: '#cbd5e1' }}>Box {boxNum}</span>
              </div>
            ))}
          </div>

          {boxPrize && (
            <div>
              <h3 style={{ color: '#4ade80', margin: '0 0 12px 0' }}>{boxPrize}</h3>
              <button
                onClick={() => {
                  setOpenedBox(null);
                  setBoxPrize('');
                }}
                style={{ padding: '10px 20px', backgroundColor: '#f472b6', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                🔄 Play Again (Reset Boxes)
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default LuckyGames;
