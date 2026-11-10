import React from 'react';

// Arrow ફંક્શનની મદદથી કમ્પોનન્ટ
const Logo = () => {
  return (
<>
<span style={{ display: 'inline-flex', verticalAlign: 'middle', marginRight: '12px' }}>
      <svg 
        xmlns="http://w3.org" 
        viewBox="0 0 24 24" 
        width="34px" 
        height="34px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="none" />
        <path d="M4 20h3V11L2 7.5V18c0 1.1.9 2 2 2z" fill="#4285F4" />
        <path d="M20 20h3c1.1 0 2-.9 2-2V7.5L20 11v9z" fill="#34A853" />
        <path d="M2 7.5V6c0-1.1.9-2 2-2h3v3.5L2 7.5z" fill="#EA4335" />
        <path d="M22 7.5L17 4h3c1.1 0 2 .9 2 2v1.5z" fill="#EA4335" />
        <path d="M12 14L2 6.5V9l10 7.5L22 9V6.5L12 14z" fill="#EA4335" />
        <path d="M17 4h3v3.5L22 6c0-1.1-.9-2-2-2h-3v3.5z" fill="#FBBC05" />
        <path d="M7 4H4c-1.1 0-2 .9-2 2v1.5L7 4z" fill="#FBBC05" />
      </svg>
    </span>
</>
  );
};

export default Logo;
