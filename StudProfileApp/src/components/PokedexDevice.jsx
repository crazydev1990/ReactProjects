
import React, { useState, useEffect } from 'react';

function PokedexDevice() {
  const [searchQuery, setSearchQuery] = useState('pikachu');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Async Arrow Function - Fetch Pokémon Data
  const fetchPokemonData = async (nameOrId) => {
    const cleanQuery = String(nameOrId || '').trim().toLowerCase();

    if (!cleanQuery) {
      setErrorMsg('Please enter Pokémon name or ID!');
      setPokemon(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(cleanQuery)}`
      );

      if (!response.ok) {
        throw new Error('Pokémon not found!');
      }

      const data = await response.json();

      setPokemon({
        id: data.id,
        name: data.name.toUpperCase(),

        image:
          data.sprites.other?.['official-artwork']?.front_default ||
          data.sprites.front_default,

        types: data.types.map((t) =>
          t.type.name.toUpperCase()
        ),

        height: (data.height / 10).toFixed(1),
        weight: (data.weight / 10).toFixed(1),

        abilities: data.abilities
          .map((a) => a.ability.name)
          .join(', '),

        stats: data.stats
      });

      setSearchQuery(String(data.id));

    } catch (error) {
      setPokemon(null);
      setErrorMsg(
        'Pokémon not found! Try pikachu, charizard or ID 1 to 151.'
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect - Initial API Call
  useEffect(() => {
    const loadPokemon = async () => {
      await fetchPokemonData('pikachu');
    };

    loadPokemon();
  }, []);

  // Search Arrow Function
  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchPokemonData(searchQuery);
  };

  // Random Pokémon Arrow Function
  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;

    setSearchQuery(String(randomId));

    await fetchPokemonData(randomId);
  };

  // Previous Pokémon Arrow Function
  const previousPokemon = async () => {
    if (pokemon && pokemon.id > 1) {
      await fetchPokemonData(pokemon.id - 1);
    }
  };

  // Next Pokémon Arrow Function
  const nextPokemon = async () => {
    if (pokemon && pokemon.id < 151) {
      await fetchPokemonData(pokemon.id + 1);
    }
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '20px auto',
      padding: '22px',
      backgroundColor: '#dc2626',
      borderRadius: '28px',
      border: '4px solid #7f1d1d',
      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '18px',
        borderBottom: '3px solid #991b1b',
        paddingBottom: '12px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: '#38bdf8',
          border: '4px solid #fff',
          boxShadow: '0 0 12px #38bdf8'
        }} />

        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ef4444', '#eab308', '#22c55e'].map((color, i) => (
            <div key={i} style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: color,
              border: '1px solid #000'
            }} />
          ))}
        </div>

        <span style={{
          marginLeft: 'auto',
          fontWeight: 'bold',
          fontSize: '14px',
          letterSpacing: '1px'
        }}>
          POKÉDEX v2.0
        </span>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '16px'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Name or ID (e.g. charizard, 25)"
          style={{
            flex: 1,
            minWidth: 0,
            padding: '10px 12px',
            borderRadius: '10px',
            border: '2px solid #7f1d1d',
            backgroundColor: '#fef2f2',
            color: '#0f172a',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        />

        <button type="submit" disabled={loading} style={{
          padding: '10px 16px',
          backgroundColor: '#0f172a',
          color: '#38bdf8',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Scan 🔍
        </button>
      </form>

      {/* Display Screen */}
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '18px',
        padding: '18px',
        border: '5px solid #cbd5e1',
        minHeight: '310px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>

        {loading ? (
          <div style={{
            color: '#38bdf8',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            📡 Scanning Pokémon Data...
          </div>
        ) : errorMsg ? (
          <div style={{
            color: '#f87171',
            fontSize: '13px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        ) : pokemon && (
          <div>

            {/* ID and Types */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5px',
              marginBottom: '8px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                backgroundColor: '#1e293b',
                color: '#38bdf8',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                #{String(pokemon.id).padStart(3, '0')}
              </span>

              <div style={{ display: 'flex', gap: '5px' }}>
                {pokemon.types.map((type, i) => (
                  <span key={i} style={{
                    backgroundColor: '#eab308',
                    color: '#000',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '14px',
              padding: '10px',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              {pokemon.image ? (
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  style={{
                    width: '140px',
                    height: '140px',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div>Image Not Available</div>
              )}
            </div>

            {/* Name */}
            <h3 style={{
              margin: '0 0 10px',
              color: '#4ade80',
              fontSize: '20px',
              textAlign: 'center'
            }}>
              {pokemon.name}
            </h3>

            {/* Height and Weight */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '8px',
              backgroundColor: '#020617',
              padding: '10px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#cbd5e1',
              marginBottom: '12px'
            }}>
              <div>📏 <b>Height:</b> {pokemon.height} m</div>
              <div>⚖️ <b>Weight:</b> {pokemon.weight} kg</div>
            </div>

            {/* Abilities */}
            <div style={{
              backgroundColor: '#1e293b',
              padding: '9px',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#cbd5e1',
              marginBottom: '12px'
            }}>
              <b style={{ color: '#4ade80' }}>Abilities:</b>
              <div style={{ marginTop: '5px' }}>
                {pokemon.abilities}
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              fontSize: '11px'
            }}>
              {pokemon.stats.map((st) => (
                <div key={st.stat.name}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#94a3b8',
                    textTransform: 'uppercase'
                  }}>
                    <span>{st.stat.name}</span>
                    <b style={{ color: '#fff' }}>{st.base_stat}</b>
                  </div>

                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#1e293b',
                    borderRadius: '4px',
                    marginTop: '2px'
                  }}>
                    <div style={{
                      width: `${Math.min(st.base_stat, 100)}%`,
                      height: '100%',
                      backgroundColor: '#38bdf8',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px'
      }}>
        <button
          onClick={previousPokemon}
          disabled={loading || !pokemon || pokemon.id <= 1}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ◀️ Prev
        </button>

        <button
          onClick={getRandomPokemon}
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#eab308',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🎲 Random
        </button>

        <button
          onClick={nextPokemon}
          disabled={loading || !pokemon || pokemon.id >= 151}
          style={{
            flex: 1,
            padding: '10px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Next ▶️
        </button>
      </div>

    </div>
  );
}

export default PokedexDevice;
