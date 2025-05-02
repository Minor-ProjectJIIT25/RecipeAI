/**
 * API functions for recipe recommendations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get recipe recommendations based on ingredients
 * 
 * @param {string[]} ingredients - Array of ingredient names (3-7 ingredients)
 * @param {number} numRecipes - Number of recipes to generate (default: 2)
 * @returns {Promise<Object>} - Recipe recommendations
 */
export const getRecipeRecommendations = async (ingredients, numRecipes = 2) => {
  try {
    if (!ingredients || ingredients.length < 3 || ingredients.length > 7) {
      throw new Error('Please provide between 3 and 7 ingredients');
    }

    const response = await fetch(`${API_BASE_URL}/api/recipes/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        num_recipes: numRecipes,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get recipe recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('Recipe API error:', error);
    throw error;
  }
};