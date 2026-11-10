import React, { useState, useEffect, useRef } from 'react';

const SelfieApp = () => {
  // 1. Array of 15 Unique Premium Photo Frame CSS Designs
  const frameDesigns = [
    { id: 'f1', label: '🪵 Mahogany Wood', border: '16px solid #5c3a21', shadow: 'inset 0 0 15px #000, 0 8px 16px rgba(0,0,0,0.5)' },
    { id: 'f2', label: '👑 Antique Gold', border: '14px double #d4af37', shadow: 'inset 0 0 12px #8b7500, 0 10px 20px rgba(212,175,55,0.25)' },
    { id: 'f3', label: '⚡ Cyber Cyber Neon', border: '5px solid #00f0ff', shadow: '0 0 15px #00f0ff, inset 0 0 10px #00f0ff' },
    { id: 'f4', label: '🦄 Laser Magenta', border: '5px solid #ff007f', shadow: '0 0 15px #ff007f, inset 0 0 10px #ff007f' },
    { id: 'f5', label: '🏛️ Museum Marble', border: '15px solid #e2e8f0', shadow: 'inset 0 0 8px #cbd5e1, 0 4px 12px rgba(0,0,0,0.15)' },
    { id: 'f6', label: '🖤 Onyx Luxury', border: '14px solid #1e293b', shadow: 'inset 0 0 10px #000, 0 6px 12px rgba(0,0,0,0.4)' },
    { id: 'f7', label: '🌲 Forest Teak', border: '16px solid #2d3748', shadow: 'inset 0 0 12px #1a202c, 0 5px 10px rgba(0,0,0,0.3)' },
    { id: 'f8', label: '🎀 Barbie Pink', border: '12px solid #f472b6', shadow: 'inset 0 0 6px #db2777, 0 4px 10px rgba(219,39,119,0.2)' },
    { id: 'f9', label: '🍊 Sunset Copper', border: '12px solid #ea580c', shadow: 'inset 0 0 8px #9a3412, 0 5px 12px rgba(154,52,18,0.25)' },
    { id: 'f10', label: '🍀 Emerald Green', border: '14px double #059669', shadow: 'inset 0 0 10px #064e3b, 0 6px 12px rgba(6,78,59,0.2)' },
    { id: 'f11', label: '🎐 Tokyo Minimal', border: '8px solid #fff', shadow: '0 0 0 2px #000, 0 4px 10px rgba(0,0,0,0.1)' },
    { id: 'f12', label: '🔮 Matrix Violet', border: '5px solid #8b5cf6', shadow: '0 0 12px #8b5cf6, inset 0 0 8px #8b5cf6' },
    { id: 'f13', label: '🍪 Sweet Chocolate', border: '16px solid #78350f', shadow: 'inset 0 0 12px #451a03, 0 4px 10px rgba(0,0,0,0.3)' },
    { id: 'f14', label: '🍿 Vintage Cinema', border: '12px dashed #b91c1c', shadow: 'inset 0 0 5px #7f1d1d, 0 5px 12px rgba(0,0,0,0.2)' },
    { id: 'f15', label: '🛡️ Brushed Iron', border: '14px solid #64748b', shadow: 'inset 0 0 10px #334155, 0 4px 10px rgba(0,0,0,0.2)' }
  ];

  // 2. Beginner-Friendly State Managers
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);
  const [capturedSelfie, setCapturedSelfie] = useState(null); // Stores captured base64 URL image
  const [cameraActive, setCameraActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Initializing camera hardware channels...');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 🚀 3. Hook Loop: Start/Stop native webcam hardware stream via MediaDevices API
  useEffect(() => {
    let internalStreamTrack = null;

    const activateWebCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 380, height: 280 }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          internalStreamTrack = stream;
          setCameraActive(true);
          setStatusMessage('📷 Live Camera Node active! Say cheese and select a frame.');
        }
      } catch (error) {
        console.error("Camera Access Error:", error);
        setCameraActive(false);
        setStatusMessage('❌ Camera activation failed. Kindly approve browser camera authorization fields.');
      }
    };

    if (!capturedSelfie) {
      activateWebCamera();
    }

    return () => {
      if (internalStreamTrack) {
        internalStreamTrack.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedSelfie]);

  // 📸 4. CAPTURE SNAPSHOT ENGINE (સેલ્ફી લોક કરવાનું લોજિક)
  const executeSelfieSnapshot = () => {
    if (!cameraActive || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64ImageData = canvas.toDataURL('image/png');
    setCapturedSelfie(base64ImageData);
    setStatusMessage('🎉 Snapshot captured! Mounted securely inside your chosen frame.');
  };

  // 🧹 5. RESET CONTROL CONTROL
  const resetCameraSession = () => {
    setCapturedSelfie(null);
    setStatusMessage('Webcam feed reallocated. Get ready for the next shot! 😁');
  };

  const currentFrame = frameDesigns[activeFrameIdx];

  return (
    <div style={{ maxWidth: '460px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #38bdf8', padding: '25px', borderRadius: '24px', textAlign: 'center', margin: '0 auto', boxSizing: 'border-box', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Ribbon Branding */}
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Selfie Frame Studio 📸</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Live Camera Node Grid Module • 15 Premium Frames</p>

      {/* 🔍 15 FRAMES DROP-DOWN SELECTOR */}
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>CHOOSE PHOTO FRAME STYLE:</label>
        <select
          value={activeFrameIdx}
          onChange={(e) => setActiveFrameIdx(parseInt(e.target.value, 10))}
          style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #1e293b', backgroundColor: '#020617', color: '#fff', fontSize: '14px', cursor: 'pointer', outline: 'none', fontWeight: '600' }}
        >
          {frameDesigns.map((frame, idx) => (
            <option key={frame.id} value={idx}>{idx + 1}. {frame.label}</option>
          ))}
        </select>
      </div>

      {/* 🏟️ DYNAMIC FRAME HUD STAGE CONTAINER */}
      <div style={{ 
        width: '360px', 
        height: '270px', 
        margin: '0 auto 20px auto', 
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#020617',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // 💡 15 dynamic styles are instantly triggered from the array keys parameters below
        border: currentFrame.border,
        boxShadow: currentFrame.shadow,
        borderRadius: currentFrame.id.includes('f3') || currentFrame.id.includes('f4') || currentFrame.id.includes('f12') ? '12px' : '2px',
        transition: 'all 0.15s ease-out'
      }}>
        
        {capturedSelfie ? (
          <img 
            src={capturedSelfie} 
            alt="Captured Selfie" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeIn 0.2s ease-out' }} 
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
          />
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Live status tracing message logs window */}
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#cbd5e1', fontStyle: 'italic', minHeight: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.4', padding: '0 10px' }}>
        {statusMessage}
      </p>

      {/* 🎮 ACTION CONTROL TRIGGERS BUTTON PANEL */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {!capturedSelfie ? (
          <button 
            onClick={executeSelfieSnapshot}
            disabled={!cameraActive}
            style={{ width: '100%', padding: '13px', backgroundColor: '#38bdf8', color: '#020617', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: !cameraActive ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(56,189,248,0.25)' }}
          >
            📸 Capture Photo Snapshot
          </button>
        ) : (
          <button 
            onClick={resetCameraSession}
            style={{ width: '100%', padding: '13px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,0.25)' }}
          >
            🔄 Delete & Retake New Photo
          </button>
        )}
      </div>

    </div>
  );
};

export default SelfieApp;
