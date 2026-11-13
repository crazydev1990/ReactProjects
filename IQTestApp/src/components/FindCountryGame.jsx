
import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import worldCountries from 'world-countries';

function FindCountryGame() {

  const globeRef = useRef();

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [message, setMessage] = useState('Search for a country');

  const [globeWidth, setGlobeWidth] = useState(650);

  const countries = worldCountries
  .filter((country) => country.latlng && country.latlng.length === 2)
  .map((country) => ({
    name: country.name.common,
    lat: country.latlng[0],
    lng: country.latlng[1],
    hint: 'Find ' + country.name.common + ' on the globe'
  }));
  // Globe ready થયા પછી rotation શરૂ કરો
  useEffect(() => {

    if (globeRef.current) {
      globeRef.current.controls().autoRotate = isRotating;
      globeRef.current.controls().autoRotateSpeed = 0.8;
    }

  }, [isRotating]);

  // Screen પ્રમાણે globe width
  useEffect(() => {

    function updateWidth() {
      setGlobeWidth(
        Math.max(280, Math.min(650, window.innerWidth - 40))
      );
    }

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };

  }, []);

  // Search Country


function findCountry() {

  const searchText = search.trim().toLowerCase();

  if (searchText === '') {
    setMessage('Please enter a country or continent name!');
    return;
  }

  // Country aliases
  const countryAliases = {

    // United States
    'usa': 'United States',
    'us': 'United States',
    'america': 'United States',
    'united states of america': 'United States',

    // United Kingdom
    'uk': 'United Kingdom',
    'britain': 'United Kingdom',
    'great britain': 'United Kingdom',
    'england': 'United Kingdom',

    // United Arab Emirates
    'uae': 'United Arab Emirates',
    'emirates': 'United Arab Emirates',

    // Korea
    'korea': 'South Korea',
    'south korea': 'South Korea',
    'republic of korea': 'South Korea',
    'north korea': 'North Korea',
    'dprk': 'North Korea',
    'democratic people republic of korea': 'North Korea',

    // Other countries
    'russia': 'Russia',
    'bharat': 'India',
    'holland': 'Netherlands',
    'turkey': 'Türkiye',
    'ivory coast': 'Côte d’Ivoire',
    'czech republic': 'Czechia',
    'vatican': 'Vatican City'
  };

  // Continent locations
  const continents = {

    'africa': {
      name: 'Africa',
      lat: 0,
      lng: 20,
      hint: 'The second-largest continent'
    },

    'asia': {
      name: 'Asia',
      lat: 34,
      lng: 100,
      hint: 'The largest continent'
    },

    'europe': {
      name: 'Europe',
      lat: 54,
      lng: 15,
      hint: 'A continent with many historic countries'
    },

    'north america': {
      name: 'North America',
      lat: 45,
      lng: -100,
      hint: 'Home to the USA and Canada'
    },

    'south america': {
      name: 'South America',
      lat: -15,
      lng: -60,
      hint: 'Home to the Amazon rainforest'
    },

    'antarctica': {
      name: 'Antarctica',
      lat: -82,
      lng: 0,
      hint: 'The coldest continent'
    },

    'oceania': {
      name: 'Oceania',
      lat: -25,
      lng: 135,
      hint: 'Includes Australia and Pacific islands'
    }
  };

  // Check continent
  if (continents[searchText]) {

    const continent = continents[searchText];

    setSelectedCountry(continent);
    setIsRotating(false);
    setMessage('Continent found: ' + continent.name);

    if (globeRef.current) {

      globeRef.current.controls().autoRotate = false;

      globeRef.current.pointOfView({
        lat: continent.lat,
        lng: continent.lng,
        altitude: 1.5
      }, 1800);

    }

    return;
  }

  // Get country name from aliases
  const countryName = countryAliases[searchText] || searchText;

  // Find country
  const country = countries.find(
    (item) => item.name.toLowerCase() === countryName.toLowerCase()
  );

  // If country not found
  if (!country) {

    setSelectedCountry(null);
    setMessage('Country or continent not found!');

    return;
  }

  // Country found
  setSelectedCountry(country);
  setIsRotating(false);
  setMessage('Location found: ' + country.name);

  // Move globe to country
  if (globeRef.current) {

    globeRef.current.controls().autoRotate = false;

    globeRef.current.pointOfView({
      lat: country.lat,
      lng: country.lng,
      altitude: 1.8
    }, 1800);

  }

}

  // Start Globe Rotation
  function startRotation() {

    setSelectedCountry(null);
    setIsRotating(true);
    setMessage('Globe is rotating...');

  }

  // Country points
  const pointsData = selectedCountry ? [selectedCountry] : [];

  return (

    <div style={styles.container}>

      <h2>🌍 Find Country on 3D Globe</h2>

      <p style={styles.description}>
        Search a country and watch the globe move to its location.
      </p>

      <div style={styles.searchBox}>

        <input
          type="text"
          placeholder="Enter country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              findCountry();
            }
          }}
          style={styles.input}
        />

        <button
          onClick={findCountry}
          style={styles.searchButton}
        >
          Search
        </button>

      </div>

      <div style={styles.globeContainer}>

        <Globe
          ref={globeRef}

          width={globeWidth}
          height={500}

          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"

          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"

          backgroundColor="#101827"

          showAtmosphere={true}
          atmosphereColor="#4da6ff"
          atmosphereAltitude={0.2}

          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointColor={() => '#ff3333'}
          pointAltitude={0.08}
          pointRadius={0.6}

          labelsData={pointsData}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={1.5}
          labelColor={() => '#ffffff'}
          labelDotRadius={0.4}

          onGlobeReady={() => {

            if (globeRef.current) {
              globeRef.current.controls().autoRotate = isRotating;
              globeRef.current.controls().autoRotateSpeed = 0.8;
            }

          }}

        />

      </div>

      <div style={styles.controls}>

        <button
          onClick={startRotation}
          style={styles.rotateButton}
        >
          🔄 Rotate Globe
        </button>

      </div>

      <p style={styles.message}>
        {message}
      </p>

      {selectedCountry && (

        <div style={styles.result}>

          <h3>📍 {selectedCountry.name}</h3>

          <p>
            <strong>Hint:</strong> {selectedCountry.hint}
          </p>

          <p>
            <strong>Latitude:</strong> {selectedCountry.lat}
          </p>

          <p>
            <strong>Longitude:</strong> {selectedCountry.lng}
          </p>

        </div>

      )}

      <p style={styles.note}>
        Available countries: {countries.length}
      </p>

    </div>

  );

}

const styles = {

  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    textAlign: 'center',
    background: '#101827',
    color: 'white',
    fontFamily: 'Arial, sans-serif'
  },

  description: {
    color: '#cbd5e1'
  },

  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    margin: '20px auto'
  },

  input: {
    width: '250px',
    maxWidth: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #64748b',
    fontSize: '16px'
  },

  searchButton: {
    padding: '12px 22px',
    border: 'none',
    borderRadius: '8px',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },

  globeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden'
  },

  controls: {
    marginTop: '15px'
  },

  rotateButton: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    background: '#16a34a',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },

  message: {
    marginTop: '20px',
    color: '#facc15',
    fontSize: '17px'
  },

  result: {
    maxWidth: '350px',
    margin: '20px auto',
    padding: '15px',
    background: '#1e293b',
    borderRadius: '12px',
    textAlign: 'left'
  },

  note: {
    color: '#94a3b8',
    fontSize: '13px'
  }

};

export default FindCountryGame;
