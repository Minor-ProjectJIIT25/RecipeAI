import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./RecipeList.css";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComments, setNewComments] = useState({});
    const [recommendedRecipes, setRecommendedRecipes] = useState({}); // Stores recommended recipes for each liked recipe

    useEffect(() => {
        fetchRecipes();
    }, []);

    // Fetch all recipes from Node.js backend (port 5001)
    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5001/api/");
            setRecipes(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setError("Failed to load recipes. Please try again.");
            setLoading(false);
        }
    };

    // Handle Like and fetch recommended recipes from Flask backend (port 5000)
    const handleLike = async (recipeId) => {
        try {
            const endpoint = `http://localhost:5000/api/recipes/${recipeId}/like`;
            const response = await axios.post(endpoint);

            // Store recommended recipes safely
            const recommendations = response.data.recommended_recipes || [];
            setRecommendedRecipes((prev) => ({
                ...prev,
                [recipeId]: Array.isArray(recommendations) ? recommendations : [],
            }));

            // Update UI to reflect new like count
            fetchRecipes();
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    // Handle adding a comment
    const handleAddComment = async (recipeId) => {
        if (!newComments[recipeId]?.trim()) return; // Prevent empty comments

        try {
            await axios.post(`http://localhost:5001/api/${recipeId}/comment`, {
                emailId: "user@example.com", // Replace with actual user email from authentication
                text: newComments[recipeId],
            });

            setNewComments((prev) => ({ ...prev, [recipeId]: "" })); // Clear input field
            fetchRecipes(); // Refresh comments
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) return <p className="loading">Loading recipes...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="recipe-list">
            <h1>“Cooking is love made visible!”</h1>
            <div className="recipe-container">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-card">
                        <img src={recipe.imageUrl} alt={recipe.TranslatedRecipeName} className="recipe-image" />
                        <h3 className="recipe-title">{recipe.TranslatedRecipeName}</h3>
                        <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
                        <p><strong>Ingredients:</strong> {recipe.TranslatedIngredients}</p>
                        <p><strong>Cooking Time:</strong> {recipe.TotalTimeInMins} mins</p>

                        {/* Like Button Section */}
                        <div className="like-section">
                            <button onClick={() => handleLike(recipe._id)} className="like-button">
                                {recipe.likes > 0 ? <FaHeart className="liked" /> : <FaRegHeart className="unliked" />}
                            </button>
                            <span>{recipe.likes} Likes</span>
                        </div>

                        {/* Recommended Recipes Section */}
                        {recommendedRecipes[recipe._id] && recommendedRecipes[recipe._id].length > 0 && (
                            <div className="recommended-recipes">
                                <h4>Recommended Recipes:</h4>
                                <ul>
                                    {recommendedRecipes[recipe._id].map((rec, index) => (
                                        <li key={index}>
                                            <strong>{rec.TranslatedRecipeName}</strong> - {rec.Cuisine}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Comments Section */}
                        <div className="comments-section">
                            <h4>Comments:</h4>
                            {recipe.comments && recipe.comments.length > 0 ? (
                                <ul className="comments-list">
                                    {recipe.comments.map((comment, index) => (
                                        <li key={index}>
                                            <strong>{comment.emailId}</strong>: {comment.text}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet. Be the first to comment!</p>
                            )}

                            {/* Add a comment */}
                            <div className="add-comment">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    value={newComments[recipe._id] || ""}
                                    onChange={(e) =>
                                        setNewComments({ ...newComments, [recipe._id]: e.target.value })
                                    }
                                />
                                <button onClick={() => handleAddComment(recipe._id)}>Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;







   


