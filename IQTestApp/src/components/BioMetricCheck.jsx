
import React, { useState } from 'react';

function BiometricCheck() {

  const [checks, setChecks] = useState({
    fingerprint: 'Not Started',
    speech: 'Not Started',
    eye: 'Not Started',
    heartbeat: 'Not Started'
  });

  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('Please start biometric verification');
  const [result, setResult] = useState('');

  const sensors = [
    {
      id: 'fingerprint',
      name: 'Fingerprint Match',
      icon: '👆',
      description: 'Scan your fingerprint'
    },
    {
      id: 'speech',
      name: 'Speech Recognition',
      icon: '🎤',
      description: 'Verify your voice'
    },
    {
      id: 'eye',
      name: 'Eye Verification',
      icon: '👁️',
      description: 'Scan your eyes'
    },
    {
      id: 'heartbeat',
      name: 'Heartbeat Match',
      icon: '❤️',
      description: 'Check heartbeat pattern'
    }
  ];

  // Delay function
  function wait(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  // Beep sound alert
  function playBeep() {

    try {

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      const audio = new AudioContextClass();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = 800;

      gain.gain.value = 0.3;

      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        audio.close();
      }, 500);

    } catch (error) {
      console.log('Beep sound is not supported');
    }

  }

  // Scan single sensor
  async function scanSensor(sensorId) {

    if (isRunning) {
      return;
    }

    setChecks((previous) => ({
      ...previous,
      [sensorId]: 'Scanning...'
    }));

    setMessage('Scanning ' + sensorId + '...');
    setResult('');

    await wait(1500);

    const isMatched = Math.random() > 0.25;

    const newStatus = isMatched ? 'Matched' : 'Failed';

    setChecks((previous) => ({
      ...previous,
      [sensorId]: newStatus
    }));

    if (!isMatched) {
      setMessage(sensorId + ' verification failed!');
      setResult('failed');
      playBeep();
    } else {
      setMessage(sensorId + ' matched successfully!');
    }

  }

  // Scan all four sensors
  async function scanAllSensors() {

    setIsRunning(true);
    setResult('');
    setMessage('Biometric scanning started...');

    const newChecks = {
      fingerprint: 'Not Started',
      speech: 'Not Started',
      eye: 'Not Started',
      heartbeat: 'Not Started'
    };

    setChecks(newChecks);

    const sensorIds = [
      'fingerprint',
      'speech',
      'eye',
      'heartbeat'
    ];

    let allMatched = true;

    for (let i = 0; i < sensorIds.length; i++) {

      const sensorId = sensorIds[i];

      newChecks[sensorId] = 'Scanning...';

      setChecks({ ...newChecks });

      setMessage('Scanning ' + sensorId + '...');

      await wait(1500);

      const isMatched = Math.random() > 0.25;

      newChecks[sensorId] = isMatched ? 'Matched' : 'Failed';

      if (!isMatched) {
        allMatched = false;
      }

      setChecks({ ...newChecks });

    }

    if (allMatched) {

      setResult('success');
      setMessage('All biometric checks matched successfully!');

    } else {

      setResult('failed');
      setMessage('Biometric verification failed! Access Denied.');
      playBeep();

    }

    setIsRunning(false);

  }

  // Final verification
  function verifyAll() {

    const allMatched =
      checks.fingerprint === 'Matched' &&
      checks.speech === 'Matched' &&
      checks.eye === 'Matched' &&
      checks.heartbeat === 'Matched';

    if (allMatched) {

      setResult('success');
      setMessage('All biometric checks matched! Access Granted.');

    } else {

      setResult('failed');
      setMessage('Verification failed! All four checks must match.');
      playBeep();

    }

  }

  // Reset all checks
  function resetChecks() {

    setChecks({
      fingerprint: 'Not Started',
      speech: 'Not Started',
      eye: 'Not Started',
      heartbeat: 'Not Started'
    });

    setResult('');
    setMessage('Please start biometric verification');

  }

  // Status color
  function getStatusColor(status) {

    if (status === 'Matched') {
      return '#16a34a';
    }

    if (status === 'Failed') {
      return '#dc2626';
    }

    if (status === 'Scanning...') {
      return '#2563eb';
    }

    return '#64748b';

  }

  return (

    <div style={styles.container}>

      <h1>🔐 Biometric Security System</h1>

      <p style={styles.subtitle}>
        Multi-Biometric Verification Demo
      </p>

      <div style={styles.sensorGrid}>

        {sensors.map((sensor) => (

          <div key={sensor.id} style={styles.sensorCard}>

            <div style={styles.sensorIcon}>
              {sensor.icon}
            </div>

            <h3>{sensor.name}</h3>

            <p>{sensor.description}</p>

            <div
              style={{
                ...styles.status,
                background: getStatusColor(checks[sensor.id])
              }}
            >
              {checks[sensor.id]}
            </div>

            <button
              style={styles.scanButton}
              onClick={() => scanSensor(sensor.id)}
              disabled={isRunning}
            >
              Scan Sensor
            </button>

          </div>

        ))}

      </div>

      <div style={styles.buttons}>

        <button
          style={styles.startButton}
          onClick={scanAllSensors}
          disabled={isRunning}
        >
          {isRunning ? 'Scanning...' : '▶ Scan All Sensors'}
        </button>

        <button
          style={styles.verifyButton}
          onClick={verifyAll}
          disabled={isRunning}
        >
          ✓ Verify All
        </button>

        <button
          style={styles.resetButton}
          onClick={resetChecks}
          disabled={isRunning}
        >
          ↻ Reset
        </button>

      </div>

      <div
        style={{
          ...styles.resultBox,
          borderColor:
            result === 'success'
              ? '#16a34a'
              : result === 'failed'
              ? '#dc2626'
              : '#64748b'
        }}
      >

        {result === 'success' && (
          <div style={styles.successIcon}>✅</div>
        )}

        {result === 'failed' && (
          <div style={styles.failedIcon}>🚨</div>
        )}

        <h3>{message}</h3>

        {result === 'success' && (
          <h2 style={{ color: '#16a34a' }}>
            ACCESS GRANTED
          </h2>
        )}

        {result === 'failed' && (
          <h2 style={{ color: '#dc2626' }}>
            ACCESS DENIED
          </h2>
        )}

      </div>

      <p style={styles.note}>
        Demo only. No real biometric data is collected.
      </p>

    </div>

  );

}

