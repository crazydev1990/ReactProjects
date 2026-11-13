
import React, { useState } from 'react';

function PasswordValidator() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const minLength = 8;

  // Password Strength Checker
  function checkPasswordStrength(password) {
    if (!password) {
      return {
        label: 'Not Entered',
        color: '#999',
        width: '0%'
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        label: 'Weak',
        color: '#dc3545',
        width: '33%'
      };
    }

    if (score <= 4) {
      return {
        label: 'Average',
        color: '#ffc107',
        width: '66%'
      };
    }

    return {
      label: 'Strong',
      color: '#198754',
      width: '100%'
    };
  }

  const passwordStrength = checkPasswordStrength(newPassword);

  // Password Validation
  function validatePassword() {
    setMessage('');
    setStatus('');

    if (currentPassword.length < minLength) {
      setMessage('Current password must contain at least 8 characters!');
      setStatus('error');
      return;
    }

    if (newPassword.length < minLength) {
      setMessage('New password must contain at least 8 characters!');
      setStatus('error');
      return;
    }

    if (newPassword === currentPassword) {
      setMessage('New password must be different from current password!');
      setStatus('error');
      return;
    }

    if (confirmPassword.length < minLength) {
      setMessage('Confirm password must contain at least 8 characters!');
      setStatus('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New password and Confirm password do not match!');
      setStatus('error');
      return;
    }

    if (passwordStrength.label !== 'Strong') {
      setMessage('Please create a Strong password!');
      setStatus('error');
      return;
    }

    setMessage('Password validation successful!');
    setStatus('success');
  }

  function resetForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setStatus('');
    setShowPassword(false);
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '15px'
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '40px auto',
      padding: '25px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Arial'
    }}>

      <h2 style={{ textAlign: 'center' }}>
        Change Password
      </h2>

      <label>Current Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter current password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          setMessage('');
        }}
        style={inputStyle}
      />

      <label>New Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          setMessage('');
        }}
        style={inputStyle}
      />

      {/* Password Length */}
      <p style={{ marginTop: '-8px', fontSize: '13px' }}>
        Length: {newPassword.length} / Minimum: {minLength}
      </p>

      {/* Password Strength */}
      <div style={{ marginTop: '10px', marginBottom: '20px' }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '7px'
        }}>
          <strong>Password Strength</strong>

          <strong style={{ color: passwordStrength.color }}>
            {passwordStrength.label}
          </strong>
        </div>

        <div style={{
          width: '100%',
          height: '9px',
          background: '#e5e5e5',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: passwordStrength.width,
            height: '100%',
            background: passwordStrength.color,
            transition: '0.3s'
          }} />
        </div>
      </div>

      <label>Confirm New Password</label>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setMessage('');
        }}
        style={inputStyle}
      />

      {/* Live Password Matching */}
      {confirmPassword.length > 0 && (
        <p style={{
          color: newPassword === confirmPassword ? '#198754' : '#dc3545',
          fontSize: '14px'
        }}>
          {newPassword === confirmPassword
            ? '✓ Passwords Match'
            : '✕ Passwords Do Not Match'}
        </p>
      )}

      <label style={{ display: 'block', marginBottom: '20px' }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        {' '}Show Password
      </label>

      <button
        onClick={validatePassword}
        style={{
          width: '100%',
          padding: '12px',
          background: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Validate Password
      </button>

      <button
        onClick={resetForm}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '10px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Reset
      </button>

      {message && (
        <p style={{
          marginTop: '20px',
          padding: '12px',
          borderRadius: '6px',
          background: status === 'success' ? '#d1e7dd' : '#f8d7da',
          color: status === 'success' ? '#0f5132' : '#842029',
          textAlign: 'center'
        }}>
          {message}
        </p>
      )}

    </div>
  );
}

export default PasswordValidator;
