import React from 'react'
import ReactDom from 'react-dom'
import { useState,useEffect} from 'react'

const ChapterContent = (props) => {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    // Async/Await arrow function to lookup full details by custom ID using the base URL
  const getDetails = async (mealId) => {
    try {
      setLoading(true);
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await res.json();
      if (data.meals && data.meals.length > 0) {
        setMeal(data.meals[0]); // Saving the raw target meal object mapping values
      }
    } catch (err) {
      console.log("Error loading recipe parameters from server", err);
    } finally {
      setLoading(false);
    }
  };

  // Triggers automatically via useEffect every single time props.id changes
  useEffect(() => {
    if (props.id) {
      getDetails(props.id); // Passing the obtained props.id into the API call
    }
  }, [props.id]); // Listening specifically to changes in props.id attribute

   if (loading) {
    return (
      <div className="col-md-8 p-5 text-center text-muted">
        <h3>Fetching live details data stream...</h3>
      </div>
    );
  }
  return (
    <>
      <div className="col-md-8 p-4 bg-white text-start" style={{ overflowY: 'auto' }}>
      {meal ? (
        <div>
          {/* Metadata Badges */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-success px-3 py-2 rounded-pill fs-6">Cuisine Area: {meal.strArea}</span>
            <span className="text-muted fw-bold small">Database Reference Code: #{meal.idMeal}</span>
          </div>
          
          <h2 className="fw-bold text-dark mb-1 text-start">{meal.strMeal}</h2>
          <h5 className="text-muted mb-3">Classification Category: {meal.strCategory}</h5>
          <hr />

          {/* Large High-Quality Main Recipe Banner Image Display */}
          <div className="mb-4 text-center">
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              className="img-fluid rounded shadow"
              style={{ maxHeight: '350px', width: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Attributes Specification Layout Data Grid Table */}
          <table className="table table-bordered bg-light my-4">
            <tbody>
              <tr>
                <td className="fw-bold text-secondary" style={{ width: '35%' }}>Core Identified Ingredients:</td>
                <td className="fw-semibold text-dark">
                  {meal.strIngredient1 || "None"}, {meal.strIngredient2 || "None"}, {meal.strIngredient3 || "None"}, {meal.strIngredient4 || "None"}
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-secondary">Media Platform Tutorial:</td>
                <td>
                  <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="fw-bold text-decoration-none">
                    Watch Live Video Guide on YouTube
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Cooking Instructions Block */}
          <h4 className="fw-bold text-primary mt-4">📝 Complete Step-by-Step Instructions</h4>
          <p className="p-3 border rounded bg-light text-secondary fs-6" style={{ lineHeight: '1.7', whiteSpace: 'pre-line' }}>
            {meal.strInstructions}
          </p>
        </div>
      ) : (
        <div className="p-5 text-center text-muted">
          <h3>Select a chapter from the sidebar to initialize live data streams.</h3>
        </div>
      )}
    </div>
    </>
  )
}

export default ChapterContent
