
import React, { useState } from 'react';

function MultiplicationTable() {
  // 1. Common number state
  const [baseNumber, setBaseNumber] = useState(5);

  // 2. Generate numbers from 1 to 10
  const multipliers = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '0 auto',
        padding: '25px',
        backgroundColor: '#0f172a',
        borderRadius: '24px',
        border: '2px solid #38bdf8',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >

      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>
        Multiplication Table ✖️
      </h3>

      <p
        style={{
          margin: '0 0 20px 0',
          fontSize: '11px',
          color: '#64748b',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}
      >
        Interactive Table Generator (1 to 10)
      </p>

      {/* Common Number Input */}
      <div
        style={{
          backgroundColor: '#020617',
          padding: '14px',
          borderRadius: '14px',
          border: '1px solid #1e293b',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <label style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 'bold' }}>
          Enter Common Number:
        </label>

        <input
          type="number"
          value={baseNumber}
          onChange={(e) => setBaseNumber(e.target.value)}
          placeholder="0"
          style={{
            width: '100px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '2px solid #38bdf8',
            backgroundColor: '#0f172a',
            color: '#38bdf8',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
            outline: 'none'
          }}
        />
      </div>

      {/* Multiplication Table */}
      <div
        style={{
          backgroundColor: '#020617',
          padding: '15px',
          borderRadius: '16px',
          border: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >

        {multipliers.map((num) => {
          const answer =
            baseNumber === ''
              ? ''
              : Number(baseNumber) * num;

          return (
            <div
              key={num}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1.5fr',
                alignItems: 'center',
                backgroundColor: '#0f172a',
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #1e293b',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >

              {/* Column 1: Common Number */}
              <div style={{ color: '#38bdf8' }}>
                {baseNumber === '' ? '' : baseNumber}
              </div>

              {/* Column 2: Multiplier */}
              <div style={{ color: '#94a3b8' }}>
                × {num}
              </div>

              {/* Column 3: Answer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '8px'
                }}
              >
                <span style={{ color: '#eab308' }}>=</span>

                <input
                  type="text"
                  value={answer}
                  readOnly
                  style={{
                    width: '75px',
                    padding: '6px',
                    borderRadius: '6px',
                    border: '1px solid #334155',
                    backgroundColor: '#020617',
                    color: '#4ade80',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default MultiplicationTable;
