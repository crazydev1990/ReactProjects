import React, { useState, useEffect } from 'react';

const Gmail = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ૧. પેજ લોડ થતાં જ આપોઆપ ડેટા લોડ થશે
  useEffect(() => {
    fetchStaticInboxData();
  }, []);

  // 📡 ૨. ૧૦૦% એરર-ફ્રી લોકલ અસિંક્રોનસ ડેટા લોડર
  const fetchStaticInboxData = async () => {
    try {
      setIsLoading(true);

      // રિયલ API ની જેમ જ કામ કરે તે માટે ૧ સેકન્ડનો હોલ્ડ આપ્યો છે
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 📥 અસલી ઇનબોક્સ જેવો જ શાનદાર પર્સનલ રેડી-મેડ ડેટા એરે
      const staticInbox = [
        { id: 1, sender: "Google Cloud Console", subject: "OAuth Client Setup Verified", snippet: "Your web application credentials have been successfully updated under client production logs. No external script required.", date: "Oct 29" },
        { id: 2, sender: "Vercel Deployment", subject: "Production Build Succeeded 🎉", snippet: "Your Single Page Application clone has been fully optimized, compiled and compiled into production build servers successfully.", date: "Oct 28" },
        { id: 3, sender: "GitHub Team", subject: "Security Alert: main repository fix", snippet: "We detected an interference from third party extensions on your local workspace. Run npm audit to clear standard dependencies.", date: "Oct 27" },
        { id: 4, sender: "LinkedIn Job Alerts", subject: "35+ New Frontend React Openings", snippet: "Hiring managers from top companies are looking for frontend engineering students skilled in React hooks and JavaScript ES6.", date: "Oct 26" },
        { id: 5, sender: "Netlify Support", subject: "Continuous Integration Active", snippet: "Your automated repository sync system has finished loading deployment configurations. Production URL is now live online.", date: "Oct 25" }
      ];

      setEmails(staticInbox);
    } catch (err) {
      console.error("Error loading inbox array:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', backgroundColor: '#f6f8fc', fontFamily: 'sans-serif', margin: 0, padding: 0, boxSizing: 'border-box' }}>
      
      {/* 🔍 ટોપ સર્ચ હેડર બાર (Gmail UI Look) */}
      <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '0 24px', justifyContent: 'space-between', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC2iksKHmkbCrpzUvT84-xbmsaHhp-WNTYP61atiQ3bg&s=10" alt="Gmail" style={{ height: '24px' }} />
        </div>
        <div style={{ flex: 1, maxWidth: '720px', margin: '0 40px', position: 'relative' }}>
          <input type="text" placeholder="Search mail" style={{ width: '100%', height: '46px', paddingLeft: '50px', borderRadius: '24px', border: 'none', backgroundColor: '#eaf1fb', fontSize: '16px', outline: 'none', color: '#1f1f1f', boxSizing: 'border-box' }} />
          <span style={{ position: 'absolute', left: '18px', top: '12px', fontSize: '18px', color: '#444746' }}>🔍</span>
        </div>
        <div style={{ width: '36px', height: '32px' }}></div>
      </div>

      {/* 📑 મેઈન સ્પ્લિટ લેઆઉટ કન્ટેનર */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* 📁 લેફ્ટ સાઇડબાર નેવિગેશન મેનુ */}
        <div style={{ width: '256px', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '4px', boxSizing: 'border-box' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '140px', padding: '14px 24px', margin: '4px 0 16px 12px', border: 'none', borderRadius: '16px', backgroundColor: '#c2e7ff', color: '#001d35', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            ✏️ Compose
          </button>
          <div style={{ display: 'flex', padding: '0 24px', height: '32px', backgroundColor: '#d3e3fd', color: '#041e49', fontWeight: 'bold', fontSize: '14px', borderRadius: '0 16px 16px 0', alignItems: 'center' }}>
            📥 Inbox <span style={{ marginLeft: 'auto', fontSize: '12px' }}>{emails.length}</span>
          </div>
          <div style={{ display: 'flex', padding: '0 24px', height: '32px', color: '#444746', fontSize: '14px' }}>⭐ Starred</div>
          <div style={{ display: 'flex', padding: '0 24px', height: '32px', color: '#444746', fontSize: '14px' }}>📤 Sent</div>
        </div>

        {/* 📥 સેન્ટર ઇનબોક્સ મેઈલ વિન્ડો */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '16px 16px 0 0', border: '1px solid #e0e0e0', overflow: 'hidden', marginRight: '16px', boxSizing: 'border-box' }}>
          
          {/* કેટેગરીઝ ટેબ્સ */}
          <div style={{ display: 'flex', height: '56px', borderBottom: '1px solid #f1f3f4', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '220px', padding: '0 24px', fontSize: '14px', fontWeight: 'bold', color: '#0b57d0', borderBottom: '3px solid #0b57d0', backgroundColor: '#e8f0fe' }}>
              📥 Primary
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '220px', padding: '0 24px', fontSize: '14px', fontWeight: 'bold', color: '#444746' }}>
              🏷️ Promotions
            </div>
          </div>

          {/* ✉️ ઈમેલ રો મેપિંગ કન્ટેનર */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {isLoading ? (
              <p style={{ textAlign: 'center', color: '#5f6368', marginTop: '100px', fontSize: '16px', fontWeight: '500' }}>
                ⚡ Syncing secure internal inbox pipeline arrays...
              </p>
            ) : (
              emails.map((mail) => (
                <div 
                  key={mail.id} 
                  style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 16px', borderBottom: '1px solid #f1f3f4', fontSize: '14px', color: '#202124', cursor: 'pointer', boxSizing: 'border-box' }} 
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f2f6fc'} 
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  <div style={{ width: '32px', color: '#c4c7c5' }}>⬜</div>
                  <div style={{ width: '32px', color: '#c4c7c5' }}>☆</div>
                  <div style={{ width: '168px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {mail.sender}
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 24px 0 12px' }}>
                    <span style={{ fontWeight: 'bold' }}>{mail.subject}</span>
                    <span style={{ color: '#5f6368' }}>— {mail.snippet}</span>
                  </div>
                  <div style={{ width: '80px', textAlign: 'right', fontSize: '12px', color: '#5f6368', fontWeight: '500' }}>
                    {mail.date}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Gmail;
