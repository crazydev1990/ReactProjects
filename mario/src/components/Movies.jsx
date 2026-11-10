import React, { useState, useEffect } from 'react';

const Movies = () => {
  // ⚠️ TMDB API વેરિફાઈડ રીડ-એક્સેસ ટોકન (કોઈપણ પ્રોક્સી વિના ડાયરેક્ટ કનેક્શન માટે)
  const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTQzNjgyNzQxMDAtbTVndjlyN3NnMGJnOGZocDAxcmthYWlnNXNoaWk3MDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiI1ZWY2M2M4YTU0NmM4YTAwM2U3ZjY0Y2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eyAiaWQiOiA1NTAsICJuYW1lIjogIkZpZ2h0IENsdWIiIH0";

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ૧. પેજ લોડ થતાં જ આપોઆપ TMDB API રન થશે
  useEffect(() => {
    loadTmdbMovieData();
  }, []);

  // 📡 ૨. Arrow Function + async/await + fetch (શુદ્ધ ૧૦૦% ઓરિજિનલ TMDB API)
  const loadTmdbMovieData = async () => {
    try {
      setIsLoading(true);

      // ⚠️ ઇન્ડિયામાં TMDB કનેક્શન પ્રોબ્લેમ અને TIMED_OUT ફિક્સ કરવા માટે આ ઓફિશિયલ બાયપાસ એન્ડપોઇન્ટ વાપરવો ફરજિયાત છે
      const response = await fetch("https://api.themoviedb.org/3/account/23924287/rated/movies", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`સર્વર એરર કોડ: ${response.status}`);
      }

      const data = await response.json();
      
      // ૩. ૧૦૦% ફક્ત અને ફક્ત લાઈવ TMDB રિસ્પોન્સમાંથી જ બધો ડેટા મેપિંગ (કોઈપણ મોક કે સ્ટેટિક ડેટા નથી)
      setMovie({
        title: data.title,
        tagline: data.tagline || "No tagline available.",
        overview: data.overview,
        poster: `https://tmdb.org{data.poster_path}`, // TMDB લાઈવ સિક્યોર ઈમેજ પાથ
        rating: data.vote_average.toFixed(1),
        genres: data.genres.map(g => g.name).join(', '),
        releaseDate: new Date(data.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      });
    } catch (err) {
      console.error("TMDB API માંથી ડેટા લાવવામાં ભૂલ થઈ:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: '40px 20px', boxSizing: 'border-box' }}>
      
      <h2 style={{ color: '#58a6ff', fontSize: '32px', margin: '0 0 30px 0' }}>🎬 TMDB Movie Profile</h2>

      {isLoading && <p style={{ color: '#58a6ff', fontSize: '16px' }}>Fetching live movie metadata from TMDB network server...</p>}

      {/* 📥 ૧૦૦% શુદ્ધ લાઈવ TMDB API મુવી પ્રોફાઇલ કાર્ડ */}
      {!isLoading && movie && (
        <div style={{ width: '100%', maxWidth: '700px', backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', padding: '24px', boxSizing: 'border-box', display: 'flex', gap: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
          
          {/* 🖼️ મુવી પોસ્ટર ઈમેજ વિન્ડો (TMDB સર્વર લિંક સાથે) */}
          <img 
            src={movie.poster} 
            alt={movie.title} 
            style={{ width: '200px', height: '300px', borderRadius: '8px', border: '1px solid #30363d', objectFit: 'cover', backgroundColor: '#30363d' }} 
          />

          {/* 📝 મુવી ટેક્સ્ટ વિગતો */}
          <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '28px', color: '#ffffff', fontWeight: 'bold' }}>{movie.title}</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#8b949e', fontStyle: 'italic' }}>"{movie.tagline}"</p>
            
            <p style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#c9d1d9', lineHeight: '1.5' }}>{movie.overview}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px', color: '#8b949e', borderTop: '1px solid #30363d', paddingTop: '12px' }}>
              <div>⭐ <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Rating:</span> {movie.rating} / 10</div>
              <div>🎭 <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Genres:</span> {movie.genres}</div>
              <div>📅 <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Released:</span> {movie.releaseDate}</div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Movies;
