import React, { useState } from 'react';

function XeroxMachine() {
  // ૧. ઝેરોક્ષ મશીનના સાદા સ્ટેટ્સ
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [copiesCount, setCopiesCount] = useState(1);
  const [isColorMode, setIsColorMode] = useState(false); // false = Black & White, true = Color
  const [darkness, setDarkness] = useState(110);         // શાહીની ઘાટાશ (Contrast %)
  const [isScanning, setIsScanning] = useState(false);
  const [printedCopies, setPrintedCopies] = useState([]);

  // ૨. ફાઇલ અપલોડ કરવાનું ફંક્શન
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedDoc(imageUrl);
      setPrintedCopies([]);
    }
  };

  // 🚀 ૩. ઝેરોક્ષ મશીન ચાલુ કરવાનું ફંક્શન
  const startXeroxPrint = () => {
    if (!uploadedDoc) {
      alert('Please upload a document or photo first!');
      return;
    }

    setIsScanning(true);
    setPrintedCopies([]);

    // ૨ સેકન્ડ સ્કેનિંગ એનિમેશન ચાલશે અને પછી કૉપીઓ બહાર આવશે
    setTimeout(() => {
      const newCopies = [];
      for (let i = 1; i <= copiesCount; i++) {
        newCopies.push({
          id: i,
          img: uploadedDoc,
          isColor: isColorMode,
          contrast: darkness
        });
      }
      setPrintedCopies(newCopies);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #38bdf8', color: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Digital Xerox Machine 🖨️</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Upload • Scan • Print Copies
      </p>

      {/* ૧. ડોક્યુમેન્ટ અપલોડ બોક્સ */}
      <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px dashed #334155', marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>
          📄 UPLOAD DOCUMENT / PHOTO FOR XEROX:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ color: '#cbd5e1', fontSize: '13px' }}
        />
      </div>

      {/* ૨. ઝેરોક્ષ કંટ્રોલ પેનલ (કૉપી સંખ્યા, B&W/Color, Darkness) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px solid #1e293b', marginBottom: '20px', textAlign: 'left' }}>
        
        {/* કૉપીની સંખ્યા */}
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
            NUMBER OF COPIES:
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={copiesCount}
            onChange={(e) => setCopiesCount(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        {/* કલર કે B&W મોડ */}
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
            PRINT MODE:
          </label>
          <select
            value={isColorMode ? 'color' : 'bw'}
            onChange={(e) => setIsColorMode(e.target.value === 'color')}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px' }}
          >
            <option value="bw">⚫⚪ Black & White</option>
            <option value="color">🌈 Color Xerox</option>
          </select>
        </div>

        {/* શાહીની ઘાટાશ (Darkness Slider) */}
        <div style={{ gridColumn: 'span 2', marginTop: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>
            <span>INK DARKNESS (CONTRAST):</span>
            <span style={{ color: '#38bdf8' }}>{darkness}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="200"
            value={darkness}
            onChange={(e) => setDarkness(e.target.value)}
            style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
          />
        </div>

      </div>

      {/* ૩. સ્કેનર ગ્લાસ બેડ (Scanner Screen) */}
      <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '2px solid #1e293b', marginBottom: '20px', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {uploadedDoc ? (
          <img
            src={uploadedDoc}
            alt="Original Document"
            style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '6px', opacity: isScanning ? 0.5 : 1 }}
          />
        ) : (
          <span style={{ color: '#475569', fontSize: '13px' }}>Scanner Glass Empty (Upload a file)</span>
        )}

        {/* સ્કેનિંગ ગ્રીન લેસર લાઈટ */}
        {isScanning && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(34, 197, 94, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>
            🟢 SCANNING DOCUMENT...
          </div>
        )}
      </div>

      {/* ૪. START XEROX બટન */}
      <button
        onClick={startXeroxPrint}
        disabled={isScanning}
        style={{ width: '100%', padding: '14px', backgroundColor: isScanning ? '#334155' : '#22c55e', color: isScanning ? '#94a3b8' : '#000', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: isScanning ? 'not-allowed' : 'pointer', marginBottom: '20px' }}
      >
        {isScanning ? '🖨️ Printing Copies...' : '🚀 Start Xerox Copy'}
      </button>

      {/* ૫. આઉટપુટ ટ્રે (બહાર નીકળેલી ઝેરોક્ષ કૉપીઓ) */}
      {printedCopies.length > 0 && (
        <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px solid #22c55e' }}>
          <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: 'bold', marginBottom: '12px' }}>
            ✅ OUTPUT TRAY ({printedCopies.length} {printedCopies.length === 1 ? 'Copy' : 'Copies'} Ready)
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {printedCopies.map((copy) => (
              <div key={copy.id} style={{ backgroundColor: '#fff', padding: '6px', borderRadius: '6px', width: '110px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                <img
                  src={copy.img}
                  alt={`Copy ${copy.id}`}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    // અસલી ઝેરોક્ષ જેવી ઇફેક્ટ માટે CSS filter
                    filter: copy.isColor
                      ? `contrast(${copy.contrast}%)`
                      : `grayscale(100%) contrast(${copy.contrast}%)`
                  }}
                />
                <div style={{ color: '#0f172a', fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>
                  Copy #{copy.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default XeroxMachine;
