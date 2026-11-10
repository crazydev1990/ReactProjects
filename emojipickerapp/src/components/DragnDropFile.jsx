import React, { useState } from 'react';

const DragnDropFile = () => {
  const [fileDetails, setFileDetails] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false); // ડ્રેગ કરવા પર બોર્ડર હાઇલાઇટ કરવા

  // જ્યારે ફાઇલ બોક્સની ઉપર લાવવામાં આવે ત્યારે
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  // જ્યારે ફાઇલ બોક્સની બહાર લઈ જવામાં આવે ત્યારે
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  // 📥 જ્યારે ફાઇલ બોક્સની અંદર માઉસથી છોડવામાં આવે (Drop) ત્યારે
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      calculateFileMetrics(droppedFile);
    }
  };

  // જો કોઈ ડ્રેગ કરવાના બદલે સાદું બ્રાઉઝ (Browse) બટન વાપરે ત્યારે
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      calculateFileMetrics(selectedFile);
    }
  };

  // ફાઇલની સાઇઝને સાદા MB માં કન્વર્ટ કરવાનું મેથ્સ લોજિક
  const calculateFileMetrics = (file) => {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2); // બાઈટ્સમાંથી મેગાબાઈટ્સ
    setFileDetails({
      name: file.name,
      type: file.type || 'Unknown Format',
      size: `${sizeInMB} MB`
    });
  };

  return (
    <div style={{ maxWidth: '400px', width: '100%', backgroundColor: '#0f172a', border: '2px solid #10b981', padding: '25px', borderRadius: '20px', margin: '0 auto', boxSizing: 'border-box', boxShadow: '0 20px 25px rgba(0,0,0,0.3)' }}>
      
      <h3 style={{ color: '#10b981', margin: '0 0 5px 0', textAlign: 'center' }}>File Details Catcher 📂</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>Drag any file inside the drop zone block to read data metrics</p>

      {/* 📥 ડ્રેગ એન્ડ ડ્રોપ એરિયા બોક્સ */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: isDragActive ? '3px dashed #10b981' : '2px dashed #334155',
          backgroundColor: isDragActive ? 'rgba(16,185,129,0.05)' : '#020617',
          padding: '40px 15px',
          borderRadius: '16px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease-in-out',
          marginBottom: '20px'
        }}
      >
        <span style={{ fontSize: '44px', display: 'block', marginBottom: '10px' }}>📥</span>
        <span style={{ fontSize: '13px', color: '#cbd5e1', display: 'block', marginBottom: '15px' }}>
          {isDragActive ? "Drop the file here now!" : "Drag & Drop File Here or click below to browse"}
        </span>
        <input 
          type="file" 
          onChange={handleFileChange} 
          style={{ fontSize: '12px', color: '#64748b', maxWidth: '210px', margin: '0 auto' }} 
        />
      </div>

      {/* 📊 ફાઇલ ડિટેઇલ્સ લાઈવ આઉટપુટ કાર્ડ */}
      {fileDetails ? (
        <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', fontSize: '13px', lineHeight: '1.5', textAlign: 'left' }}>
          <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}>📋 File Metrics:</div>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}><b>Name:</b> {fileDetails.name}</div>
          <div style={{ margin: '6px 0' }}><b>Type:</b> {fileDetails.type}</div>
          <div><b>Size:</b> {fileDetails.size}</div>
        </div>
      ) : (
        <div style={{ color: '#475569', fontSize: '12px', textAlign: 'center', fontStyle: 'italic' }}>
          No active binary files dropped yet.
        </div>
      )}

    </div>
  );
};

export default DragnDropFile;
