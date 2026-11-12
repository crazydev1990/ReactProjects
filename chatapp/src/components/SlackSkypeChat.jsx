import React, { useState, useEffect } from 'react';

function SlackSkypeChat() {
  // ૧. ડાબી બાજુના Channels અને Direct Messages નું સાદું લિસ્ટ
  const rooms = [
    { id: 'general', name: '# general', type: 'Channel' },
    { id: 'react-help', name: '# react-help', type: 'Channel' },
    { id: 'rahul', name: '🟢 Rahul (Skype)', type: 'Direct Message' },
    { id: 'priya', name: '🟡 Priya (Skype)', type: 'Direct Message' }
  ];

  // ૨. સ્ટેટ મેનેજર્સ
  const [activeRoom, setActiveRoom] = useState('general');
  const [myName, setMyName] = useState('Me');
  const [allChats, setAllChats] = useState({});
  const [inputText, setInputText] = useState('');

  // ૩. જૂની ચેટ લોડ કરવા અને બીજા ટૅબમાં મેસેજ આવે તો લાઈવ અપડેટ કરવા
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('slack_skype_chats')) || {};
    setAllChats(saved);

    const syncTabs = () => {
      const updated = JSON.parse(localStorage.getItem('slack_skype_chats')) || {};
      setAllChats(updated);
    };

    window.addEventListener('storage', syncTabs);
    return () => window.removeEventListener('storage', syncTabs);
  }, []);

  // 🚀 ૪. નવો મેસેજ મોકલવાનું સાદું ફંક્શન
  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: myName,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentRoomMsgs = allChats[activeRoom] || [];
    const updatedChats = {
      ...allChats,
      [activeRoom]: [...currentRoomMsgs, newMsg]
    };

    setAllChats(updatedChats);
    localStorage.setItem('slack_skype_chats', JSON.stringify(updatedChats));
    setInputText('');
  };

  // હાલની પસંદ કરેલી ચેનલના મેસેજ મેળવો
  const currentMessages = allChats[activeRoom] || [];
  const activeRoomInfo = rooms.find((r) => r.id === activeRoom);

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', backgroundColor: '#0f172a', borderRadius: '18px', border: '2px solid #38bdf8', color: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', overflow: 'hidden', minHeight: '430px' }}>
      
      {/* 🟪 ડાબી બાજુ: Slack / Skype Sidebar */}
      <div style={{ width: '210px', backgroundColor: '#1e1b4b', padding: '18px 12px', borderRight: '1px solid #312e81', textAlign: 'left' }}>
        <h3 style={{ margin: '0 0 12px 6px', color: '#38bdf8', fontSize: '17px' }}>Team Chat 💬</h3>

        {/* તમારું નામ બદલવા માટે */}
        <div style={{ marginBottom: '18px', padding: '0 6px' }}>
          <label style={{ fontSize: '10px', color: '#a5b4fc', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
            YOUR DISPLAY NAME:
          </label>
          <input
            type="text"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #4338ca', backgroundColor: '#0f172a', color: '#4ade80', fontSize: '12px', fontWeight: 'bold', boxSizing: 'border-box' }}
          />
        </div>

        {/* Channels અને DMs બટનો */}
        <div style={{ fontSize: '11px', color: '#818cf8', fontWeight: 'bold', margin: '0 0 8px 6px' }}>
          CHANNELS & CONTACTS
        </div>
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setActiveRoom(room.id)}
            style={{
              padding: '9px 10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              marginBottom: '5px',
              fontWeight: activeRoom === room.id ? 'bold' : 'normal',
              backgroundColor: activeRoom === room.id ? '#4f46e5' : 'transparent',
              color: activeRoom === room.id ? '#fff' : '#c7d2fe'
            }}
          >
            {room.name}
          </div>
        ))}
      </div>

      {/* 💬 જમણી બાજુ: Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#020617' }}>
        
        {/* Chat Top Bar */}
        <div style={{ padding: '14px 18px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ textAlign: 'left' }}>
            <strong style={{ color: '#38bdf8', fontSize: '15px', display: 'block' }}>{activeRoomInfo.name}</strong>
            <span style={{ fontSize: '11px', color: '#64748b' }}>{activeRoomInfo.type}</span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('slack_skype_chats');
              setAllChats({});
            }}
            style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}
          >
            Clear All
          </button>
        </div>

        {/* Messages Screen */}
        <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px' }}>
          {currentMessages.length === 0 ? (
            <div style={{ color: '#475569', fontSize: '13px', margin: 'auto' }}>
              No messages in {activeRoomInfo.name}. Say Hello! 👋
            </div>
          ) : (
            currentMessages.map((msg) => {
              const isMe = msg.sender === myName;
              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    backgroundColor: isMe ? '#2563eb' : '#1e293b',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '75%',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '10px', color: '#cbd5e1', marginBottom: '3px', fontWeight: 'bold' }}>
                    {msg.sender} • {msg.time}
                  </div>
                  <div style={{ fontSize: '14px', color: '#fff' }}>{msg.text}</div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Input Box */}
        <form onSubmit={sendMessage} style={{ padding: '12px', backgroundColor: '#0f172a', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeRoomInfo.name}...`}
            style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#020617', color: '#fff', fontSize: '13.5px', outline: 'none' }}
          />
          <button
            type="submit"
            style={{ padding: '10px 18px', backgroundColor: '#22c55e', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Send 🚀
          </button>
        </form>

      </div>

    </div>
  );
}

export default SlackSkypeChat;
