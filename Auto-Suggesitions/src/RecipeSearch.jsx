import React, { useState, useEffect } from "react";

const RecipeSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let debounceTimer = null;
  
    useEffect(() => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }
  
      setLoading(true);
      setError(null);
  
      const fetchRecipes = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
          const data = await response.json();
          setSuggestions(data.recipes || []);
        } catch (err) {
          setError("Failed to fetch recipes. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      debounceTimer = setTimeout(fetchRecipes, 500);
  
      return () => clearTimeout(debounceTimer);
    }, [query]);
  
    const handleSelectRecipe = (recipe) => {
      setQuery('');
      setSelectedRecipe(recipe);
      setSuggestions([]);
    };

    const handleBackToSearch = () => {
      setSelectedRecipe(null);
      setQuery("");
      setSuggestions([]);
    };
  
    return (
      <div className="container mt-4">
        {/* Header Section */}
        <header className="text-center mb-4">
          <h1 className="fw-bold text-dark">🍽️ Recipe Finder</h1>
          <p className="text-muted">
            Discover delicious recipes at your fingertips! Simply search for your favorite dishes and explore amazing meal ideas.
          </p>
        </header>
        {/* Search Input */}
        <div className="mb-3 d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
        {/* Loading and Error Messages */}
        {loading && <p className="text-primary text-center">Loading...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {/* Recipe Suggestions List */}
        {suggestions.length > 0 && (
          <ul className="list-group w-50 mx-auto">
            {suggestions.map((recipe) => (
              <li 
                key={recipe.id} 
                className="list-group-item suggestion-item" 
                onClick={() => handleSelectRecipe(recipe)} 
                style={{cursor:'pointer'}}
              >
                {recipe.name}
              </li>
            ))}
          </ul>
        )}
        {query && suggestions.length === 0 && !loading && <p className="text-warning text-center">No recipes found.</p>}
        {/* selected recipe card */}
        {selectedRecipe && (
          <div className="d-flex justify-content-center">
            <div className="col-sm-8 col-md-3 mt-3 p-4 shadow">
                <img src={selectedRecipe.image} className="card-img-top mb-3" alt={selectedRecipe.name}  />
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3">{selectedRecipe.name}</h5>
                  <p className="card-text">User ID: <span className="fw-bold">{selectedRecipe.userId}</span></p>
                  <p className="card-text">Rating: <span className="fw-bold">{selectedRecipe.rating} ⭐</span></p>
                  <p className="card-text">Meal Type: <span className="fw-bold">{selectedRecipe.mealType}</span></p>

                  {/* Back Button */}
                  <button className="btn btn-primary mt-2" onClick={handleBackToSearch}>
                  🔙 Back to Search
                  </button>
                </div>
            </div>
          </div>
        )}
        {/* Instructions */}
        
        <div className="d-flex justify-content-center mt-5">
          <div className="shadow-lg p-4" style={{ maxWidth: "500px" }}>
            <h4 className="fw-bold text-light text-center">📌 How to Use</h4>
            <p className="text-muted">1️⃣ Type a recipe name in the search bar.</p>
            <p className="text-muted">2️⃣ Choose a recipe from the suggestions.</p>
            <p className="text-muted">3️⃣ View details like meal type, rating, and user info.</p>
          </div>
        </div>

        
        {/* Footer Section */}
      <footer className="text-center mt-5">
        <p className="text-muted">
          🍕 Happy Cooking! Explore new recipes and enjoy delicious meals.  
        </p>
      </footer>
      </div>
      
    );
  };
  
  export default RecipeSearch;