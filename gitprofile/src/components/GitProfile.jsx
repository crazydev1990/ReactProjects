
import React, { useState, useEffect, useRef } from 'react';

const GitProfile = () => {

  // 1. States
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimit, setRateLimit] = useState(null);

  // 2. Cache
  const profileCache = useRef({});
  const searchCache = useRef({});

  // 3. Search Suggestions API
  useEffect(() => {

    const searchValue = username.trim();

    if (searchValue.length < 3) {
      setSuggestions([]);
      setSearchLoading(false);
      return;
    }

    // Check Cache
    if (searchCache.current[searchValue]) {
      setSuggestions(searchCache.current[searchValue]);
      setSearchLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {

      setSearchLoading(true);

      try {

        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(searchValue)}&per_page=5`,
          {
            signal: controller.signal
          }
        );

        // Rate Limit Headers
        const remaining = response.headers.get(
          'X-RateLimit-Remaining'
        );

        const reset = response.headers.get(
          'X-RateLimit-Reset'
        );

        setRateLimit({
          remaining,
          reset
        });

        if (!response.ok) {

          if (response.status === 403 || response.status === 429) {
            throw new Error(
              'GitHub API Rate Limit Exceeded. Please try again later.'
            );
          }

          throw new Error('Unable to fetch suggestions');

        }

        const data = await response.json();

        const users = data.items || [];

        searchCache.current[searchValue] = users;

        setSuggestions(users);

      } catch (err) {

        if (err.name !== 'AbortError') {
          console.error('Search Error:', err);
          setError(err.message);
          setSuggestions([]);
        }

      } finally {

        if (!controller.signal.aborted) {
          setSearchLoading(false);
        }

      }

    }, 700);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };

  }, [username]);


  // 4. Fetch GitHub Profile
  const fetchGitHubProfile = async (targetUser) => {

    const userToFetch = (targetUser || username).trim();

    if (!userToFetch) return;

    setLoading(true);
    setError('');
    setProfile(null);
    setSuggestions([]);

    // Check Profile Cache
    if (profileCache.current[userToFetch]) {

      setProfile(profileCache.current[userToFetch]);
      setUsername(profileCache.current[userToFetch].login);
      setLoading(false);

      return;
    }

    try {

      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(userToFetch)}`
      );

      // Rate Limit Headers
      const remaining = response.headers.get(
        'X-RateLimit-Remaining'
      );

      const reset = response.headers.get(
        'X-RateLimit-Reset'
      );

      setRateLimit({
        remaining,
        reset
      });

      if (!response.ok) {

        if (response.status === 404) {
          throw new Error('This username not found!');
        }

        if (response.status === 403 || response.status === 429) {
          throw new Error(
            'GitHub API Rate Limit Exceeded. Please try again later.'
          );
        }

        throw new Error('Something went wrong!');

      }

      const data = await response.json();

      // Save Cache
      profileCache.current[userToFetch] = data;

      setProfile(data);
      setUsername(data.login);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // 5. Enter Key
  const handleKeyPress = (e) => {

    if (e.key === 'Enter') {
      fetchGitHubProfile();
    }

  };


  // 6. Clear Search
  const handleClear = () => {

    setUsername('');
    setSuggestions([]);
    setProfile(null);
    setError('');
    setRateLimit(null);

  };


  // 7. JSX
  return (

    <div style={{
      padding: '30px',
      maxWidth: '450px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>

      <h3 style={{
        color: '#1799c4',
        textAlign: 'center'
      }}>
        GitHub Profile Search
      </h3>


      {/* Search Input */}

      <div style={{
        marginBottom: '15px',
        position: 'relative'
      }}>

        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyPress}
          placeholder="Type GitHub username..."
          style={{
            padding: '12px',
            width: '94%',
            fontSize: '15px',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />


        {/* Suggestions */}

        {suggestions.length > 0 && (

          <ul style={{
            position: 'absolute',
            top: '42px',
            left: 0,
            width: '100%',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>

            {suggestions.map((user) => (

              <li
                key={user.id}
                onClick={() => fetchGitHubProfile(user.login)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: '1px solid #eee'
                }}
              >

                <img
                  src={user.avatar_url}
                  alt={user.login}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                  }}
                />

                <span>{user.login}</span>

              </li>

            ))}

          </ul>

        )}

      </div>


      {/* Search Loading */}

      {searchLoading && (
        <p>Searching users...</p>
      )}


      {/* Buttons */}

      <div style={{
        display: 'flex',
        gap: '10px'
      }}>

        <button
          onClick={() => fetchGitHubProfile()}
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#24292e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Search Profile'}
        </button>

        <button
          onClick={handleClear}
          style={{
            padding: '10px',
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>

      </div>


      {/* Error */}

      {error && (

        <p style={{
          color: 'red',
          textAlign: 'center',
          marginTop: '15px'
        }}>
          ❌ {error}
        </p>

      )}


      {/* Rate Limit Information */}

      {rateLimit && (

        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f6f8fa',
          borderRadius: '6px',
          fontSize: '12px'
        }}>

          <p>
            Remaining Requests: {rateLimit.remaining}
          </p>

          {rateLimit.reset && (

            <p>
              Reset Time: {
                new Date(
                  Number(rateLimit.reset) * 1000
                ).toLocaleString()
              }
            </p>

          )}

        </div>

      )}


      {/* Profile Card */}

      {profile && (

        <div style={{
          backgroundColor: '#85259b',
          color: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px',
          textAlign: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>

          <img
            src={profile.avatar_url}
            alt="avatar"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              border: '2px solid white'
            }}
          />

          <h4>
            {profile.name || profile.login}
          </h4>

          <p style={{
            fontSize: '13px',
            color: '#eee'
          }}>
            {profile.bio || 'No bio available'}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #eee',
            paddingTop: '15px',
            fontSize: '14px'
          }}>

            <div>
              <strong>{profile.public_repos}</strong>
              <p>Repos</p>
            </div>

            <div>
              <strong>{profile.followers}</strong>
              <p>Followers</p>
            </div>

            <div>
              <strong>{profile.following}</strong>
              <p>Following</p>
            </div>

          </div>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '15px',
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#24292e',
              padding: '8px 15px',
              borderRadius: '5px'
            }}
          >
            View GitHub Profile
          </a>

        </div>

      )}

    </div>

  );

};

export default GitProfile;
