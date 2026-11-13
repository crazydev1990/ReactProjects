import React, { useState } from 'react';

function GoogleReviewRating() {
  // ૧. ત્રણ સાદા સ્ટેટ: નામ, સ્ટાર રેટિંગ, અને રિવ્યૂ લિસ્ટ
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');
  const [reviewList, setReviewList] = useState([]);

  // ૨. બટન દબાવતા નવો રિવ્યૂ ઉમેરવાનું ફંક્શન
  const handleAddReview = (e) => {
    e.preventDefault(); // પેજ રિલોડ થતું અટકાવે છે

    if (name === '' || message === '') {
      alert('Please enter your name and review!');
      return;
    }

    // નવો રિવ્યૂ ઓબ્જેક્ટ બનાવો
    const newReview = {
      id: Date.now(),
      userName: name,
      userStars: stars,
      userText: message
    };

    // જૂના લિસ્ટમાં નવો રિવ્યૂ ઉમેરો
    setReviewList([newReview, ...reviewList]);

    // ફોર્મ ખાલી કરો
    setName('');
    setMessage('');
    setStars(5);
  };

  return (
    <div style={{ maxWidth: '420px', margin: '20px auto', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '2px solid #3b82f6', fontFamily: 'Arial, sans-serif', color: '#1e293b' }}>
      
      <h2 style={{ textAlign: 'center', color: '#2563eb', margin: '0 0 15px 0' }}>
        Customer Reviews ⭐
      </h2>

      {/* ✍️ રિવ્યૂ લખવાનું સાદું ફોર્મ */}
      <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        
        {/* નામ માટે ઇનપુટ */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />

        {/* સ્ટાર પસંદ કરવા માટે ડ્રોપડાઉન */}
        <select
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
          <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
          <option value={3}>⭐⭐⭐ (3 Stars)</option>
          <option value={2}>⭐⭐ (2 Stars)</option>
          <option value={1}>⭐ (1 Star)</option>
        </select>

        {/* રિવ્યૂ લખવા માટે ટેક્સ્ટ બોક્સ */}
        <textarea
          rows="3"
          placeholder="Write your review here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />

        <button
          type="submit"
          style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Submit Review
        </button>

      </form>

      {/* 📋 યુઝરે નાખેલા રિવ્યૂ બતાવવાનો ભાગ */}
      <div>
        <h4 style={{ margin: '0 0 10px 0' }}>All Reviews ({reviewList.length})</h4>

        {reviewList.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '13px' }}>No reviews yet. Be the first to review!</p>
        ) : (
          reviewList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '5px' }}>
                <span>{item.userName}</span>
                <span style={{ color: '#eab308' }}>{'⭐'.repeat(item.userStars)}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>{item.userText}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default GoogleReviewRating;
