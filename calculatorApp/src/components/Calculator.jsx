import React from 'react'
import { useState } from 'react';

const Calculator = () => {
    // 1. States: Input boxes mate numbers store karva
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  // 2. Calculations mate nu common function (Arrow Function)
  const handleCalculate = (operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    // Check karo ke inputs khali to nathi ne
    if (isNaN(n1) || isNaN(n2)) {
      alert("Please enter valid numbers in both fields!");
      return;
    }

    // Operation mujab calculation thashe
    if (operation === '+') setResult(n1 + n2);
    if (operation === '-') setResult(n1 - n2);
    if (operation === '*') setResult(n1 * n2);
    if (operation === '/') {
      if (n2 === 0) {
        alert("Cannot divide by zero!");
        return;
      }
      setResult(n1 / n2);
    }
  };

  // 3. Inputs ane Result ne khali (Clear) karva mate
  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult(null);
  };
  return (
    <>
          <div style={{ padding: '40px', maxWidth: '320px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px', fontFamily: 'Arial', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#1a73e8', margin: '0 0 20px 0' }}>🧮 Basic Calculator</h3>
      
      {/* Input Number 1 */}
      <input 
        type="number" 
        placeholder="Enter Number 1" 
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ width: '90%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      
      {/* Input Number 2 */}
      <input 
        type="number" 
        placeholder="Enter Number 2" 
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ width: '90%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      {/* Operation Buttons Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', gap: '5px' }}>
        <button onClick={() => handleCalculate('+')} style={{ padding: '10px 15px', fontSize: '18px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+</button>
        <button onClick={() => handleCalculate('-')} style={{ padding: '10px 15px', fontSize: '18px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>-</button>
        <button onClick={() => handleCalculate('*')} style={{ padding: '10px 15px', fontSize: '18px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>*</button>
        <button onClick={() => handleCalculate('/')} style={{ padding: '10px 15px', fontSize: '18px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>/</button>
      </div>

      {/* Clear Button */}
      <button onClick={handleClear} style={{ width: '96%', padding: '10px', background: '#d93025', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
        Clear
      </button>

      {/* Result Display Section */}
      {result !== null && (
        <div style={{ padding: '15px', background: '#e8f0fe', borderRadius: '5px', border: '1px solid #1a73e8' }}>
          <strong style={{ fontSize: '18px', color: '#1a73e8' }}>Result: {result}</strong>
        </div>
      )}

    </div>

    </>
  )
}

export default Calculator
