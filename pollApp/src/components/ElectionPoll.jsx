import React, { useState, useEffect } from 'react';

function ElectionPoll() {
  // ૧. વોટની ગણતરી અને યુઝરે વોટ આપ્યો છે કે નહીં તેનો સ્ટેટ
  const [votes, setVotes] = useState({ bjp: 0, congress: 0 });
  const [hasVoted, setHasVoted] = useState(false);

  // ૨. પેજ લોડ થાય ત્યારે જૂના સેવ થયેલા વોટ લાવવા
  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('poll_2027_votes'));
    const votedFlag = localStorage.getItem('user_has_voted_2027');

    if (savedVotes) setVotes(savedVotes);
    if (votedFlag === 'true') setHasVoted(true);
  }, []);

  // 🚀 ૩. વોટ આપવાનું સાદું ફંક્શન
  const handleVote = (party) => {
    if (hasVoted) {
      alert('You have already casted your vote!');
      return;
    }

    const updatedVotes = {
      ...votes,
      [party]: votes[party] + 1
    };

    setVotes(updatedVotes);
    setHasVoted(true);

    // બ્રાઉઝર મેમરીમાં વોટ સેવ કરો
    localStorage.setItem('poll_2027_votes', JSON.stringify(updatedVotes));
    localStorage.setItem('user_has_voted_2027', 'true');
  };

  // 🔄 ૪. પોલ રીસેટ કરવાનું ફંક્શન (ટેસ્ટિંગ માટે)
  const resetPoll = () => {
    localStorage.removeItem('poll_2027_votes');
    localStorage.removeItem('user_has_voted_2027');
    setVotes({ bjp: 0, congress: 0 });
    setHasVoted(false);
  };

  // કુલ વોટ અને ટકાવારી (Percentage) ની ગણતરી
  const totalVotes = votes.bjp + votes.congress;
  const bjpPercent = totalVotes === 0 ? 0 : Math.round((votes.bjp / totalVotes) * 100);
  const congressPercent = totalVotes === 0 ? 0 : Math.round((votes.congress / totalVotes) * 100);

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', padding: '25px', backgroundColor: '#0f172a', borderRadius: '20px', border: '2px solid #38bdf8', color: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      
      <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Opinion Poll 2027 🗳️</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#94a3b8' }}>
        Cast your vote to see live percentage results
      </p>

      {/* ૧. BJP ઓપ્શન કાર્ડ */}
      <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px solid #f97316', marginBottom: '15px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <strong style={{ fontSize: '16px', color: '#fb923c' }}>🪷 BJP</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>Bharatiya Janata Party</span>
          </div>
          <button
            onClick={() => handleVote('bjp')}
            disabled={hasVoted}
            style={{ padding: '8px 18px', backgroundColor: hasVoted ? '#334155' : '#f97316', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: hasVoted ? 'not-allowed' : 'pointer' }}
          >
            {hasVoted ? 'Voted' : 'Vote 👆'}
          </button>
        </div>

        {/* BJP Live Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span>Votes: {votes.bjp}</span>
          <strong style={{ color: '#fb923c' }}>{bjpPercent}%</strong>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#1e293b', borderRadius: '4px' }}>
          <div style={{ width: `${bjpPercent}%`, height: '100%', backgroundColor: '#f97316', borderRadius: '4px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* ૨. Congress ઓપ્શન કાર્ડ */}
      <div style={{ backgroundColor: '#020617', padding: '15px', borderRadius: '14px', border: '1px solid #38bdf8', marginBottom: '20px', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <strong style={{ fontSize: '16px', color: '#38bdf8' }}>✋ Congress</strong>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>Indian National Congress</span>
          </div>
          <button
            onClick={() => handleVote('congress')}
            disabled={hasVoted}
            style={{ padding: '8px 18px', backgroundColor: hasVoted ? '#334155' : '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: hasVoted ? 'not-allowed' : 'pointer' }}
          >
            {hasVoted ? 'Voted' : 'Vote 👆'}
          </button>
        </div>

        {/* Congress Live Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span>Votes: {votes.congress}</span>
          <strong style={{ color: '#38bdf8' }}>{congressPercent}%</strong>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: '#1e293b', borderRadius: '4px' }}>
          <div style={{ width: `${congressPercent}%`, height: '100%', backgroundColor: '#38bdf8', borderRadius: '4px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* કુલ વોટ અને Reset બટન */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b', paddingTop: '12px', fontSize: '13px', color: '#94a3b8' }}>
        <span>Total Votes Casted: <strong style={{ color: '#fff' }}>{totalVotes}</strong></span>
        <button
          onClick={resetPoll}
          style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          🔄 Reset Poll
        </button>
      </div>

    </div>
  );
}

export default ElectionPoll;
