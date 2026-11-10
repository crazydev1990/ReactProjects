import React from 'react'
import ReactDom from 'react-dom'
import {useState, useEffect} from 'react'
import ChapterContent from './ChapterContent'

const ChapterIndex = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedId, setSelectedId] = useState("52944"); // Default initial view ID (Escovitch Fish)
  // Fetching multiple recipes from the Seafood category using the requested base URL
  const getIndexList = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v2/1/latest.php');
      const data = await res.json();
      if (data.meals) {
        console.log("meals:", data.meals, typeof data.meals);

        // Taking the first 6 recipes from the live stream to display inside the sidebar index
        setRecipes(data.meals);
      }
    } catch (err) {
      console.log("Error loading dynamic recipe list", err);
    }
  };
   useEffect(() => {
    getIndexList();
  }, []);
//   console.log(recipes)
    return (
    <>
    <div className="container-fluid p-0 min-vh-100 bg-light">
      <header className="bg-dark text-white p-3 text-center fw-bold fs-4 shadow">
        🏛️ Live 3rd Party API Digital Recipe Book
      </header>

      <div className="row g-0">
        <div className="col-md-4 border-end p-3 bg-white" style={{ minHeight: '100vh', overflowY: 'auto' }}>
          <h5 className="fw-bold text-primary mb-3">📋 Recipe Chapters</h5>
          <div className="d-flex flex-column gap-2">
            {Array.isArray(recipes) && recipes.map((item, index) => (
              <button 
                key={item.idMeal} 
                onClick={() => setSelectedId(item.idMeal)} // Sets the state ID inside the wrapper on click
                className="btn text-start p-2 rounded border d-flex align-items-center gap-3 w-100 shadow-sm"
                style={{ 
                  transition: '0.2s',
                  backgroundColor: selectedId === item.idMeal ? '#e3f2fd' : '#fff',
                  borderColor: selectedId === item.idMeal ? '#0d6efd' : '#dee2e6'
                }}
              >
                <img 
                  src={item.strMealThumb} 
                  alt={item.strMeal} 
                  className="rounded-circle"
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
                <div className="text-truncate">
                  <span className="d-block fw-bold text-dark small">Chapter {index + 1}</span>
                  <small className="text-secondary d-block text-truncate fs-7">{item.strMeal}</small>
                </div>
              </button>
            ))}
          </div>
        </div>       
        <ChapterContent id={selectedId} />
      </div>
    </div>

    </>
  )
}

export default ChapterIndex
