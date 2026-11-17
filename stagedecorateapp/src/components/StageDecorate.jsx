import React, { useState } from 'react';

function StageDecorate() {
  // ૧. દરેક ઇવેન્ટ અને તહેવાર મુજબ સ્ટેજની થીમ, લાઈટિંગ અને સજાવટ
  const eventThemes = {
    diwali: {
      label: '🪔 Happy Diwali Celebration (દિવાળી મહોત્સવ)',
      bgGradient: 'linear-gradient(135deg, #451a03 0%, #9a3412 50%, #713f12 100%)',
      borderColor: '#facc15',
      lightGlow: 'rgba(250, 204, 21, 0.7)',
      topGarland: '🪔✨🎆🪔✨🎆🪔✨🎆🪔✨🎆',
      leftProp: '🪔🎇',
      rightProp: '🎆🪔',
      centerIcon: '🪔✨',
      defaultTitle: 'Shubh Deepavali • Festival of Lights'
    },
    rakshabandhan: {
      label: '🧵 Raksha Bandhan Special (રક્ષાબંધન)',
      bgGradient: 'linear-gradient(135deg, #701a75 0%, #be185d 50%, #831843 100%)',
      borderColor: '#f472b6',
      lightGlow: 'rgba(244, 114, 182, 0.6)',
      topGarland: '🌸🧵💖🌸🧵💖🌸🧵💖🌸🧵💖',
      leftProp: '🎁🍬',
      rightProp: '🍫🎁',
      centerIcon: '🧵❤️',
      defaultTitle: 'Happy Raksha Bandhan • Bond of Love'
    },
    independence: {
      label: '🇮🇳 15th August Independence Day (સ્વતંત્રતા દિવસ)',
      bgGradient: 'linear-gradient(180deg, #ea580c 0%, #ffffff 50%, #16a34a 100%)',
      borderColor: '#38bdf8',
      lightGlow: 'rgba(56, 189, 248, 0.65)',
      topGarland: '🇮🇳🧡🤍💚🇮🇳🧡🤍💚🇮🇳🧡🤍💚',
      leftProp: '🇮🇳🕊️',
      rightProp: '🕊️🇮🇳',
      centerIcon: '🇮🇳☸️',
      defaultTitle: 'Happy Independence Day • Jai Hind!'
    },
    wedding: {
      label: '💍 Royal Indian Wedding (લગ્ન પ્રસંગ)',
      bgGradient: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #450a0a 100%)',
      borderColor: '#facc15',
      lightGlow: 'rgba(250, 204, 21, 0.5)',
      topGarland: '🌺🌼🌸🌺🌼🌸🌺🌼🌸🌺🌼🌸',
      leftProp: '🪔🌴',
      rightProp: '🌴🪔',
      centerIcon: '👑💍',
      defaultTitle: 'Shubh Vivah • Rahul weds Priya'
    },
    birthday: {
      label: '🎂 Kids & Grand Birthday Party (જન્મદિવસ)',
      bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #6d28d9 50%, #be185d 100%)',
      borderColor: '#38bdf8',
      lightGlow: 'rgba(56, 189, 248, 0.6)',
      topGarland: '🎈🎉🎊🎈🎉🎊🎈🎉🎊🎈🎉🎊',
      leftProp: '🎁🧸',
      rightProp: '🧸🎁',
      centerIcon: '🎂🕯️',
      defaultTitle: 'Happy Birthday Aarav! 🎉'
    },
    navratri: {
      label: '💃 Navratri Garba Night (નવરાત્રી મહોત્સવ)',
      bgGradient: 'linear-gradient(135deg, #b45309 0%, #c2410c 50%, #7c2d12 100%)',
      borderColor: '#4ade80',
      lightGlow: 'rgba(74, 222, 128, 0.5)',
      topGarland: '🏮✨🪔🏮✨🪔🏮✨🪔🏮✨🪔',
      leftProp: '🥁💃',
      rightProp: '🕺🥁',
      centerIcon: '🪔🔱',
      defaultTitle: 'Shubh Navratri • Garba Mahotsav'
    },
    corporate: {
      label: '💼 Corporate Tech Conference (સેમિનાર)',
      bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)',
      borderColor: '#38bdf8',
      lightGlow: 'rgba(56, 189, 248, 0.35)',
      topGarland: '💡🔷💡🔷💡🔷💡🔷💡🔷💡🔷',
      leftProp: '🎤📊',
      rightProp: '💻🏆',
      centerIcon: '🌐🚀',
      defaultTitle: 'Annual Tech Summit 2026'
    }
  };

  // ૨. સ્ટેટ મેનેજર્સ
  const [selectedEvent, setSelectedEvent] = useState('diwali');
  const [customBannerText, setCustomBannerText] = useState('');
  const [lightsOn, setLightsOn] = useState(true);

  const currentStage = eventThemes[selectedEvent];

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '24px', border: '2px solid #38bdf8', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0', textAlign: 'center' }}>
        Festival & Event Stage Decorator 🎪✨
      </h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Diwali • Raksha Bandhan • 15th August • Wedding & More
      </p>

      {/* 🎛️ કંટ્રોલ પેનલ */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', backgroundColor: '#020617', padding: '16px', borderRadius: '16px', border: '1px solid #1e293b', marginBottom: '22px', textAlign: 'left' }}>
        
        {/* Event / Festival Selection Dropdown */}
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
            1. SELECT EVENT / FESTIVAL:
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              setCustomBannerText('');
            }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #38bdf8', backgroundColor: '#0f172a', color: '#fff', fontSize: '13px', fontWeight: 'bold', outline: 'none', cursor: 'pointer' }}
          >
            {Object.keys(eventThemes).map((key) => (
              <option key={key} value={key}>
                {eventThemes[key].label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Stage Banner Text */}
        <div>
          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
            2. CUSTOM STAGE BANNER:
          </label>
          <input
            type="text"
            value={customBannerText}
            onChange={(e) => setCustomBannerText(e.target.value)}
            placeholder={currentStage.defaultTitle}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#facc15', fontSize: '13px', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {/* Stage Lights Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => setLightsOn(!lightsOn)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer',
              backgroundColor: lightsOn ? '#facc15' : '#334155',
              color: lightsOn ? '#000' : '#fff'
            }}
          >
            {lightsOn ? '💡 Stage Lights: ON' : '🌑 Stage Lights: OFF'}
          </button>
        </div>

      </div>

      {/* =======================================================
          🏟️ LIVE DECORATED STAGE VISUAL PREVIEW
         ======================================================= */}
      <div
        style={{
          background: currentStage.bgGradient,
          borderRadius: '20px',
          border: `4px solid ${currentStage.borderColor}`,
          padding: '20px 15px 0 15px',
          boxShadow: lightsOn ? `0 0 35px ${currentStage.lightGlow}` : 'none',
          filter: lightsOn ? 'brightness(105%)' : 'brightness(65%)',
          transition: 'all 0.4s ease',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* ટોપ તોરણ / લાઈટિંગ સજાવટ */}
        <div style={{ fontSize: '20px', letterSpacing: '4px', marginBottom: '18px' }}>
          {currentStage.topGarland}
        </div>

        {/* મધ્ય સ્ટેજ બેનર અને બંને બાજુના ડેકોરેશન પ્રોપ્સ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          
          <div style={{ fontSize: '34px' }}>{currentStage.leftProp}</div>

          <div style={{ flex: 1, backgroundColor: 'rgba(2, 6, 23, 0.82)', padding: '18px 14px', borderRadius: '16px', border: `2px solid ${currentStage.borderColor}` }}>
            <div style={{ fontSize: '32px', marginBottom: '6px' }}>{currentStage.centerIcon}</div>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>
              {customBannerText.trim() || currentStage.defaultTitle}
            </h2>
          </div>

          <div style={{ fontSize: '34px' }}>{currentStage.rightProp}</div>

        </div>

        {/* સ્ટેજનું ફ્લોર / પ્લેટફોર્મ */}
        <div style={{ height: '24px', backgroundColor: '#020617', margin: '0 -15px', borderTop: `3px solid ${currentStage.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94a3b8', letterSpacing: '2px', fontWeight: 'bold' }}>
          ★ MAIN EVENT STAGE PLATFORM ★
        </div>

      </div>

    </div>
  );
}

export default StageDecorate;
