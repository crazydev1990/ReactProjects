import React from 'react';

const ProfilePage = (props) => {
  const { user } = props; // ફંક્શનની અંદર props નું ડેસ્ટ્રક્ચરિંગ
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>My Profile</h3>
      <p>Username: <b>{user || "Guest"}</b></p>
    </div>
  );
};

export default ProfilePage;
