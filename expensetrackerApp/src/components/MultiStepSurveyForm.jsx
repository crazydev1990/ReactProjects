import React, { useState } from 'react';

function MultiStepSurveyForm() {
  // ૧. કયું સ્ટેપ ચાલુ છે તે સાચવવા માટે (1, 2, અથવા 3)
  const [step, setStep] = useState(1);

  // ૨. યુઝરના જવાબો સાચવવા માટે સાદા સ્ટેટ્સ
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState('Good');
  const [isDone, setIsDone] = useState(false);

  // આગળના સ્ટેપ પર જવા માટે
  const handleNext = () => {
    setStep(step + 1);
  };

  // પાછળના સ્ટેપ પર જવા માટે
  const handleBack = () => {
    setStep(step - 1);
  };

  // ફોર્મ સબમિટ કરવા માટે
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDone(true);
  };

  return (
    <div style={{ maxWidth: '380px', margin: '30px auto', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '2px solid #3b82f6', fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
      
      <h2 style={{ textAlign: 'center', color: '#2563eb', margin: '0 0 10px 0' }}>
        Simple Survey Form 📋
      </h2>

      {/* જો ફોર્મ સબમિટ થઈ ગયું હોય તો આ મેસેજ બતાવો */}
      {isDone ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#16a34a' }}>Thank You, {name}! 🎉</h3>
          <p>Your survey has been submitted.</p>
          <button
            onClick={() => {
              setStep(1);
              setName('');
              setCity('');
              setIsDone(false);
            }}
            style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Fill Again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          
          <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>
            Step {step} of 3
          </p>

          {/* 🟢 STEP 1: નામ પૂછો */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label><strong>1. What is your Name?</strong></label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />
              <button
                type="button"
                onClick={handleNext}
                disabled={name === ''}
                style={{ padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }}
              >
                Next ➡️
              </button>
            </div>
          )}

          {/* 🟡 STEP 2: શહેર અને રેટિંગ પૂછો */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label><strong>2. Which City do you live in?</strong></label>
              <input
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />

              <label><strong>3. How was your experience?</strong></label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="Excellent">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="Good">⭐⭐⭐⭐ Good</option>
                <option value="Average">⭐⭐⭐ Average</option>
              </select>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleBack}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  ⬅️ Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={city === ''}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Next ➡️
                </button>
              </div>
            </div>
          )}

          {/* 🔵 STEP 3: બધી વિગતો ચેક કરીને સબમિટ કરો */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h4>Confirm Your Answers:</h4>
              <div style={{ backgroundColor: '#e2e8f0', padding: '12px', borderRadius: '8px', fontSize: '14px' }}>
                <p style={{ margin: '4px 0' }}><strong>Name:</strong> {name}</p>
                <p style={{ margin: '4px 0' }}><strong>City:</strong> {city}</p>
                <p style={{ margin: '4px 0' }}><strong>Rating:</strong> {rating}</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleBack}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  ⬅️ Back
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Submit ✅
                </button>
              </div>
            </div>
          )}

        </form>
      )}

    </div>
  );
}

export default MultiStepSurveyForm;