const styles = {

  container: {
    minHeight: '100vh',
    padding: '25px',
    boxSizing: 'border-box',
    background: '#101827',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
  },

  subtitle: {
    color: '#94a3b8',
    marginBottom: '30px'
  },

  sensorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: 'auto'
  },

  sensorCard: {
    background: '#1e293b',
    padding: '22px',
    borderRadius: '15px',
    border: '1px solid #334155'
  },

  sensorIcon: {
    fontSize: '45px',
    marginBottom: '10px'
  },

  status: {
    color: 'white',
    padding: '9px',
    borderRadius: '7px',
    margin: '15px 0',
    fontWeight: 'bold'
  },

  scanButton: {
    width: '100%',
    padding: '11px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer'
  },

  buttons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    margin: '30px 0'
  },

  startButton: {
    padding: '13px 22px',
    background: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },

  verifyButton: {
    padding: '13px 22px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },

  resetButton: {
    padding: '13px 22px',
    background: '#475569',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },

  resultBox: {
    maxWidth: '650px',
    margin: 'auto',
    padding: '22px',
    background: '#1e293b',
    border: '2px solid',
    borderRadius: '12px'
  },

  successIcon: {
    fontSize: '45px'
  },

  failedIcon: {
    fontSize: '45px'
  },

  note: {
    color: '#94a3b8',
    fontSize: '12px',
    marginTop: '25px'
  }

};

export default BiometricCheck;
