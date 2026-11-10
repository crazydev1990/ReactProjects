import React, { useState, useEffect, useRef } from 'react';

const Custom = () => {
  const width = window.innerWidth, height = window.innerHeight;

  // Mario States
  const [marioX, setMarioX] = useState(150);
  const [marioY, setMarioY] = useState(0);
  const [dir, setDir] = useState('right');
  const [score, setScore] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [powerTime, setPowerTime] = useState(0); 

  // Environment & Enemies States
  const [owlX, setOwlX] = useState(width - 200);
  const [batX, setBatX] = useState(width + 200);
  const [wave, setWave] = useState(0); 
  const [pillarX, setPillarX] = useState(800);
  const [lotusY, setLotusY] = useState(60);
  const [fireballs, setFireballs] = useState([]);

  // Wildman Bosses States
  const [w1X, setW1X] = useState(width);
  const [w1HP, setW1HP] = useState(5);
  const [w2X, setW2X] = useState(width + 500);
  const [w2HP, setW2HP] = useState(5);

  const marioYRef = useRef(0);
  const isJumpingRef = useRef(false);

  // 1. Power Timer Decay System
  useEffect(() => {
    if (powerTime <= 0) return;
    const t = setInterval(() => setPowerTime((p) => Math.max(0, p - 1000)), 1000);
    return () => clearInterval(t);
  }, [powerTime]);

  // 2. Global Keyboard Controls Mapping
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowRight') { setMarioX((p) => Math.min(width - 60, p + 25)); setDir('right'); }
      if (e.key === 'ArrowLeft') { setMarioX((p) => Math.max(0, p - 25)); setDir('left'); }
      if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumpingRef.current) {
        isJumpingRef.current = true; setMarioY(180); marioYRef.current = 180;
        setTimeout(() => { setMarioY(0); marioYRef.current = 0; isJumpingRef.current = false; }, 300);
      }
      if ((e.key === 'f' || e.key === 'F') && powerTime > 0) {
        setFireballs((p) => [...p, { x: marioX + (dir === 'right' ? 60 : -30), y: marioYRef.current + 75, d: dir === 'right' ? 1 : -1 }]);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver, marioX, dir, powerTime, width]);

  // 3. Engine Core Loop Management
  useEffect(() => {
    if (gameOver) return;
    const loop = setInterval(() => {
      setWave((w) => {
        const nextWave = w + 0.08;
        const bY = (height / 3) + Math.sin(nextWave * 2) * 120;

        setOwlX((p) => (p < -60 ? width + 150 : p - 6));
        setBatX((p) => (p < -60 ? width + 350 : p - 7));
        setW1X((p) => (p < -60 || w1HP <= 0) ? (setW1HP(5), width + 100) : p - 4);
        setW2X((p) => (p < -60 || w2HP <= 0) ? (setW2HP(5), width + 500) : p - 4);
        setPillarX((p) => p < -60 ? (setLotusY(60), width + 400) : p - 4);

        if (Math.abs(pillarX - marioX) < 150 && lotusY < 140) setLotusY((y) => y + 4);
        if (Math.abs(pillarX - marioX) < 50 && marioYRef.current > 60 && lotusY >= 140) { setPowerTime((t) => t + 30 * 60 * 1000); setLotusY(-500); }

        setFireballs((prev) => {
          let fbs = [];
          prev.forEach((fb) => {
            let nX = fb.x + 14 * fb.d, hit = false;
            if (Math.abs(owlX - nX) < 40) { setScore((s) => s + 20); setOwlX(width + 150); hit = true; }
            else if (Math.abs(batX - nX) < 40 && Math.abs(bY - fb.y) < 50) { setScore((s) => s + 20); setBatX(width + 350); hit = true; }
            else if (w1HP > 0 && Math.abs(w1X - nX) < 40) { setW1HP((h) => Math.max(0, h - 1)); hit = true; }
            else if (w2HP > 0 && Math.abs(w2X - nX) < 40) { setW2HP((h) => Math.max(0, h - 1)); hit = true; }
            if (!hit && nX > 0 && nX < width) fbs.push({ ...fb, x: nX });
          });
          return fbs;
        });

        const checkHit = (wx, hp, setX) => {
          if (hp > 0 && Math.abs(wx - marioX) < 50 && marioYRef.current < 60) {
            setX(width + 300);
            setScore((s) => { const n = s - 150; if (n <= 0) setGameOver(true); return Math.max(0, n); });
          }
        };
        checkHit(w1X, w1HP, setW1X); checkHit(w2X, w2HP, setW2X);

        if (Math.abs(owlX - marioX) < 50 && marioYRef.current < 50) {
          setOwlX(width + 150);
          setScore((s) => { const n = s - 50; if (n <= 0) setGameOver(true); return Math.max(0, n); });
        }
        if (Math.abs(batX - marioX) < 50 && (marioYRef.current + 60) > bY && marioYRef.current < bY + 50) {
          setBatX(width + 350);
          setScore((s) => { const n = s - 50; if (n <= 0) setGameOver(true); return Math.max(0, n); });
        }
        return nextWave;
      });
    }, 30);
    return () => clearInterval(loop);
  }, [marioX, owlX, batX, pillarX, lotusY, w1X, w1HP, w2X, w2HP, gameOver, width, height]);

  const restart = () => {
    marioYRef.current = 0; isJumpingRef.current = false;
    setMarioX(150); setMarioY(0); setDir('right'); setScore(200); setGameOver(false); setPowerTime(0);
    setOwlX(width - 200); setBatX(width + 200); setPillarX(800); setLotusY(60);
    setW1X(width); setW1HP(5); setW2X(width + 500); setW2HP(5); setWave(0); setFireballs([]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#5c94fc', position: 'fixed', top: 0, left: 0, overflow: 'hidden', textAlign: 'left' }}>
      <div style={{ color: 'white', textAlign: 'center', paddingTop: '20px', width: '100%', position: 'absolute', zIndex: 20, fontFamily: 'sans-serif', pointerEvents: 'none', userSelect: 'none' }}>
        <h1 style={{ margin: '0 0 5px 0', fontSize: '42px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          SCORE: {score} 
        </h1>
        {gameOver && (
          <div style={{ backgroundColor: 'rgba(0,0,0,0.75)', padding: '30px', borderRadius: '16px', display: 'inline-block', marginTop: '40px', pointerEvents: 'auto' }}>
            <h2 style={{ color: 'red', margin: '0 0 20px 0', fontSize: '48px', fontWeight: 'bold' }}>GAME OVER 💥</h2>
            <button onClick={restart} style={{ padding: '12px 35px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: 'none' }}>Play Again</button>
          </div>
        )}
      </div>

      {lotusY > 0 && <div style={{ position: 'absolute', left: `${pillarX}px`, bottom: `${lotusY}px`, fontSize: '55px' }}>🪷</div>}
      <div style={{ position: 'absolute', left: `${pillarX}px`, bottom: '60px', fontSize: '60px', zIndex: 5 }}>🧱</div>
      {fireballs.map((fb, i) => <div key={i} style={{ position: 'absolute', left: `${fb.x}px`, bottom: `${fb.y}px`, fontSize: '40px', zIndex: 10 }}>🔥</div>)}
      <div style={{ position: 'absolute', left: `${owlX}px`, bottom: '60px', fontSize: '55px' }}>🦉</div>
      <div style={{ position: 'absolute', left: `${batX}px`, bottom: `${(height / 3) + Math.sin(wave * 2) * 120}px`, fontSize: '55px' }}>🦇</div>
      
      {w1HP > 0 && (
        <div style={{ position: 'absolute', left: `${w1X}px`, bottom: '60px', fontSize: '60px', zIndex: 5 }}>
          <span style={{ position: 'absolute', top: '-35px', color: 'red', fontSize: '18px', fontWeight: 'bold', backgroundColor: 'black', padding: '2px 8px', borderRadius: '4px' }}>HP:{w1HP}</span>🪓👹
        </div>
      )}
      {w2HP > 0 && (
        <div style={{ position: 'absolute', left: `${w2X}px`, bottom: '60px', fontSize: '60px', zIndex: 5 }}>
          <span style={{ position: 'absolute', top: '-35px', color: 'red', fontSize: '18px', fontWeight: 'bold', backgroundColor: 'black', padding: '2px 8px', borderRadius: '4px' }}>HP:{w2HP}</span>🪓👹
        </div>
      )}

      <img src={'../mario.png'} alt="Mario" style={{ width: '60px', height: '60px', position: 'absolute', left: `${marioX}px`, bottom: `${marioY + 60}px`, zIndex: 6, transform: dir === 'right' ? 'scaleX(1)' : 'scaleX(-1)', transition: 'bottom 0.1s ease-out' }} />
      <div style={{ width: '100vw', height: '60px', backgroundColor: '#fcb47c', position: 'absolute', bottom: 0, zIndex: 15 }} />
    </div>
  );
};

export default Custom;
