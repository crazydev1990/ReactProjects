import React, { useState, useEffect } from 'react';

const Recipes = () => {

  // =====================================
  // 1. API Configuration
  // =====================================

  const API_URL = 'https://www.themealdb.com/api/json/v1/1';


  // =====================================
  // 2. States
  // =====================================

  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');
  const [detailsError, setDetailsError] = useState('');


  // =====================================
  // 3. Search + Default Recipes API
  // =====================================

  useEffect(() => {

    const controller = new AbortController();

    setLoading(true);
    setError('');

    const delayDebounce = setTimeout(async () => {

      try {

        let fetchUrl;

        if (searchQuery.trim()) {

          // Search Recipe
          fetchUrl =
            `${API_URL}/search.php?s=${encodeURIComponent(
              searchQuery.trim()
            )}`;

        } else {

          // Default recipes starting with B
          fetchUrl = `${API_URL}/search.php?f=b`;

        }

        const response = await fetch(fetchUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        setMeals(data.meals || []);

      } catch (err) {

        if (err.name !== 'AbortError') {
          setError('Error Finding Recipes: ' + err.message);
          setMeals([]);
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }

    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };

  }, [searchQuery]);


  // =====================================
  // 4. Get Complete Recipe Details
  // =====================================

  const handleMealSelect = async (meal) => {

    const controller = new AbortController();

    setSelectedMeal(null);
    setDetailsLoading(true);
    setDetailsError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    try {

      const fetchUrl =
        `${API_URL}/lookup.php?i=${meal.idMeal}`;

      const response = await fetch(fetchUrl, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error('Recipe details not found.');
      }

      setSelectedMeal(data.meals[0]);

    } catch (err) {

      if (err.name !== 'AbortError') {
        setDetailsError(err.message);
      }

    } finally {
      setDetailsLoading(false);
    }

  };


  // =====================================
  // 5. YouTube Embed URL
  // =====================================

  const getYouTubeEmbedUrl = (url) => {

    if (!url) return null;

    try {

      const youtubeUrl = new URL(url);

      let videoId = '';

      if (youtubeUrl.hostname.includes('youtu.be')) {

        videoId = youtubeUrl.pathname.slice(1);

      } else if (
        youtubeUrl.hostname.includes('youtube.com')
      ) {

        videoId =
          youtubeUrl.searchParams.get('v') ||
          youtubeUrl.pathname.split('/').pop();

      }

      if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId || '')) {
        return null;
      }

      return `https://www.youtube-nocookie.com/embed/${videoId}`;

    } catch {
      return null;
    }

  };


  // =====================================
  // 6. Ingredients + Measures
  // =====================================

  const getIngredientsList = (meal) => {

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {

        ingredients.push({
          id: i,
          name: ingredient.trim(),
          measure: measure?.trim() || ''
        });

      }

    }

    return ingredients;

  };


  // =====================================
  // 7. Close Recipe
  // =====================================

  const handleCloseRecipe = () => {

    setSelectedMeal(null);
    setDetailsError('');

  };


  // =====================================
  // 8. JSX UI
  // =====================================

  return (

    <div
      style={{
        backgroundColor: '#fcf8f2',
        minHeight: '100vh',
        color: '#2c3e50',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >

      {/* HEADER */}

      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '35px',
          borderBottom: '2px solid #eaddca',
          paddingBottom: '20px'
        }}
      >

        <h1
          style={{
            color: '#d35400',
            margin: 0,
            fontSize: '36px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer'
          }}
          onClick={() => {
            setSearchQuery('');
            handleCloseRecipe();
          }}
        >
          🍳 DESI RECIPE FINDER
        </h1>

        <p
          style={{
            margin: 0,
            color: '#7f8c8d',
            fontSize: '16px'
          }}
        >
          TheMealDB API માંથી લાઈવ રસોઈ ગાઈડ
        </p>


        {/* SEARCH INPUT */}

        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            marginTop: '10px'
          }}
        >

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedMeal(null);
              setDetailsError('');
            }}
            placeholder="Search Recipe... (Chicken, Biryani, Cake)"
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '30px',
              border: '2px solid #e67e22',
              backgroundColor: '#fff',
              color: '#333',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          />

        </div>

      </header>


      {/* LOADING */}

      {loading && (

        <p
          style={{
            color: '#e67e22',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          ⚡ Cookbook Opening...
        </p>

      )}


      {/* ERROR */}

      {error && (

        <p
          style={{
            color: '#e74c3c',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          ❌ {error}
        </p>

      )}


      {/* DETAIL LOADING */}

      {detailsLoading && (

        <p
          style={{
            color: '#e67e22',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          🍳 Loading Complete Recipe Details...
        </p>

      )}


      {/* DETAIL ERROR */}

      {detailsError && (

        <p
          style={{
            color: '#e74c3c',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          ❌ {detailsError}
        </p>

      )}


      {/* SELECTED RECIPE DETAILS */}

      {selectedMeal && (

        <div
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '16px',
            marginBottom: '40px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            borderTop: '8px solid #d35400'
          }}
        >

          {/* RECIPE HEADER */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >

            <div>

              <span
                style={{
                  backgroundColor: '#e67e22',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >
                {selectedMeal.strCategory} |
                {' '}
                {selectedMeal.strArea}
              </span>

              <h2
                style={{
                  fontSize: '32px',
                  margin: '10px 0 15px 0',
                  color: '#d35400'
                }}
              >
                {selectedMeal.strMeal}
              </h2>

            </div>


            <button
              onClick={handleCloseRecipe}
              style={{
                padding: '10px 20px',
                backgroundColor: '#7f8c8d',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Close Recipe
            </button>

          </div>


          {/* RECIPE IMAGE */}

          <img
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginTop: '15px'
            }}
          />


          {/* INGREDIENTS + INSTRUCTIONS + VIDEO */}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              marginTop: '30px'
            }}
          >

            {/* LEFT: INGREDIENTS + INSTRUCTIONS */}

            <div>

              <h4
                style={{
                  margin: '0 0 10px 0',
                  color: '#2c3e50',
                  borderBottom: '2px solid #f1c40f',
                  paddingBottom: '5px'
                }}
              >
                🛒 જરૂરી સામગ્રી (Ingredients)
              </h4>


              <ul
                style={{
                  paddingLeft: '20px',
                  lineHeight: '1.8'
                }}
              >

                {getIngredientsList(selectedMeal).map((item) => (

                  <li
                    key={item.id}
                    style={{ color: '#555' }}
                  >
                    {item.name} - {item.measure}
                  </li>

                ))}

              </ul>


              <h4
                style={{
                  margin: '25px 0 10px 0',
                  color: '#2c3e50',
                  borderBottom: '2px solid #f1c40f',
                  paddingBottom: '5px'
                }}
              >
                📝 બનાવવાની રીત (Instructions)
              </h4>


              <p
                style={{
                  lineHeight: '1.8',
                  color: '#555',
                  whiteSpace: 'pre-line',
                  textAlign: 'justify'
                }}
              >
                {selectedMeal.strInstructions}
              </p>

            </div>


            {/* RIGHT: YOUTUBE VIDEO */}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >

              <h4
                style={{
                  margin: 0,
                  color: '#2c3e50',
                  borderBottom: '2px solid #e74c3c',
                  paddingBottom: '5px'
                }}
              >
                📺 Video Tutorial
              </h4>


              {getYouTubeEmbedUrl(selectedMeal.strYoutube) ? (

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }}
                >

                  <iframe
                    src={getYouTubeEmbedUrl(selectedMeal.strYoutube)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Recipe YouTube Video Player"
                  />

                </div>

              ) : (

                <div
                  style={{
                    padding: '40px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: '#95a5a6'
                  }}
                >
                  🚫 No Video Available For This Recipe.
                </div>

              )}


              {/* ORIGINAL YOUTUBE LINK */}

              {selectedMeal.strYoutube && (

                <a
                  href={selectedMeal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#d35400',
                    fontWeight: 'bold',
                    textDecoration: 'none'
                  }}
                >
                  Watch on YouTube ↗
                </a>

              )}

            </div>

          </div>

        </div>

      )}


      {/* RECIPE GRID */}

      <h3
        style={{
          fontSize: '22px',
          margin: '20px 0 20px 0',
          color: '#2c3e50',
          borderLeft: '5px solid #d35400',
          paddingLeft: '10px'
        }}
      >
        {searchQuery
          ? '🔍 Found Recipes'
          : '🔥 Browse Famous Recipes'}
      </h3>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '25px'
        }}
      >

        {meals.map((meal) => (

          <div
            key={meal.idMeal}
            onClick={() => handleMealSelect(meal)}
            style={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '14px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              border: '1px solid #ebdcc5',
              boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow =
                '0 8px 20px rgba(211,84,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 4px 10px rgba(0,0,0,0.03)';
            }}
          >

            {/* RECIPE IMAGE */}

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              loading="lazy"
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                display: 'block'
              }}
            />


            {/* RECIPE NAME */}

            <div
              style={{
                padding: '12px',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#2c3e50',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              {meal.strMeal}
            </div>

          </div>

        ))}

      </div>


      {/* EMPTY SEARCH RESULT */}

      {!loading && !error && meals.length === 0 && (

        <p
          style={{
            textAlign: 'center',
            color: '#7f8c8d',
            marginTop: '30px'
          }}
        >
          🔍 No Recipe Found. Try Another Search...
        </p>

      )}

    </div>

  );

};

export default Recipes;
