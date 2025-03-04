import React, { useState } from "react";
import axios from "axios";

const moods = [
  { name: "Stressed", emoji: "😫" },
  { name: "Angry", emoji: "😡" },
  { name: "Sad", emoji: "😢" },
  { name: "Bored", emoji: "😑" },
  { name: "Happy", emoji: "😊" },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [foods, setFoods] = useState([]);

  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    try {
      const response = await axios.get(`http://localhost:5000/api/foods?mood=${mood}`);
      console.log("🌍 API Response:", response.data); // ✅ Check response
      setFoods(response.data.foods || []); // ✅ Fix: Extract `foods` array correctly
    } catch (error) {
      console.error("❌ Error fetching food data:", error);
      setFoods([]); // ✅ Prevent errors
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Your Mood</h2>
      <div style={styles.moods}>
        {moods.map((m) => (
          <button
            key={m.name}
            style={{
              ...styles.button,
              ...(selectedMood === m.name ? styles.buttonActive : {}),
            }}
            onClick={() => handleMoodClick(m.name)}
          >
            {m.emoji} {m.name}
          </button>
        ))}
      </div>
      {selectedMood && (
        <div style={styles.foodList}>
          <h3 style={styles.subtitle}>You can go with: </h3>
          <ul style={styles.list}>
            {foods.map((food, index) => (
              <li key={index} style={styles.listItem}>
                {food}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "30px",
    fontWeight: "600",
  },
  moods: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "30px 0",
    flexWrap: "wrap",
  },
  button: {
    fontSize: "1.2rem",
    padding: "15px 25px",
    cursor: "pointer",
    borderRadius: "15px",
    background: "#ffcc80",
    border: "none",
    color: "#333",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonActive: {
    background: "#ffa726",
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  foodList: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "500",
  },
  list: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  listItem: {
    fontSize: "1.1rem",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    transition: "all 0.3s ease",
  },
};

export default MoodSelector;