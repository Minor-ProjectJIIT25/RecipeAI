import { useState } from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!recipe) return null;
  
  const { name, description, cookingTime, ingredients, instructions, nutritionInfo } = recipe;
  
  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h3 className="recipe-title">{name}</h3>
        <button 
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      
      <p className="recipe-description">{description}</p>
      
      {expanded && (
        <div className="recipe-details">
          <div className="recipe-section">
            <h4>Cooking Time</h4>
            <p>{cookingTime}</p>
          </div>

          <div className="recipe-section">
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {Array.isArray(ingredients) ? 
                ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                )) : 
                <li>Ingredients not available</li>
              }
            </ul>
          </div>
          
          <div className="recipe-section">
            <h4>Instructions</h4>
            <ol className="instructions-list">
              {Array.isArray(instructions) ? 
                instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                )) : 
                <li>Instructions not available</li>
              }
            </ol>
          </div>
          
          <div className="recipe-section">
            <h4>Nutrition Information</h4>
            <p>{nutritionInfo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;