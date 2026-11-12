
import React, { useState } from 'react';

function GetCurrentLoc() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLocation = async () => {
    setLoading(true);
    setError('');
    setLocation(null);

    try {
      const response = await fetch('https://ipwho.is/');

      if (!response.ok) {
        throw new Error('Location service is unavailable.');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Unable to detect location.');
      }

      setLocation({
        ip: data.ip,
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        region: data.region,
        country: data.country,
        postal: data.postal,
        timezone: data.timezone?.id,
        isp: data.connection?.isp
      });

    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const mapUrl = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.02}%2C${location.latitude - 0.02}%2C${location.longitude + 0.02}%2C${location.latitude + 0.02}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`
    : '';

  return (
    <div style={styles.container}>
      <h2>IP Location Finder</h2>

      <p>
        Find your approximate location using IPWho.is
        and OpenStreetMap.
      </p>

      <button
        onClick={getLocation}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Finding Location...' : 'Get My Location'}
      </button>

      {error && (
        <p style={styles.error}>{error}</p>
      )}

      {location && (
        <div style={styles.result}>
          <h3>Location Details</h3>

          <p><b>IP Address:</b> {location.ip}</p>
          <p><b>City:</b> {location.city}</p>
          <p><b>Region:</b> {location.region}</p>
          <p><b>Country:</b> {location.country}</p>
          <p><b>Postal Code:</b> {location.postal || 'Not available'}</p>
          <p><b>Latitude:</b> {location.latitude}</p>
          <p><b>Longitude:</b> {location.longitude}</p>
          <p><b>Timezone:</b> {location.timezone}</p>
          <p><b>ISP:</b> {location.isp}</p>

          <h3>OpenStreetMap</h3>

          <iframe
            title="IP Location Map"
            src={mapUrl}
            width="100%"
            height="400"
            style={styles.map}
            loading="lazy"
          />

          <a
            href={`https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=15/${location.latitude}/${location.longitude}`}
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Open Full Map
          </a>

          <p style={styles.note}>
            Note: This is an approximate IP-based location.
            It may show your ISP's network location instead
            of your actual device location.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '30px auto',
    padding: '25px',
    fontFamily: 'Arial, sans-serif',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.1)'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '7px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  result: {
    marginTop: '25px',
    padding: '15px',
    background: '#f8fafc',
    borderRadius: '8px',
    overflowWrap: 'anywhere'
  },
  map: {
    border: 0,
    borderRadius: '8px',
    marginTop: '10px'
  },
  link: {
    display: 'inline-block',
    marginTop: '15px',
    color: '#2563eb',
    fontWeight: 'bold'
  },
  error: {
    color: '#dc2626',
    marginTop: '15px'
  },
  note: {
    color: '#92400e',
    background: '#fff7ed',
    padding: '12px',
    borderRadius: '6px',
    lineHeight: 1.5
  }
};

export default GetCurrentLoc;
