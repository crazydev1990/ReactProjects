import React, { useState, useEffect, useRef } from 'react';

const Lenscart = () => {
  // ૧. અલગ-અલગ ચશ્માની ફ્રેમ્સનો ડેટાબેઝ (SVG Shapes + Colors)
  const eyewearCatalog = [
    { id: 'wayfarer', name: '🕶️ Classic Black Wayfarer', color: '#0f172a', lens: 'rgba(15, 23, 42, 0.75)', shape: 'rect' },
    { id: 'aviator', name: 'pilot Gold Aviator', color: '#eab308', lens: 'rgba(234, 179, 8, 0.25)', shape: 'aviator' },
    { id: 'round', name: '🤓 Retro Harry Round', color: '#78350f', lens: 'rgba(255, 255, 255, 0.15)', shape: 'circle' },
    { id: 'bluecut', name: '💻 Blue-Cut Computer Glass', color: '#38bdf8', lens: 'rgba(56, 189, 248, 0.2)', shape: 'rect' },
    { id: 'redsport', name: '🔥 Red Racing Sport', color: '#ef4444', lens: 'rgba(239, 68, 68, 0.4)', shape: 'rect' }
  ];

  // ૨. સ્ટેટ મેનેજર્સ (0-Level Controls)
  const [selectedGlassIdx, setSelectedGlassIdx] = useState(0);
  const [glassSize, setGlassSize] = useState(180);      // ચશ્માની પહોળાઈ (Width)
  const [verticalPos, setVerticalPos] = useState(110);  // ચહેરા પર ઉપર-નીચે સેટ કરવા માટે (Top position)
  const [cameraActive, setCameraActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Starting live webcam mirror stream...');

  const videoRef = useRef(null);

  // 🚀 ૩. લાઈવ વેબકેમ ચાલુ કરવાનું ફંક્શન
  useEffect(() => {
    let streamTrack = null;

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 380, height: 280 }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamTrack = stream;
          setCameraActive(true);
          setStatusMessage('👓 Align your eyes with the glasses using the sliders below!');
        }
      } catch (err) {
        console.error("Camera Error:", err);
        setStatusMessage('❌ Camera blocked. Please allow camera access in browser settings.');
      }
    };

    startWebcam();

    return () => {
      if (streamTrack) {
        streamTrack.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const currentGlass = eyewearCatalog[selectedGlassIdx];

  return (
    <div style={{ maxWidth: '450px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #38bdf8', padding: '25px', borderRadius: '24px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Virtual Eyewear Try-On 👓</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Live Face Overlay Studio • Lenskart Style</p>

      {/* 🔍 ચશ્માની ફ્રેમ પસંદ કરવાનું ડ્રોપડાઉન મેનૂ */}
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>SELECT EYEWEAR FRAME:</label>
        <select
          value={selectedGlassIdx}
          onChange={(e) => setSelectedGlassIdx(parseInt(e.target.value, 10))}
          style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '14px', cursor: 'pointer', outline: 'none' }}
        >
          {eyewearCatalog.map((item, idx) => (
            <option key={item.id} value={idx}>{item.name}</option>
          ))}
        </select>
      </div>

      {/* 🏟️ LIVE CAMERA + VIRTUAL GLASSES OVERLAY STAGE */}
      <div style={{ width: '360px', height: '270px', margin: '0 auto 20px auto', borderRadius: '16px', overflow: 'hidden', position: 'relative', backgroundColor: '#020617', border: '3px solid #1e293b', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>
        
        {/* લાઈવ કેમેરા વિડીયો */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
        />

        {/* 👓 કેમેરાની ઉપર તરતા SVG ચશ્મા (Virtual Glasses Overlay) */}
        {cameraActive && (
          <div style={{
            position: 'absolute',
            top: `${verticalPos}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${glassSize}px`,
            pointerEvents: 'none',
            transition: 'all 0.1s ease-out'
          }}>
            <svg viewBox="0 0 220 70" width="100%" height="100%">
              {/* ડાબો કાચ (Left Lens) */}
              {currentGlass.shape === 'circle' ? (
                <circle cx="55" cy="35" r="30" fill={currentGlass.lens} stroke={currentGlass.color} strokeWidth="6" />
              ) : (
                <rect x="15" y="10" width="75" height="50" rx={currentGlass.shape === 'aviator' ? '22' : '8'} fill={currentGlass.lens} stroke={currentGlass.color} strokeWidth="6" />
              )}

              {/* વચ્ચેનો નાકનો ભાગ (Nose Bridge) */}
              <path d="M 90 25 Q 110 15 130 25" fill="none" stroke={currentGlass.color} strokeWidth="6" strokeLinecap="round" />

              {/* જમણો કાચ (Right Lens) */}
              {currentGlass.shape === 'circle' ? (
                <circle cx="165" cy="35" r="30" fill={currentGlass.lens} stroke={currentGlass.color} strokeWidth="6" />
              ) : (
                <rect x="130" y="10" width="75" height="50" rx={currentGlass.shape === 'aviator' ? '22' : '8'} fill={currentGlass.lens} stroke={currentGlass.color} strokeWidth="6" />
              )}
            </svg>
          </div>
        )}
      </div>

      {/* 🎛️ ચહેરા પર ચશ્મા ફિટ કરવાના સ્લાઇડર કંટ્રોલ્સ */}
      <div style={{ backgroundColor: '#020617', padding: '14px', borderRadius: '14px', border: '1px solid #1e293b', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#94a3b8' }}>
          <span style={{ fontWeight: 'bold', width: '90px', textAlign: 'left' }}>GLASS SIZE:</span>
          <input type="range" min="120" max="260" value={glassSize} onChange={(e) => setGlassSize(e.target.value)} style={{ flexGrow: 1, accentColor: '#38bdf8', cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#94a3b8' }}>
          <span style={{ fontWeight: 'bold', width: '90px', textAlign: 'left' }}>UP / DOWN:</span>
          <input type="range" min="40" max="190" value={verticalPos} onChange={(e) => setVerticalPos(e.target.value)} style={{ flexGrow: 1, accentColor: '#38bdf8', cursor: 'pointer' }} />
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '12.5px', color: '#cbd5e1', fontStyle: 'italic' }}>
        {statusMessage}
      </p>

    </div>
  );
};

export default Lenscart;
