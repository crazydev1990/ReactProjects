import React, { useState, useRef } from 'react';

function ImageEditor() {
  // 1. Image source & transform states
  const [imageSrc, setImageSrc] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(1); // 1 = normal, -1 = flipped horizontally
  const [flipV, setFlipV] = useState(1); // 1 = normal, -1 = flipped vertically

  // 2. Filter slider states (default values)
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);

  const canvasRef = useRef(null);

  // 📂 Upload image from device
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      resetAllEdits();
    }
  };

  // 🔄 Reset all sliders & transforms to default
  const resetAllEdits = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setGrayscale(0);
    setSepia(0);
    setBlur(0);
    setRotation(0);
    setFlipH(1);
    setFlipV(1);
  };

  // 🎨 Build combined CSS filter string
  const filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px)`;

  // 💾 Export & Download final edited image via hidden HTML5 Canvas
  const downloadEditedImage = () => {
    if (!imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      // Swap width & height if rotated 90 or 270 degrees
      const isVertical = rotation === 90 || rotation === 270;
      canvas.width = isVertical ? img.height : img.width;
      canvas.height = isVertical ? img.width : img.height;

      ctx.save();
      ctx.filter = filterString;

      // Move origin to center for rotation & flipping
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH, flipV);

      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      // Trigger PNG download
      const link = document.createElement('a');
      link.download = `Edited_Photo_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #38bdf8', color: '#fff', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0', textAlign: 'center' }}>Pro Image Editor Studio 🎨🖼️</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Filters • Rotate • Flip • Instant Download
      </p>

      {/* File Upload Bar */}
      <div style={{ backgroundColor: '#020617', padding: '14px', borderRadius: '14px', border: '1px dashed #334155', marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ color: '#cbd5e1', fontSize: '13px', cursor: 'pointer' }}
        />
      </div>

      {/* Main Workspace: Preview Left + Controls Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* 🖼️ LEFT: Live Image Preview Box */}
        <div style={{ backgroundColor: '#020617', borderRadius: '16px', border: '1px solid #1e293b', minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px', overflow: 'hidden' }}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Live Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                filter: filterString,
                transform: `rotate(${rotation}deg) scaleX(${flipH}) scaleY(${flipV})`,
                transition: 'all 0.15s ease'
              }}
            />
          ) : (
            <span style={{ color: '#475569', fontSize: '13px' }}>Upload a photo to start editing</span>
          )}
        </div>

        {/* 🎛️ RIGHT: Sliders & Transform Controls */}
        <div style={{ backgroundColor: '#020617', padding: '18px', borderRadius: '16px', border: '1px solid #1e293b', opacity: imageSrc ? 1 : 0.4, pointerEvents: imageSrc ? 'auto' : 'none' }}>
          
          {/* Filter Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px', fontSize: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>☀️ Brightness</span><span>{brightness}%</span>
              </div>
              <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>🌗 Contrast</span><span>{contrast}%</span>
              </div>
              <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>🌈 Saturation</span><span>{saturate}%</span>
              </div>
              <input type="range" min="0" max="200" value={saturate} onChange={(e) => setSaturate(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>⚫ Grayscale (B&W)</span><span>{grayscale}%</span>
              </div>
              <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>📜 Vintage Sepia</span><span>{sepia}%</span>
              </div>
              <input type="range" min="0" max="100" value={sepia} onChange={(e) => setSepia(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>💧 Blur</span><span>{blur}px</span>
              </div>
              <input type="range" min="0" max="10" value={blur} onChange={(e) => setBlur(e.target.value)} style={{ width: '100%', accentColor: '#38bdf8' }} />
            </div>
          </div>

          {/* Rotate & Flip Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            <button onClick={() => setRotation((prev) => (prev + 90) % 360)} style={{ padding: '9px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              🔄 Rotate
            </button>
            <button onClick={() => setFlipH((prev) => prev * -1)} style={{ padding: '9px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              ↔️ Flip H
            </button>
            <button onClick={() => setFlipV((prev) => prev * -1)} style={{ padding: '9px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              ↕️ Flip V
            </button>
          </div>

          {/* Reset & Save Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetAllEdits} style={{ flex: 1, padding: '11px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              🧹 Reset
            </button>
            <button onClick={downloadEditedImage} style={{ flex: 2, padding: '11px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
              💾 Save Image
            </button>
          </div>

        </div>
      </div>

      {/* Hidden Canvas for exporting the final edited photo */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

    </div>
  );
}

export default ImageEditor;
