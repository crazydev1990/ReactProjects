import React, { useState } from 'react';

function LanguageSwitcher() {
  // ૧. પસંદ કરેલી ભાષાનો સ્ટેટ ('en', 'gu', 'hi')
  const [lang, setLang] = useState('en');

  // ૨. ત્રણેય ભાષાઓનું સાદું ડિક્શનરી ઓબ્જેક્ટ
  const translations = {
    en: {
      heading: 'Welcome to Our Application 🌍',
      subtitle: 'Learn React step by step with simple examples.',
      bodyText: 'Changing the language updates all text dynamically without reloading the page.',
      btnLabel: 'Get Started 🚀'
    },
    gu: {
      heading: 'અમારી એપ્લિકેશનમાં તમારું સ્વાગત છે 🌍',
      subtitle: 'સરળ ઉદાહરણો સાથે સ્ટેપ બાય સ્ટેપ React શીખો.',
      bodyText: 'ભાષા બદલવાથી પેજ રિલોડ થયા વગર બધું લખાણ તરત જ બદલાઈ જાય છે.',
      btnLabel: 'શરૂ કરો 🚀'
    },
    hi: {
      heading: 'हमारे एप्लिकेशन में आपका स्वागत है 🌍',
      subtitle: 'आसान उदाहरणों के साथ स्टेप बाय स्टेप React सीखें।',
      bodyText: 'भाषा बदलने से पेज रीलोड हुए बिना सारा टेक्स्ट तुरंत बदल जाता है।',
      btnLabel: 'शुरू करें 🚀'
    }
  };

  // હાલની પસંદ કરેલી ભાષાનો ડેટા મેળવો
  const currentContent = translations[lang];

  return (
    <div style={{ maxWidth: '460px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '20px', border: '2px solid #a78bfa', color: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 🌐 ભાષા પસંદ કરવાનું ડ્રોપડાઉન */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '15px' }}>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>SELECT LANGUAGE:</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#020617', color: '#fff', border: '1px solid #334155', fontSize: '14px', cursor: 'pointer', outline: 'none' }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
          <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
        </select>
      </div>

      {/* બદલાતું લખાણ (Dynamic Text Output) */}
      <div style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '14px', border: '1px solid #1e293b' }}>
        <h3 style={{ color: '#a78bfa', margin: '0 0 10px 0', fontSize: '20px' }}>
          {currentContent.heading}
        </h3>
        <h5 style={{ color: '#38bdf8', margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'normal' }}>
          {currentContent.subtitle}
        </h5>
        <p style={{ color: '#cbd5e1', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px' }}>
          {currentContent.bodyText}
        </p>
        <button style={{ padding: '10px 24px', backgroundColor: '#a78bfa', color: '#020617', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
          {currentContent.btnLabel}
        </button>
      </div>

    </div>
  );
}

export default LanguageSwitcher;
