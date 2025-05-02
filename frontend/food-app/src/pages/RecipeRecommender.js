import { useState } from 'react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { getRecipeRecommendations } from '../api/recipeApi';
import '../styles/RecipeRecommender.css';


const RecipeRecommender = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFindRecipes = async (ingredients) => {
    try {
      setLoading(true);
      setError('');
      
      const result = await getRecipeRecommendations(ingredients, 3);
      
      if (result.error) {
        setError(result.error);
        setRecipes([]);
      } else if (result.recipes && result.recipes.length > 0) {
        setRecipes(result.recipes);
      } else {
        setError('No recipes found for these ingredients');
        setRecipes([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to get recipe recommendations');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-recommender-container">
      <h1>AI Recipe Recommender</h1>
      
      <IngredientInput onSubmit={handleFindRecipes} minIngredients={3} maxIngredients={7} />
      
      <div className="recipes-results">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Generating your custom recipes...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <h2>Recipe Recommendations</h2>
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RecipeRecommender;