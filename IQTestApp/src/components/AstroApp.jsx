import React, { useState } from 'react';

function AstroApp() {
  // ૧. બધી ૧૨ રાશિઓનો ડેટા (અંગ્રેજી + ગુજરાતી નામ, લકી નંબર, કલર અને રાશિફળ)
  const zodiacSigns = [
    { id: 'aries', name: 'Aries (મેષ)', icon: '♈', dates: 'Mar 21 - Apr 19', luckyNum: 9, luckyColor: 'Red ❤️', prediction: 'Today brings high energy and new career opportunities. Stay confident in your decisions.' },
    { id: 'taurus', name: 'Taurus (વૃષભ)', icon: '♉', dates: 'Apr 20 - May 20', luckyNum: 6, luckyColor: 'Green 💚', prediction: 'Financial stability is on the way. Spend quality time with family and avoid unnecessary stress.' },
    { id: 'gemini', name: 'Gemini (મિથુન)', icon: '♊', dates: 'May 21 - Jun 20', luckyNum: 5, luckyColor: 'Yellow 💛', prediction: 'Great day for communication and learning new tech skills. An old friend may reconnect.' },
    { id: 'cancer', name: 'Cancer (કર્ક)', icon: '♋', dates: 'Jun 21 - Jul 22', luckyNum: 2, luckyColor: 'White 🤍', prediction: 'Trust your intuition today. Home and personal life will bring peace and happiness.' },
    { id: 'leo', name: 'Leo (સિંહ)', icon: '♌', dates: 'Jul 23 - Aug 22', luckyNum: 1, luckyColor: 'Gold 🧡', prediction: 'Your leadership skills will shine at work. Expect appreciation from seniors or clients.' },
    { id: 'virgo', name: 'Virgo (કન્યા)', icon: '♍', dates: 'Aug 23 - Sep 22', luckyNum: 5, luckyColor: 'Navy Blue 💙', prediction: 'Focus on organization and health. Small consistent efforts will bring big success.' },
    { id: 'libra', name: 'Libra (તુલા)', icon: '♎', dates: 'Sep 23 - Oct 22', luckyNum: 6, luckyColor: 'Pink 🩷', prediction: 'Balance is the key today. Partnerships and teamwork will give positive results.' },
    { id: 'scorpio', name: 'Scorpio (વૃશ્ચિક)', icon: '♏', dates: 'Oct 23 - Nov 21', luckyNum: 9, luckyColor: 'Maroon 🤎', prediction: 'Deep focus will help you solve a complex problem. Keep your plans private for now.' },
    { id: 'sagittarius', name: 'Sagittarius (ધન)', icon: '♐', dates: 'Nov 22 - Dec 21', luckyNum: 3, luckyColor: 'Purple 💜', prediction: 'Travel or exploring new ideas will bring joy. Optimism will attract good luck.' },
    { id: 'capricorn', name: 'Capricorn (મકર)', icon: '♑', dates: 'Dec 22 - Jan 19', luckyNum: 8, luckyColor: 'Black 🖤', prediction: 'Hard work pays off today. Stay disciplined with your goals and finances.' },
    { id: 'aquarius', name: 'Aquarius (કુંભ)', icon: '♒', dates: 'Jan 20 - Feb 18', luckyNum: 4, luckyColor: 'Sky Blue 🩵', prediction: 'Innovative thinking will set you apart. Great day for coding, creativity, and networking.' },
    { id: 'pisces', name: 'Pisces (મીન)', icon: '♓', dates: 'Feb 19 - Mar 20', luckyNum: 7, luckyColor: 'Sea Green 💚', prediction: 'Creative inspiration is high. Take some time to relax and recharge your mind.' }
  ];

  // ૨. સ્ટેટ મેનેજર્સ
  const [selectedSign, setSelectedSign] = useState(zodiacSigns);
  const [birthDate, setBirthDate] = useState('');

  // 📅 ૩. જન્મ તારીખ (Birthdate) પરથી આપોઆપ રાશિ શોધવાનું લોજિક
  const findSignByDate = (dateString) => {
    setBirthDate(dateString);
    if (!dateString) return;

    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1; // 1 થી 12
    const day = dateObj.getDate();        // 1 થી 31

    let detectedId = 'aries';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) detectedId = 'aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) detectedId = 'taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) detectedId = 'gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) detectedId = 'cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) detectedId = 'leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) detectedId = 'virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) detectedId = 'libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) detectedId = 'scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) detectedId = 'sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) detectedId = 'capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) detectedId = 'aquarius';
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) detectedId = 'pisces';

    const found = zodiacSigns.find((z) => z.id === detectedId);
    if (found) setSelectedSign(found);
  };

  return (
    <div style={{ maxWidth: '540px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #a855f7', color: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      
      <h3 style={{ color: '#c084fc', margin: '0 0 5px 0' }}>Astro Daily Horoscope 🔮✨</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>
        12 Zodiac Signs • Birthdate Rashi Finder
      </p>

      {/* 📅 જન્મ તારીખ નાખીને રાશિ શોધવાનું બોક્સ */}
      <div style={{ backgroundColor: '#020617', padding: '12px 15px', borderRadius: '14px', border: '1px solid #1e293b', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <label style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 'bold' }}>
          🎂 Find Rashi by Birthdate:
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => findSignByDate(e.target.value)}
          style={{ padding: '7px 10px', borderRadius: '8px', border: '1px solid #4c1d95', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px', outline: 'none' }}
        />
      </div>

      {/* ♈ ૧૨ રાશિઓના બટનો (Zodiac Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
        {zodiacSigns.map((sign) => {
          const isActive = selectedSign.id === sign.id;
          return (
            <button
              key={sign.id}
              onClick={() => setSelectedSign(sign)}
              style={{
                padding: '10px 4px',
                borderRadius: '12px',
                border: isActive ? '2px solid #c084fc' : '1px solid #1e293b',
                backgroundColor: isActive ? '#3b0764' : '#020617',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '20px' }}>{sign.icon}</span>
              <span style={{ fontSize: '10.5px', fontWeight: 'bold', color: isActive ? '#e9d5ff' : '#94a3b8' }}>
                {sign.name.split(' ')}
              </span>
            </button>
          );
        })}
      </div>

      {/* 🔮 પસંદ કરેલી રાશિનું આજનું ભવિષ્ય (Horoscope Card) */}
      <div style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '18px', border: '1px solid #6b21a8', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '12px' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '18px', color: '#c084fc' }}>
              {selectedSign.icon} {selectedSign.name}
            </h4>
            <small style={{ color: '#64748b', fontSize: '11px' }}>🗓️ {selectedSign.dates}</small>
          </div>
          <span style={{ backgroundColor: '#3b0764', color: '#e9d5ff', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
            Today's Prediction
          </span>
        </div>

        <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.6', margin: '0 0 15px 0' }}>
          {selectedSign.prediction}
        </p>

        {/* Lucky Number અને Lucky Color */}
        <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
          <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '8px 12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
            🍀 <strong>Lucky Number:</strong> <span style={{ color: '#4ade80' }}>{selectedSign.luckyNum}</span>
          </div>
          <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '8px 12px', borderRadius: '10px', border: '1px solid #1e293b' }}>
            🎨 <strong>Lucky Color:</strong> <span style={{ color: '#38bdf8' }}>{selectedSign.luckyColor}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AstroApp;
