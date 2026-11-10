import React, { useState, useEffect } from 'react';

const NetFlix = () => {

  // TMDB API Configuration
  // અહીં તમારી નવી TMDB API Key નાખો.
  const TMDB_API_KEY = '4694acbce05f65e0d12d3f4f6c073c21';

  const API_URL = 'https://api.themoviedb.org/3';
  const IMAGE_URL = 'https://image.tmdb.org/t/p';

  // States
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedShow, setSelectedShow] = useState(null);

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const [playVideo, setPlayVideo] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =====================================
  // 1. Trending Shows + Search API
  // =====================================

  useEffect(() => {

    if (
      !TMDB_API_KEY ||
      TMDB_API_KEY === 'YOUR_NEW_TMDB_API_KEY'
    ) {
      setError('Please provide a valid TMDB API Key!');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError('');

    const delayDebounce = setTimeout(async () => {

      try {

        let fetchUrl;

        if (searchQuery.trim()) {

          // Search TV Shows API
          fetchUrl =
            `${API_URL}/search/tv` +
            `?query=${encodeURIComponent(searchQuery.trim())}` +
            `&api_key=${TMDB_API_KEY}` +
            `&language=en-US`;

        } else {

          // Trending TV Shows API
          fetchUrl =
            `${API_URL}/trending/tv/week` +
            `?api_key=${TMDB_API_KEY}` +
            `&language=en-US`;

        }

        const response = await fetch(fetchUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        setShows(data.results || []);

      } catch (err) {

        if (err.name !== 'AbortError') {
          setError('Error Fetching Shows: ' + err.message);
          setShows([]);
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }

    }, 300);

    // Cleanup: Clear timer and cancel old request
    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };

  }, [searchQuery]);


  // =====================================
  // 2. Selected Show Trailer API
  // =====================================

  useEffect(() => {

    if (!selectedShow) {
      setTrailerKey('');
      return;
    }

    const controller = new AbortController();

    const fetchTrailer = async () => {

      try {

        setTrailerKey('');

        const fetchUrl =
          `${API_URL}/tv/${selectedShow.id}/videos` +
          `?api_key=${TMDB_API_KEY}` +
          `&language=en-US`;

        const response = await fetch(fetchUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Trailer API Error: ${response.status}`);
        }

        const data = await response.json();

        // Find official YouTube trailer
        const trailer = data.results?.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official === true
        ) || data.results?.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer'
        );

        setTrailerKey(trailer?.key || '');

      } catch (err) {

        if (err.name !== 'AbortError') {
          console.error('Trailer Error:', err.message);
        }

      }

    };

    fetchTrailer();

    return () => controller.abort();

  }, [selectedShow]);


  // =====================================
  // 3. Select Show
  // =====================================

  const handleShowSelect = (show) => {

    setSelectedShow(show);

    setSeason(1);
    setEpisode(1);

    setPlayVideo(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };


  // =====================================
  // 4. Close Selected Show
  // =====================================

  const handleCloseShow = () => {

    setSelectedShow(null);
    setPlayVideo(false);

    setSeason(1);
    setEpisode(1);

  };


  // =====================================
  // 5. Render UI
  // =====================================

  return (

    <div
      style={{
        backgroundColor: '#141414',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '30px',
          borderBottom: '1px solid #222',
          paddingBottom: '20px'
        }}
      >

        <h1
          style={{
            color: '#E50914',
            margin: 0,
            fontSize: '32px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
          onClick={() => {
            setSearchQuery('');
            handleCloseShow();
          }}
        >
          🍿 NETFLIX LIVE HUB
        </h1>


        {/* Search Input */}

        <div style={{ maxWidth: '500px', width: '100%' }}>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedShow(null);
              setPlayVideo(false);
            }}
            placeholder="Search TV Shows... (e.g. Wednesday)"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '6px',
              border: '1px solid #333',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

        </div>

      </header>


      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (

        <p
          style={{
            color: '#00e5ff',
            textAlign: 'center'
          }}
        >
          ⚡ Server Data is Syncing...
        </p>

      )}


      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (

        <p
          style={{
            color: '#ff4d4d',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          ❌ {error}
        </p>

      )}


      {/* ================================= */}
      {/* SELECTED SHOW DETAILS */}
      {/* ================================= */}

      {selectedShow && !playVideo && (

        <div
          style={{
            backgroundImage: selectedShow.backdrop_path
              ? `
                linear-gradient(
                  to right,
                  #141414 45%,
                  transparent 100%
                ),
                url(${IMAGE_URL}/original${selectedShow.backdrop_path})
              `
              : 'linear-gradient(to right, #141414, #333)',

            backgroundSize: 'cover',
            backgroundPosition: 'center',

            padding: '40px',
            borderRadius: '12px',
            marginBottom: '40px',
            minHeight: '350px',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            border: '1px solid #333',
            boxShadow: '0 8px 24px rgba(0,0,0,0.7)'
          }}
        >

          <h2
            style={{
              fontSize: '38px',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}
          >
            {selectedShow.name || selectedShow.original_name}
          </h2>


          {/* Rating and Date */}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              color: '#46d369',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}
          >

            <span>
              ★ Rating: {selectedShow.vote_average?.toFixed(1)}
            </span>

            <span style={{ color: '#aaa' }}>
              {selectedShow.first_air_date}
            </span>

            <span
              style={{
                border: '1px solid #aaa',
                padding: '0 5px',
                fontSize: '12px',
                color: '#aaa',
                borderRadius: '3px'
              }}
            >
              ID: {selectedShow.id}
            </span>

          </div>


          {/* Overview */}

          <p
            style={{
              maxWidth: '650px',
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#cca',
              margin: '0 0 25px 0'
            }}
          >
            {selectedShow.overview ||
              'No Story Details For This Show.'}
          </p>


          {/* Season and Episode */}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              marginBottom: '20px'
            }}
          >

            <label>
              Season:

              <input
                type="number"
                min="1"
                value={season}
                onChange={(e) =>
                  setSeason(
                    Math.max(1, parseInt(e.target.value, 10) || 1)
                  )
                }
                style={{
                  width: '60px',
                  padding: '7px',
                  marginLeft: '5px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: '4px'
                }}
              />

            </label>


            <label>
              Episode:

              <input
                type="number"
                min="1"
                value={episode}
                onChange={(e) =>
                  setEpisode(
                    Math.max(1, parseInt(e.target.value, 10) || 1)
                  )
                }
                style={{
                  width: '60px',
                  padding: '7px',
                  marginLeft: '5px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: '4px'
                }}
              />

            </label>

          </div>


          {/* Buttons */}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px'
            }}
          >

            <button
              onClick={() => setPlayVideo(true)}
              style={{
                padding: '12px 35px',
                fontSize: '17px',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              ▶ Play Trailer
            </button>


            <button
              onClick={handleCloseShow}
              style={{
                padding: '12px 25px',
                fontSize: '17px',
                fontWeight: 'bold',
                backgroundColor: 'rgba(109,109,110,0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* ================================= */}
      {/* VIDEO PLAYER */}
      {/* ================================= */}

      {playVideo && selectedShow && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          {/* Player Header */}

          <div
            style={{
              padding: '15px 20px',
              backgroundColor: '#141414',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #333'
            }}
          >

            <button
              onClick={() => setPlayVideo(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#E50914',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← Back to Overview
            </button>


            <span style={{ fontWeight: 'bold', color: '#aaa' }}>
              {selectedShow.name}
              {' '} | Season {season}, Episode {episode}
            </span>


            <button
              onClick={() => setEpisode(prev => prev + 1)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Next Episode ⏭️
            </button>

          </div>


          {/* Official YouTube Trailer */}

          {trailerKey ? (

            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
              style={{
                width: '100%',
                flex: 1,
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Official TV Show Trailer"
            />

          ) : (

            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px',
                color: '#fff'
              }}
            >

              <div>

                <h2>Trailer Not Available</h2>

                <p style={{ color: '#aaa' }}>
                  TMDB does not have an official YouTube trailer
                  available for this show.
                </p>

              </div>

            </div>

          )}

        </div>

      )}


      {/* ================================= */}
      {/* SHOW GRID */}
      {/* ================================= */}

      <h3
        style={{
          fontSize: '22px',
          margin: '20px 0 15px 0',
          fontWeight: '500'
        }}
      >
        {searchQuery
          ? '🔍 Search Results'
          : '🔥 Trending TV Shows'}
      </h3>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '20px'
        }}
      >

        {shows.map((show) => (

          <div
            key={show.id}
            onClick={() => handleShowSelect(show)}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#181818',
              border: '1px solid #222'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >

            {/* Poster Image */}

            <img
              src={
                show.poster_path
                  ? `${IMAGE_URL}/w500${show.poster_path}`
                  : 'https://placehold.co/300x450?text=No+Image'
              }
              alt={show.name || show.original_name}
              loading="lazy"
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                display: 'block'
              }}
            />


            {/* Show Name */}

            <div
              style={{
                padding: '10px',
                fontSize: '13px',
                fontWeight: 'bold',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {show.name || show.original_name}
            </div>

          </div>

        ))}

      </div>


      {/* ================================= */}
      {/* EMPTY SEARCH RESULT */}
      {/* ================================= */}

      {!loading && !error && shows.length === 0 && (

        <p
          style={{
            textAlign: 'center',
            color: '#aaa',
            marginTop: '30px'
          }}
        >
          No TV Shows Found.
        </p>

      )}

    </div>

  );

};

export default NetFlix;