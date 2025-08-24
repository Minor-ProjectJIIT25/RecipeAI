// src/MoodSelector.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";

const moods = [
  { name: "Stressed", emoji: "😫", caption: "Feeling overwhelmed? Let's calm your cravings!" },
  { name: "Anger", emoji: "😡", caption: "Cool down with some soothing bites!" },
  { name: "Sad", emoji: "😢", caption: "Cheer up with comforting food!" },
  { name: "Happy", emoji: "😄", caption: "Celebrate with some tasty treats!" },
  { name: "Anxious", emoji: "😰", caption: "Calm your nerves with these picks!" },
];

const MoodSelector = () => {
  // existing states
  const [selectedMood, setSelectedMood] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const recipeRefs = useRef([]);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // camera / detection state
  const videoRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const [cameraRunning, setCameraRunning] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState(null);
  // stability buffer: require consecutiveCount threshold
  const lastDetectedRef = useRef({ label: null, count: 0 });
  const CONSECUTIVE_THRESHOLD = 3; // require 3 identical detections before accepting

  // mapping face-api expressions to your mood names
  const expressionToMood = {
    happy: "Happy",
    sad: "Sad",
    angry: "Anger",
    fearful: "Anxious",
    disgusted: "Anger",
    surprised: "Happy",
    neutral: "Stressed",
  };

  // ------------- API fetch for mood (keeps your existing logic) -------------
  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    try {
      const response = await axios.get(`http://localhost:5001/api/recipes?mood=${mood}`);
      console.log("🌍 API Response:", response.data);
      setRecipes(response.data.recipes || []);
      setSelectedRecipeIndex(null);
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

  // ------------- Text-to-speech (kept as-is) -------------
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
    // pick a voice that matches lang if available
    const voices = synthRef.current.getVoices();
    utteranceRef.current.voice = voices.find((v) => v.lang === lang) || null;
    synthRef.current.speak(utteranceRef.current);
  };

  const stopSpeech = () => {
    if (synthRef.current.speaking) synthRef.current.cancel();
  };

  // ------------- face-api model loading -------------
  useEffect(() => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    let mounted = true;

    const load = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        // optional: small console feedback
        if (mounted) console.log("✅ face-api models loaded from", MODEL_URL);
      } catch (err) {
        console.error("❌ Error loading face-api models:", err);
      }
    };
    load();

    return () => {
      mounted = false;
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------- camera control -------------
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera not supported in this browser.");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraRunning(true);
      // detection loop
      detectionIntervalRef.current = setInterval(detectExpression, 800); // ~0.8s
    } catch (err) {
      console.error("❌ Camera start error:", err);
      alert("Camera access failed. Check permissions.");
    }
  };

  const stopCamera = () => {
    setCameraRunning(false);
    clearInterval(detectionIntervalRef.current);
    detectionIntervalRef.current = null;
    lastDetectedRef.current = { label: null, count: 0 };
    setDetectedLabel(null);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  // ------------- detection & stable mapping -------------
  const detectExpression = async () => {
    if (!videoRef.current) return;
    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5 }))
        .withFaceExpressions();

      if (detection && detection.expressions) {
        const expressions = detection.expressions;
        const top = Object.keys(expressions).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));
        const mappedMood = expressionToMood[top] || "Stressed";

        // stability: require CONSECUTIVE_THRESHOLD same labels before we accept
        const last = lastDetectedRef.current;
        if (last.label === mappedMood) {
          last.count += 1;
        } else {
          last.label = mappedMood;
          last.count = 1;
        }

        setDetectedLabel(mappedMood);

        if (last.count >= CONSECUTIVE_THRESHOLD) {
          // only trigger if mood actually changed (avoids repeated API calls)
          if (mappedMood !== selectedMood) {
            setSelectedMood(mappedMood);
            handleMoodClick(mappedMood);
          }
          // reset count so we don't re-trigger constantly
          lastDetectedRef.current = { label: mappedMood, count: 0 };
        }
      } else {
        // no face: optional - clear detected label
        // setDetectedLabel(null);
      }
    } catch (err) {
      console.error("❌ Detection error:", err);
    }
  };

  // ------------- rendering UI -------------
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Your Mood</h2>

      {/* Camera block (inline) */}
      <div style={{ marginBottom: 12, textAlign: "center" }}>
        <video
          ref={videoRef}
          width={260}
          height={200}
          style={{ borderRadius: 8, transform: "scaleX(-1)", border: "1px solid #ddd" }}
          muted
        />
        <div style={{ marginTop: 8 }}>
          {!cameraRunning ? (
            <button onClick={startCamera} style={styles.voiceBtn}>
              🎥 Start Camera Mood Detect
            </button>
          ) : (
            <button onClick={stopCamera} style={styles.voiceBtn}>
              ⛔ Stop Camera
            </button>
          )}
        </div>
        <div style={{ marginTop: 8, color: "#555" }}>
          Detected (stable): <strong>{detectedLabel || "—"}</strong>
        </div>
      </div>

      {/* Manual mood cards */}
      <div style={styles.moods}>
        {moods.map((mood) => (
          <div
            key={mood.name}
            style={{
              ...styles.moodCard,
              ...(selectedMood === mood.name ? styles.moodCardActive : {}),
            }}
            onClick={() => {
              // manual override
              setSelectedMood(mood.name);
              handleMoodClick(mood.name);
            }}
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
              <div key={index} style={styles.recipeCard} onClick={() => handleRecipeClick(index)}>
                <div style={styles.imageContainer}>
                  <img src={recipe.imgUrl} alt={recipe.recipeName} style={styles.image} />
                </div>
                <h4 style={styles.recipeName}>{recipe.recipeName}</h4>
              </div>
            ))}
          </div>

          {selectedRecipeIndex !== null && recipes[selectedRecipeIndex] && (
            <div ref={(el) => (recipeRefs.current[selectedRecipeIndex] = el)} style={styles.recipeDetails}>
              <div style={styles.recipeText}>
                <h4>{recipes[selectedRecipeIndex].recipeName}</h4>
                <div style={styles.controls}>
                  <button style={styles.voiceBtn} onClick={() => speakRecipe(recipes[selectedRecipeIndex], "en-US")}>
                    🔊 English
                  </button>
                  <button style={styles.voiceBtn} onClick={() => speakRecipe(recipes[selectedRecipeIndex], "hi-IN")}>
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

// -------- existing styles (kept the same) --------
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
