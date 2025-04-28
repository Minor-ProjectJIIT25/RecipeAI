import React, { useState, useRef } from "react";
import axios from "axios";

const moods = [
  { name: "Stressed", emoji: "😫", caption: "Feeling overwhelmed? Let's calm your cravings!" },
  { name: "Anger", emoji: "😡", caption: "Cool down with some soothing bites!" },
  { name: "Sad", emoji: "😢", caption: "Cheer up with comforting food!" },
  { name: "Happy", emoji: "😄", caption: "Celebrate with some tasty treats!" },
  { name: "Anxious", emoji: "😰", caption: "Calm your nerves with these picks!" },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const recipeRefs = useRef([]);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes?mood=${mood}`);
      setRecipes(response.data.recipes || []);
    } catch (error) {
      console.error("❌ Error fetching recipe data:", error);
      setRecipes([]);
    }
  };

  const handleRecipeClick = (index) => {
    setSelectedRecipeIndex(index);
    setTimeout(() => {
      recipeRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const speakRecipe = (recipe, lang) => {
    stopSpeech(); // Stop any previous speech
    const text =
      lang === "hi-IN"
        ? `व्यंजन का नाम: ${recipe.recipeName}. विवरण: ${recipe.description}. सामग्री: ${recipe.ingredientsDetails.join(
            ", "
          )}. विधि: ${recipe.instructions.join(". ")}.`
        : `Recipe name: ${recipe.recipeName}. Description: ${recipe.description}. Ingredients: ${recipe.ingredientsDetails.join(
            ", "
          )}. Instructions: ${recipe.instructions.join(". ")}`;

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = lang;
    utteranceRef.current.voice = synthRef.current
      .getVoices()
      .find((v) => v.lang === lang);
    synthRef.current.speak(utteranceRef.current);
  };

  const stopSpeech = () => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Your Mood</h2>
      <div style={styles.moods}>
        {moods.map((mood) => (
          <div
            key={mood.name}
            style={{
              ...styles.moodCard,
              ...(selectedMood === mood.name ? styles.moodCardActive : {}),
            }}
            onClick={() => handleMoodClick(mood.name)}
          >
            <div style={styles.emoji}>{mood.emoji}</div>
            <div style={styles.moodName}>{mood.name}</div>
            <div style={styles.moodCaption}>{mood.caption}</div>
          </div>
        ))}
      </div>

      {selectedMood && (
        <div style={styles.foodList}>
          <h3 style={styles.subtitle}>Recommended Recipes: </h3>
          <div style={styles.recipeGrid}>
            {recipes.map((recipe, index) => (
              <div
                key={index}
                style={styles.recipeCard}
                onClick={() => handleRecipeClick(index)}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={recipe.imgUrl}
                    alt={recipe.recipeName}
                    style={styles.image}
                  />
                </div>
                <h4 style={styles.recipeName}>{recipe.recipeName}</h4>
              </div>
            ))}
          </div>

          {selectedRecipeIndex !== null && (
            <div
              ref={(el) => (recipeRefs.current[selectedRecipeIndex] = el)}
              style={styles.recipeDetails}
            >
              <div style={styles.recipeText}>
                <h4>{recipes[selectedRecipeIndex].recipeName}</h4>
                <div style={styles.controls}>
                  <button
                    style={styles.voiceBtn}
                    onClick={() =>
                      speakRecipe(recipes[selectedRecipeIndex], "en-US")
                    }
                  >
                    🔊 English
                  </button>
                  <button
                    style={styles.voiceBtn}
                    onClick={() =>
                      speakRecipe(recipes[selectedRecipeIndex], "hi-IN")
                    }
                  >
                    🇮🇳 Hindi
                  </button>
                  <button style={styles.voiceBtn} onClick={stopSpeech}>
                    ⛔ Stop
                  </button>
                </div>
                <p>{recipes[selectedRecipeIndex].description}</p>

                <strong>Ingredients:</strong>
                <ul>
                  {recipes[selectedRecipeIndex].ingredientsDetails.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                <strong>Instructions:</strong>
                <ul>
                  {recipes[selectedRecipeIndex].instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
              <img
                src={recipes[selectedRecipeIndex].imgUrl}
                alt={recipes[selectedRecipeIndex].recipeName}
                style={styles.recipeImage}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  moods: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "30px 0",
    flexWrap: "wrap",
  },
  moodCard: {
    background: "#ffebcc",
    padding: "20px",
    borderRadius: "15px",
    cursor: "pointer",
    textAlign: "center",
    width: "180px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  moodCardActive: {
    background: "#ffa726",
    transform: "scale(1.1)",
  },
  emoji: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  moodName: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#333",
  },
  moodCaption: {
    fontSize: "0.9rem",
    color: "#777",
  },
  foodList: {
    marginTop: "40px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
  },
  subtitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "25px",
    fontWeight: "600",
    letterSpacing: "-0.5px",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  },
  recipeCard: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "10px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  recipeName: {
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    color: "#333",
    fontWeight: "600",
  },
  recipeDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: "25px",
    padding: "20px",
    backgroundColor: "#fafafa",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
  },
  recipeText: {
    flex: 1,
    marginRight: "20px",
  },
  recipeImage: {
    width: "40%",
    borderRadius: "10px",
    objectFit: "cover",
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    marginTop: "10px",
  },
  voiceBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#ffa726",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default MoodSelector;
