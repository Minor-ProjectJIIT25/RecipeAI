import { useState } from 'react';
import './IngredientInput.css';


const IngredientInput = ({ onSubmit, maxIngredients = 7, minIngredients = 3 }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  const handleAddIngredient = () => {
    if (!currentIngredient.trim()) {
      setError('Please enter an ingredient');
      return;
    }

    if (ingredients.length >= maxIngredients) {
      setError(`Maximum ${maxIngredients} ingredients allowed`);
      return;
    }

    if (ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setError('This ingredient is already added');
      return;
    }

    setIngredients([...ingredients, currentIngredient.trim()]);
    setCurrentIngredient('');
    setError('');
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (ingredients.length < minIngredients) {
      setError(`Please add at least ${minIngredients} ingredients`);
      return;
    }
    
    onSubmit(ingredients);
  };

  return (
    <div className="ingredient-input-container">
      <h2>Find Recipes by Ingredients</h2>
      <p>Enter between {minIngredients} and {maxIngredients} ingredients you have on hand</p>
      
      <form onSubmit={handleSubmit} className="ingredient-form">
        <div className="input-group">
          <input
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder="Enter an ingredient..."
            className="ingredient-input"
          />
          <button 
            type="button" 
            onClick={handleAddIngredient}
            disabled={ingredients.length >= maxIngredients}
            className="add-ingredient-btn"
          >
            Add
          </button>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-tag">
              <span>{ingredient}</span>
              <button 
                type="button" 
                onClick={() => handleRemoveIngredient(index)}
                className="remove-ingredient-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="ingredient-count">
          {ingredients.length} of {maxIngredients} ingredients added
          {ingredients.length < minIngredients && (
            <span className="min-required"> (minimum {minIngredients} required)</span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={ingredients.length < minIngredients}
          className="find-recipes-btn"
        >
          Find Recipes
        </button>
      </form>
    </div>
  );
};

export default IngredientInput;